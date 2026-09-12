# API Documentation

This document outlines the internal APIs and core interfaces that power TapeDeck V2.

## 1. Core Interfaces

### `Track`
Represents a single audio track in the system.
```typescript
interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  durationMs?: number;
  coverUrl?: string;
}
```

### `MusicProvider`
The base abstraction for any audio source (built-in or extension).
```typescript
interface MusicProvider {
  id: string;
  name: string;
  capabilities: { search: boolean; stream: boolean; live: boolean };
  initialize?: (code: string) => Promise<void>;
  search: (query: string) => Promise<Track[]>;
  getStreamInfo: (trackId: string) => Promise<StreamInfo>;
  getHealth: () => Promise<ProviderHealth>;
}
```

## 2. Extension System

### `ExtensionRuntime`
The QuickJS wrapper handling sandbox execution.
- **`initialize(code: string)`**: Boots the QuickJS VM, injects `registerExtension`, the `http` shim, and `console.log`.
- **`searchTracks(query, limit)`**: Executes the extension's search function within the VM and bridges the Promise back to React Native.
- **`getStreamInfo(trackId)`**: Fetches the direct stream URL for `track-player`.

## 3. Audio Service

### `AudioService` (`src/audio/AudioService.ts`)
A singleton class orchestrating playback.
- **`init()`**: Sets up TrackPlayer capabilities (Play, Pause, Seek).
- **`playTrack(track: Track)`**: Looks up the stream URL via the active provider and loads it into the TrackPlayer queue.
- **`pause() / resume() / stop()`**: Controls the current playback state and updates `playbackStore`.
- **`seekTo(positionMs: number)`**: Seeks to a specific timestamp in the track.

## 4. Stores (Zustand)

### `usePlaybackStore`
Tracks the global player state.
```typescript
const { 
  currentTrack, 
  isPlaying, 
  positionMs, 
  durationMs, 
  streamInfo 
} = usePlaybackStore();
```

### `useSettingsStore`
Tracks user preferences.
```typescript
const { 
  activeProviderId, 
  verboseLogging,
  setActiveProvider 
} = useSettingsStore();
```
