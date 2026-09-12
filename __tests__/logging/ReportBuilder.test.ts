import { ReportBuilder } from '../../src/logging/ReportBuilder';
import { useLogStore } from '../../src/store/logStore';
import { useSettingsStore } from '../../src/store/settingsStore';
import { PROVIDERS } from '../../src/providers/registry';

jest.mock('../../src/store/logStore', () => ({
  useLogStore: {
    getState: jest.fn(),
  },
}));

jest.mock('../../src/store/settingsStore', () => ({
  useSettingsStore: {
    getState: jest.fn(),
  },
}));

jest.mock('../../src/providers/registry', () => ({
  PROVIDERS: {
    spotiflac: { getHealth: jest.fn().mockResolvedValue({ status: 'healthy', latencyMs: 50 }) },
    octofiesta: { getHealth: jest.fn().mockResolvedValue({ status: 'offline', message: 'Down' }) },
    radioparadise: { getHealth: jest.fn().mockResolvedValue({ status: 'healthy' }) },
  }
}));

describe('ReportBuilder', () => {
  it('should generate sanitized report', async () => {
    (useLogStore.getState as jest.Mock).mockReturnValue({
      logs: [
        { timestamp: 123, level: 'info', tag: 'test', message: 'Normal log' },
        { timestamp: 124, level: 'error', tag: 'test', message: 'Failed to fetch https://secret-token.url/data?key=123' }
      ]
    });
    
    (useSettingsStore.getState as jest.Mock).mockReturnValue({
      activeProviderId: 'spotiflac',
      autoFallback: true,
      verboseLogging: false
    });

    const report = await ReportBuilder.buildReport();
    
    expect(report.schemaVersion).toBe('1.0.0');
    expect(report.settings.activeProviderId).toBe('spotiflac');
    expect(report.providerHealth.spotiflac?.status).toBe('healthy');
    expect(report.providerHealth.octofiesta?.status).toBe('offline');
    
    // Check sanitization
    expect(report.logs[0].message).toBe('Normal log');
    expect(report.logs[1].message).toBe('Failed to fetch [URL REDACTED]');
  });
});
