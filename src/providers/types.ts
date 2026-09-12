export type ProviderId = 'spotiflac' | 'octofiesta' | 'radioparadise';

export interface StreamInfo {
  url: string;
  format: 'flac' | 'mp3' | 'aac' | 'unknown';
  isLive?: boolean;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  durationMs?: number;
  artworkUrl?: string;
}

export interface ProviderHealth {
  status: 'healthy' | 'degraded' | 'offline';
  latencyMs?: number;
  message?: string;
}

export interface MusicProvider {
  id: ProviderId;
  name: string;
  capabilities: {
    search: boolean;
    stream: boolean;
    live: boolean;
  };
  search(query: string, abortSignal?: AbortSignal): Promise<Track[]>;
  getStreamInfo(trackId: string, abortSignal?: AbortSignal): Promise<StreamInfo>;
  getHealth(): Promise<ProviderHealth>;
}
