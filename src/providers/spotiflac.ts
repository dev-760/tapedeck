import { z } from 'zod';
import { MusicProvider, Track, StreamInfo, ProviderHealth } from './types';
import { fetchWithTimeout } from '../http/client';
import { validateSchema } from '../utils/validation';
import { logger } from '../logging/Logger';
import { useSettingsStore } from '../store/settingsStore';

// SCHEMA STATUS: UNVERIFIED
const TrackResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  artist: z.string(),
  album: z.string().optional(),
  durationMs: z.number().optional(),
  artworkUrl: z.string().optional(),
});

const SearchResponseSchema = z.array(TrackResponseSchema);

const StreamResponseSchema = z.object({
  url: z.string(),
  format: z.enum(['flac', 'mp3', 'aac', 'unknown']).default('unknown'),
});

export const spotiflacProvider: MusicProvider = {
  id: 'spotiflac',
  name: 'SpotiFLAC',
  capabilities: {
    search: true,
    stream: true,
    live: false,
  },
  
  async search(query: string, abortSignal?: AbortSignal): Promise<Track[]> {
    const mirrorUrl = useSettingsStore.getState().spotiFlacMirrorUrl;
    logger.debug('spotiflac', `Searching for: ${query} at ${mirrorUrl}`);
    
    const url = new URL('/search', mirrorUrl);
    url.searchParams.append('q', query);
    
    const response = await fetchWithTimeout(url.toString(), { signal: abortSignal });
    const data = await response.json();
    return validateSchema(SearchResponseSchema, data);
  },
  
  async getStreamInfo(trackId: string, abortSignal?: AbortSignal): Promise<StreamInfo> {
    const mirrorUrl = useSettingsStore.getState().spotiFlacMirrorUrl;
    logger.debug('spotiflac', `Getting stream info for: ${trackId}`);
    
    const url = new URL(`/stream/${trackId}`, mirrorUrl);
    
    const response = await fetchWithTimeout(url.toString(), { signal: abortSignal });
    const data = await response.json();
    return validateSchema(StreamResponseSchema, data);
  },
  
  async getHealth(): Promise<ProviderHealth> {
    const mirrorUrl = useSettingsStore.getState().spotiFlacMirrorUrl;
    try {
      const start = Date.now();
      const response = await fetchWithTimeout(`${mirrorUrl}/health`, { timeoutMs: 5000 });
      const latencyMs = Date.now() - start;
      
      if (response.ok) {
        return { status: 'healthy', latencyMs };
      }
      return { status: 'degraded', latencyMs, message: `HTTP ${response.status}` };
    } catch (e: any) {
      return { status: 'offline', message: e.message };
    }
  }
};
