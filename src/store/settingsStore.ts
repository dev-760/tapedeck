import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProviderId } from '../providers/types';

export interface AppSettings {
  activeProviderId: ProviderId;
  autoFallback: boolean;
  verboseLogging: boolean;
  octoFiestaUrl: string;
  spotiFlacMirrorUrl: string;
}

interface SettingsState extends AppSettings {
  hasHydrated: boolean;
  setHydrated: () => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
}

const DEFAULT_SETTINGS: AppSettings = {
  activeProviderId: 'spotiflac',
  autoFallback: true,
  verboseLogging: false,
  octoFiestaUrl: 'https://api.octofiesta.com',
  spotiFlacMirrorUrl: 'https://mirror.spotiflac.net',
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      hasHydrated: false,
      setHydrated: () => set({ hasHydrated: true }),
      updateSettings: (newSettings) => set((state) => ({ ...state, ...newSettings })),
    }),
    {
      name: 'tapedeck-settings',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated();
        }
      },
    }
  )
);
