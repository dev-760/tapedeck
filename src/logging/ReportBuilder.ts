import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useLogStore } from '../store/logStore';
import { useSettingsStore } from '../store/settingsStore';
import { PROVIDERS } from '../providers/registry';
import { ProviderId, ProviderHealth } from '../providers/types';

export interface TapeDeckReport {
  schemaVersion: string;
  timestamp: string;
  appVersion: string;
  platform: {
    os: string;
    version: string | number;
  };
  settings: {
    activeProviderId: string;
    autoFallback: boolean;
    verboseLogging: boolean;
  };
  providerHealth: Record<ProviderId, ProviderHealth | null>;
  logs: any[];
}

export class ReportBuilder {
  static async buildReport(): Promise<TapeDeckReport> {
    const settings = useSettingsStore.getState();
    const logs = useLogStore.getState().logs;

    const providerHealth: Record<ProviderId, ProviderHealth | null> = {
      spotiflac: null,
      octofiesta: null,
      radioparadise: null,
    };

    // Parallel health checks
    await Promise.all(
      (Object.keys(PROVIDERS) as ProviderId[]).map(async (id) => {
        try {
          providerHealth[id] = await PROVIDERS[id].getHealth();
        } catch (e) {
          providerHealth[id] = { status: 'offline', message: 'Health check failed' };
        }
      })
    );

    // Sanitize logs
    const sanitizedLogs = logs.map(log => {
      // Strip potentially sensitive info (like tokens or full stream URLs in errors)
      let safeMessage = log.message;
      if (typeof safeMessage === 'string') {
        safeMessage = safeMessage.replace(/https?:\/\/[^\s]+/g, '[URL REDACTED]');
      }
      return {
        ...log,
        message: safeMessage,
      };
    });

    return {
      schemaVersion: '1.0.0',
      timestamp: new Date().toISOString(),
      appVersion: '0.1.0', // from app.config.ts
      platform: {
        os: Platform.OS,
        version: Platform.Version,
      },
      settings: {
        activeProviderId: settings.activeProviderId,
        autoFallback: settings.autoFallback,
        verboseLogging: settings.verboseLogging,
      },
      providerHealth,
      logs: sanitizedLogs,
    };
  }

  static async exportReport(): Promise<boolean> {
    try {
      const report = await this.buildReport();
      const json = JSON.stringify(report, null, 2);
      
      const filename = `tapedeck_diagnostic_${Date.now()}.json`;
      const fileUri = `${FileSystem.cacheDirectory}${filename}`;
      
      await FileSystem.writeAsStringAsync(fileUri, json, { encoding: FileSystem.EncodingType.UTF8 });
      
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/json',
          dialogTitle: 'Export TapeDeck Diagnostics',
        });
        return true;
      }
      return false;
    } catch (e) {
      console.error('Failed to export report:', e);
      return false;
    }
  }
}
