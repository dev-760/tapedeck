import { resolveStreamWithFallback } from '../../src/providers/providerUtils';
import { getActiveProvider, PROVIDERS } from '../../src/providers/registry';
import { useSettingsStore } from '../../src/store/settingsStore';

jest.mock('../../src/providers/registry');
jest.mock('../../src/store/settingsStore', () => ({
  useSettingsStore: {
    getState: jest.fn(),
  },
}));

describe('Provider Fallback Logic', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should route rp- prefixed tracks directly to radioparadise', async () => {
    const mockRpProvider = {
      id: 'radioparadise',
      getStreamInfo: jest.fn().mockResolvedValue({ url: 'http://rp', format: 'flac', isLive: true })
    };
    (PROVIDERS as any).radioparadise = mockRpProvider;
    
    const result = await resolveStreamWithFallback('rp-main');
    
    expect(mockRpProvider.getStreamInfo).toHaveBeenCalledWith('rp-main');
    expect(result.providerId).toBe('radioparadise');
    expect(result.streamInfo.url).toBe('http://rp');
  });

  it('should use active provider if successful', async () => {
    const mockProvider = {
      id: 'spotiflac',
      getStreamInfo: jest.fn().mockResolvedValue({ url: 'http://test' })
    };
    (getActiveProvider as jest.Mock).mockReturnValue(mockProvider);
    (useSettingsStore.getState as jest.Mock).mockReturnValue({ autoFallback: true });

    const result = await resolveStreamWithFallback('track-123');
    
    expect(mockProvider.getStreamInfo).toHaveBeenCalledWith('track-123', undefined);
    expect(result.providerId).toBe('spotiflac');
  });

  it('should fallback if autoFallback is enabled and primary fails', async () => {
    const mockPrimary = {
      id: 'octofiesta',
      getStreamInfo: jest.fn().mockRejectedValue(new Error('Failed'))
    };
    const mockFallback = {
      id: 'spotiflac',
      getStreamInfo: jest.fn().mockResolvedValue({ url: 'http://fallback' })
    };
    
    (getActiveProvider as jest.Mock).mockReturnValue(mockPrimary);
    (useSettingsStore.getState as jest.Mock).mockReturnValue({ autoFallback: true });
    (PROVIDERS as any).spotiflac = mockFallback;

    const result = await resolveStreamWithFallback('track-123');
    
    expect(mockPrimary.getStreamInfo).toHaveBeenCalled();
    expect(mockFallback.getStreamInfo).toHaveBeenCalled();
    expect(result.providerId).toBe('spotiflac');
  });

  it('should not fallback if autoFallback is disabled', async () => {
    const mockPrimary = {
      id: 'octofiesta',
      getStreamInfo: jest.fn().mockRejectedValue(new Error('Failed'))
    };
    
    (getActiveProvider as jest.Mock).mockReturnValue(mockPrimary);
    (useSettingsStore.getState as jest.Mock).mockReturnValue({ autoFallback: false });

    await expect(resolveStreamWithFallback('track-123')).rejects.toThrow('Failed');
  });
});
