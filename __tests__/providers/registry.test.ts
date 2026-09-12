import { PROVIDERS, getProvider, getActiveProvider } from '../../src/providers/registry';
import { useSettingsStore } from '../../src/store/settingsStore';
import { ProviderId } from '../../src/providers/types';

jest.mock('../../src/store/settingsStore', () => ({
  useSettingsStore: {
    getState: jest.fn(),
  },
}));

describe('Provider Registry', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should resolve provider by ID', () => {
    expect(getProvider('spotiflac')).toBe(PROVIDERS.spotiflac);
    expect(getProvider('octofiesta')).toBe(PROVIDERS.octofiesta);
    expect(getProvider('radioparadise')).toBe(PROVIDERS.radioparadise);
  });

  it('should return active provider from settings', () => {
    (useSettingsStore.getState as jest.Mock).mockReturnValue({
      activeProviderId: 'octofiesta'
    });
    
    const active = getActiveProvider();
    expect(active.id).toBe('octofiesta');
  });

  it('should fallback to spotiflac if active provider is invalid', () => {
    (useSettingsStore.getState as jest.Mock).mockReturnValue({
      activeProviderId: 'invalid-provider' as ProviderId
    });
    
    const active = getActiveProvider();
    expect(active.id).toBe('spotiflac');
  });
});
