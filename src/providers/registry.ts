import { ProviderId, MusicProvider } from './types';
import { spotiflacProvider } from './spotiflac';
import { octofiestaProvider } from './octofiesta';
import { radioparadiseProvider } from './radioparadise';
import { useSettingsStore } from '../store/settingsStore';

export const PROVIDERS: Record<ProviderId, MusicProvider> = {
  spotiflac: spotiflacProvider,
  octofiesta: octofiestaProvider,
  radioparadise: radioparadiseProvider,
};

export function getProvider(id: ProviderId): MusicProvider {
  return PROVIDERS[id];
}

export function getActiveProvider(): MusicProvider {
  const activeId = useSettingsStore.getState().activeProviderId;
  return PROVIDERS[activeId] || PROVIDERS.spotiflac;
}
