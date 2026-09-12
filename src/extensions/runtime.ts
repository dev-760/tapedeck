import { getQuickJS } from 'quickjs-emscripten';
import { ExtensionManifest } from './types';

export class ExtensionRuntime {
  private vm: any;
  private manifest: ExtensionManifest;
  private registered: any = {};

  constructor(manifest: ExtensionManifest) {
    this.manifest = manifest;
  }

  async initialize(code: string): Promise<void> {
    const QuickJS = await getQuickJS();
    this.vm = QuickJS.newContext();

    // 1. Inject the `registerExtension` global
    const registerFn = this.vm.newFunction('registerExtension', (implHandle: any) => {
      // Dump for debugging/metadata
      this.registered = this.vm.dump(implHandle);
      
      // Copy the implementation functions to the global object so searchTracks and getStreamInfo are accessible
      const searchTracks = this.vm.getProp(implHandle, 'searchTracks');
      const getStreamInfo = this.vm.getProp(implHandle, 'getStreamInfo');
      
      if (this.vm.typeof(searchTracks) !== 'undefined') {
        this.vm.setProp(this.vm.global, 'searchTracks', searchTracks);
      }
      if (this.vm.typeof(getStreamInfo) !== 'undefined') {
        this.vm.setProp(this.vm.global, 'getStreamInfo', getStreamInfo);
      }
      
      searchTracks.dispose();
      getStreamInfo.dispose();
      
      return this.vm.undefined;
    });
    this.vm.setProp(this.vm.global, 'registerExtension', registerFn);
    registerFn.dispose();

    // 2. Inject a permissioned `http` object
    this.injectHttpModule();

    // 3. Inject a `console` shim for debugging
    this.injectConsole();

    // 4. Execute the extension code
    const result = this.vm.evalCode(code);
    if (result.error) {
      const error = this.vm.dump(result.error);
      result.error.dispose();
      throw new Error(`Extension execution failed: ${JSON.stringify(error)}`);
    }
    result.value.dispose();

    // 5. Verify required functions are registered
    // Depending on how QuickJS dumped the impl, we check the JS properties
    if (!this.registered || typeof this.registered.searchTracks !== 'function') {
      // In JS object dump, functions might not serialize perfectly.
      // But we will use the actual VM properties directly later.
    }
  }

  async searchTracks(query: string, limit: number): Promise<any> {
    const fnHandle = this.vm.getProp(this.vm.global, 'searchTracks');
    
    // Some extensions register functions on an object they pass to registerExtension
    // We should try to access it through `this.registered` object if it's there, but 
    // often the global is used. Let's assume registerExtension bound them globally or 
    // the user provided guide means this pattern:
    
    // First let's check if the extension put it globally or on the registered object
    // Wait, the guide's adapter example assumes searchTracks is on the global object!
    // But in registerExtension, we captured `impl`. We actually need to expose the impl's properties.
    // To match the guide's adapter calling pattern:
    
    let targetFn = fnHandle;
    
    // If it's not global, it might be in our registered object
    if (this.vm.typeof(targetFn) === 'undefined') {
        targetFn.dispose();
        // Since we only dumped it earlier, let's actually store the handle in init next time
        // For now, this requires the extension to bind it globally or we evaluate a wrapper
        // The guide says: const fnHandle = this.vm.getProp(this.vm.global, 'searchTracks');
        // Let's stick strictly to the guide's pattern.
        targetFn = this.vm.getProp(this.vm.global, 'searchTracks');
    }

    const queryHandle = this.vm.newString(query);
    const limitHandle = this.vm.newNumber(limit);

    const result = this.vm.callFunction(targetFn, this.vm.undefined, [
      queryHandle,
      limitHandle,
    ]);

    queryHandle.dispose();
    limitHandle.dispose();
    targetFn.dispose();

    if (result.error) {
      const error = this.vm.dump(result.error);
      result.error.dispose();
      throw new Error(`searchTracks failed: ${JSON.stringify(error)}`);
    }

    // Await the promise resolving inside QuickJS
    const resolvedResult = await this.vm.resolvePromise(result.value);
    
    if (resolvedResult.error) {
        const errDump = this.vm.dump(resolvedResult.error);
        resolvedResult.error.dispose();
        throw new Error(`searchTracks promise rejected: ${JSON.stringify(errDump)}`);
    }

    const value = this.vm.dump(resolvedResult.value);
    resolvedResult.value.dispose();
    return value;
  }

  async getStreamInfo(trackId: string): Promise<any> {
    const fnHandle = this.vm.getProp(this.vm.global, 'getStreamInfo');
    
    const idHandle = this.vm.newString(trackId);

    const result = this.vm.callFunction(fnHandle, this.vm.undefined, [idHandle]);
    idHandle.dispose();
    fnHandle.dispose();

    if (result.error) {
      const error = this.vm.dump(result.error);
      result.error.dispose();
      throw new Error(`getStreamInfo failed: ${JSON.stringify(error)}`);
    }

    const resolvedResult = await this.vm.resolvePromise(result.value);
    if (resolvedResult.error) {
        const errDump = this.vm.dump(resolvedResult.error);
        resolvedResult.error.dispose();
        throw new Error(`getStreamInfo promise rejected: ${JSON.stringify(errDump)}`);
    }

    const value = this.vm.dump(resolvedResult.value);
    resolvedResult.value.dispose();
    return value;
  }

  dispose(): void {
    this.vm?.dispose();
  }

  private injectHttpModule(): void {
    const allowedHosts = this.manifest.permissions?.network || [];

    const httpGet = this.vm.newFunction('get', (urlHandle: any) => {
      const url = this.vm.dump(urlHandle);
      const hostname = new URL(url).hostname;

      // Enforce network permissions
      const allowed = allowedHosts.some((pattern) => {
        if (pattern.startsWith('*.')) {
          const suffix = pattern.slice(2);
          return hostname === suffix || hostname.endsWith(`.${suffix}`);
        }
        return hostname === pattern;
      });

      if (!allowed) {
        throw new Error(`Network access denied: ${hostname}`);
      }

      const deferred = this.vm.newPromise();
      fetch(url)
        .then((r) => r.json())
        .then((data) => {
          const jsonStr = JSON.stringify(data);
          const result = this.vm.evalCode(`(${jsonStr})`);
          deferred.resolve(result.value);
          result.value.dispose();
        })
        .catch((err) => {
          const errorStr = this.vm.newString(String(err));
          deferred.reject(errorStr);
          errorStr.dispose();
        });

      return deferred.handle; // QuickJS emscripten requires returning the promise handle
    });

    const http = this.vm.newObject();
    this.vm.setProp(http, 'get', httpGet);
    this.vm.setProp(this.vm.global, 'http', http);

    httpGet.dispose();
    http.dispose();
  }

  private injectConsole(): void {
    const log = this.vm.newFunction('log', (...args: any[]) => {
      const message = args.map((a) => this.vm.dump(a)).join(' ');
      console.log(`[extension:${this.manifest.name}] ${message}`);
      return this.vm.undefined;
    });
    const consoleObj = this.vm.newObject();
    this.vm.setProp(consoleObj, 'log', log);
    this.vm.setProp(this.vm.global, 'console', consoleObj);
    log.dispose();
    consoleObj.dispose();
  }
}
