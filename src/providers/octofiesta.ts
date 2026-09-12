import { z } from 'zod';
import { MusicProvider, Track, StreamInfo, ProviderHealth } from './types';
import { fetchWithTimeout } from '../http/client';
import { validateSchema } from '../utils/validation';
import { logger } from '../logging/Logger';
import { useSettingsStore } from '../store/settingsStore';

// SCHEMA STATUS: UNVERIFIED
const OctoTrackSchema = z.object({
  id: z.string(),
  title: z.string(),
  artist: z.string(),
  album: z.string().optional(),
  durationMs: z.number().optional(),
  artworkUrl: z.string().optional(),
});

const OctoSearchResponseSchema = z.array(OctoTrackSchema);

const OctoStreamResponseSchema = z.object({
  url: z.string(),
  format: z.enum(['flac', 'mp3', 'aac', 'unknown']).default('unknown'),
});

export const octofiestaProvider: MusicProvider = {
  id: 'octofiesta',
  name: 'OctoFiesta',
  capabilities: {
    search: true,
    stream: true,
    live: false,
  },
  
  async search(query: string, abortSignal?: AbortSignal): Promise<Track[]> {
    const baseUrl = useSettingsStore.getState().octoFiestaUrl;
    logger.debug('octofiesta', `Searching for: ${query} at ${baseUrl}`);
    
    const url = new URL('/api/search', baseUrl);
    url.searchParams.append('q', query);
    
    const response = await fetchWithTimeout(url.toString(), { signal: abortSignal });
    const data = await response.json();
    return validateSchema(OctoSearchResponseSchema, data);
  },
  
  async getStreamInfo(trackId: string, abortSignal?: AbortSignal): Promise<StreamInfo> {
    const baseUrl = useSettingsStore.getState().octoFiestaUrl;
    logger.debug('octofiesta', `Getting stream info for: ${trackId}`);
    
    const url = new URL(`/api/stream/${trackId}`, baseUrl);
    
    const response = await fetchWithTimeout(url.toString(), { signal: abortSignal });
    const data = await response.json();
    return validateSchema(OctoStreamResponseSchema, data);
  },
  
  async getHealth(): Promise<ProviderHealth> {
    const baseUrl = useSettingsStore.getState().octoFiestaUrl;
    try {
      const start = Date.now();
      const response = await fetchWithTimeout(`${baseUrl}/api/health`, { timeoutMs: 5000 });
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
