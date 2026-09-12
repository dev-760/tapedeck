export type ProviderId = string;

export interface StreamInfo {
  url: string;
  format: 'flac' | 'mp3' | 'aac' | 'unknown';
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  durationMs?: number;
  coverUrl?: string; // Using coverUrl as used in the guide adapter
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
  initialize?: (code: string) => Promise<void>;
  search(query: string, abortSignal?: AbortSignal): Promise<Track[]>;
  getStreamInfo(trackId: string, abortSignal?: AbortSignal): Promise<StreamInfo>;
  getHealth(): Promise<ProviderHealth>;
  dispose?: () => void;
}
