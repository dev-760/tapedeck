import { ProviderId, MusicProvider, StreamInfo } from './types';
import { PROVIDERS, getActiveProvider } from './registry';
import { useSettingsStore } from '../store/settingsStore';
import { logger } from '../logging/Logger';

const FALLBACK_ORDER: ProviderId[] = ['spotiflac', 'octofiesta'];

export async function resolveStreamWithFallback(trackId: string, abortSignal?: AbortSignal): Promise<{ streamInfo: StreamInfo; providerId: ProviderId }> {
  // Direct routing for RadioParadise
  if (trackId.startsWith('rp-')) {
    const rpProvider = PROVIDERS.radioparadise;
    const streamInfo = await rpProvider.getStreamInfo(trackId);
    return {
      streamInfo,
      providerId: 'radioparadise'
    };
  }

  const activeProvider = getActiveProvider();
  const autoFallback = useSettingsStore.getState().autoFallback;
  
  try {
    const streamInfo = await activeProvider.getStreamInfo(trackId, abortSignal);
    return { streamInfo, providerId: activeProvider.id };
  } catch (error) {
    logger.warn('providerUtils', `Primary provider ${activeProvider.id} failed`, error);
    
    if (!autoFallback || activeProvider.id === 'radioparadise') {
      throw error;
    }
    
    for (const fallbackId of FALLBACK_ORDER) {
      if (fallbackId === activeProvider.id) continue;
      
      try {
        logger.info('providerUtils', `Attempting fallback to ${fallbackId}`);
        const fallbackProvider = PROVIDERS[fallbackId];
        const streamInfo = await fallbackProvider.getStreamInfo(trackId, abortSignal);
        return { streamInfo, providerId: fallbackId };
      } catch (fallbackError) {
        logger.warn('providerUtils', `Fallback provider ${fallbackId} failed`, fallbackError);
      }
    }
    
    throw new Error('All providers failed to resolve stream');
  }
}
