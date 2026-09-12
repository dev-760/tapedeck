import { MusicProvider, Track, StreamInfo, ProviderHealth } from './types';
import { ExtensionRuntime } from '../extensions/runtime';
import { ExtensionManifest } from '../extensions/types';

export class SpotiFLACExtensionProvider implements MusicProvider {
  id: string;
  name: string;
  capabilities = { search: true, stream: true, live: false };

  private runtime: ExtensionRuntime;

  constructor(extensionId: string, manifest: ExtensionManifest, code: string) {
    this.id = `ext:${extensionId}`;
    this.name = manifest.displayName || extensionId;
    this.runtime = new ExtensionRuntime(manifest);
  }

  async initialize(code: string): Promise<void> {
    await this.runtime.initialize(code);
  }

  async search(query: string, abortSignal?: AbortSignal): Promise<Track[]> {
    const result = await this.runtime.searchTracks(query, 20);

    return result.tracks.map((item: any) => ({
      id: String(item.id),
      title: item.name,
      artist: item.artist || 'Unknown Artist',
      album: item.album_name || '',
      durationMs: item.duration_ms || 0,
      coverUrl: item.cover_url || undefined,
    }));
  }

  async getStreamInfo(
    trackId: string,
    abortSignal?: AbortSignal
  ): Promise<StreamInfo> {
    const result = await this.runtime.getStreamInfo(trackId);
    return {
      url: result.url,
      format: result.format || 'flac',
    };
  }

  async getHealth(): Promise<ProviderHealth> {
    return { status: 'healthy' };
  }

  dispose(): void {
    this.runtime.dispose();
  }
}
