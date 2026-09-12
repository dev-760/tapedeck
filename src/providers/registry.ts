import { MusicProvider, Track, StreamInfo, ProviderHealth } from './types';
import { useSettingsStore } from '../store/settingsStore';

// We dynamically populate this from the bootstrap loader
export const PROVIDERS: Record<string, MusicProvider> = {};

const OFFLINE_PROVIDER: MusicProvider = {
  id: 'offline',
  name: 'Offline Mode',
  capabilities: { search: false, stream: false, live: false },
  search: async () => { throw new Error('Cannot search while offline. Please check your connection and restart the app.'); },
  getStreamInfo: async () => { throw new Error('Cannot stream while offline.'); },
  getHealth: async () => ({ status: 'offline', message: 'No extension loaded.' })
};

export function getActiveProvider(): MusicProvider {
  const activeId = useSettingsStore.getState().activeProviderId;
  const provider = PROVIDERS[activeId];
  
  if (!provider) {
    // Fallback to the first available provider if active one is missing
    const availableIds = Object.keys(PROVIDERS);
    if (availableIds.length > 0) {
      return PROVIDERS[availableIds[0]];
    }
    return OFFLINE_PROVIDER;
  }
  
  return provider;
}
