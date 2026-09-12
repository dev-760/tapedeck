import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AppSettings {
  verboseLogging: boolean;
  activeProviderId: string;
}

interface SettingsState extends AppSettings {
  hasHydrated: boolean;
  setHydrated: () => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  setVerboseLogging: (value: boolean) => void;
  setActiveProvider: (id: string) => void;
}

const DEFAULT_SETTINGS: AppSettings = {
  verboseLogging: false,
  activeProviderId: 'ext:tidal-web',
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      hasHydrated: false,
      setHydrated: () => set({ hasHydrated: true }),
      updateSettings: (newSettings) => set((state) => ({ ...state, ...newSettings })),
      setVerboseLogging: (verboseLogging) => set({ verboseLogging }),
      setActiveProvider: (activeProviderId) => set({ activeProviderId }),
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
