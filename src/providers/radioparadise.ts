import { z } from 'zod';
import { MusicProvider, Track, StreamInfo, ProviderHealth } from './types';
import { fetchWithTimeout } from '../http/client';
import { validateSchema } from '../utils/validation';
import { logger } from '../logging/Logger';

const RP_STREAM_URL = 'https://stream.radioparadise.com/flac';
const RP_NOW_PLAYING_URL = 'https://api.radioparadise.com/api/now_playing?chan=0';

// SCHEMA STATUS: UNVERIFIED
const RPNowPlayingSchema = z.object({
  title: z.string(),
  artist: z.string(),
  album: z.string().optional(),
  cover: z.string().optional(),
});

export const radioparadiseProvider: MusicProvider = {
  id: 'radioparadise',
  name: 'Radio Paradise',
  capabilities: {
    search: false,
    stream: true,
    live: true,
  },
  
  async search(query: string): Promise<Track[]> {
    logger.warn('radioparadise', 'Search is not supported on Radio Paradise');
    return [];
  },
  
  async getStreamInfo(trackId: string): Promise<StreamInfo> {
    logger.debug('radioparadise', 'Returning live stream info');
    return {
      url: RP_STREAM_URL,
      format: 'flac',
      isLive: true,
    };
  },
  
  async getHealth(): Promise<ProviderHealth> {
    try {
      const start = Date.now();
      const response = await fetchWithTimeout(RP_NOW_PLAYING_URL, { timeoutMs: 5000 });
      const latencyMs = Date.now() - start;
      
      if (response.ok) {
        return { status: 'healthy', latencyMs };
      }
      return { status: 'degraded', latencyMs, message: `HTTP ${response.status}` };
    } catch (e: any) {
      return { status: 'offline', message: e.message };
    }
  },
};

export async function fetchRadioParadiseNowPlaying(abortSignal?: AbortSignal): Promise<Track | null> {
  try {
    const response = await fetchWithTimeout(RP_NOW_PLAYING_URL, { signal: abortSignal });
    const data = await response.json();
    const validated = validateSchema(RPNowPlayingSchema, data);
    return {
      id: 'rp-live-track',
      title: validated.title,
      artist: validated.artist,
      album: validated.album,
      artworkUrl: validated.cover,
    };
  } catch (error) {
    logger.error('radioparadise', 'Failed to fetch now playing', error);
    return null;
  }
}
