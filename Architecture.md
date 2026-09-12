# Architecture Overview

TapeDeck V2 utilizes a highly decoupled, modern React Native architecture, emphasizing security, performance, and maintainability.

## 1. System Layers

The app is divided into four primary layers:
1. **UI & Routing (Expo Router)** - File-based navigation (`app/`) driving the visual Walkman interface.
2. **State Management (Zustand)** - Global stores managing playback state, settings, and library data.
3. **Audio Service (`AudioService.ts`)** - The bridge to native background audio playback via `react-native-track-player`.
4. **Extension Sandbox (`runtime.ts`)** - A WebAssembly-based QuickJS virtual machine for executing 3rd-party SpotiFLAC extensions.

## 2. SpotiFLAC Extension Sandbox

One of the most complex features of TapeDeck is its ability to load custom audio scrapers and adapters dynamically. 
To protect the user from malicious scripts, we employ **WebAssembly (WASM) Sandboxing**.

- **Fetching:** `src/extensions/registry.ts` queries the remote registry.
- **Verification:** `src/extensions/loader.ts` downloads `.sflx` zip archives and hashes them using `react-native-quick-crypto` (a high-performance C++ JSI module) to verify SHA-256 integrity.
- **Execution:** `src/extensions/runtime.ts` creates a `quickjs-emscripten` VM. The extension script is injected into this VM.
- **Permissions:** The host injects a restricted `http.get` function, ensuring the plugin can only access whitelisted domains declared in its manifest.

## 3. Data Flow

1. User queries a track in the UI (`search.tsx`).
2. UI calls `getActiveProvider().search()`.
3. The provider adapter (`spotiflac-extension.ts`) serializes the request into the QuickJS VM.
4. The VM executes the sandboxed script, fetches data via the permissioned `http` hook, and resolves a promise back to the host.
5. The UI renders the track. Upon pressing "Load", the `AudioService` is invoked, which again queries the VM for the raw FLAC stream URL.
6. `react-native-track-player` streams the URL natively in the background.

## 4. State Management (Zustand)

We use Zustand for lightweight, boilerplate-free state management:
* `playbackStore.ts`: Tracks `isPlaying`, `currentTrack`, `positionMs`, and `durationMs`.
* `settingsStore.ts`: Manages user preferences like active providers and developer logging options.
* `libraryStore.ts` (Planned): Uses `zustand/middleware/persist` with `AsyncStorage` to permanently store Mixtapes locally.
