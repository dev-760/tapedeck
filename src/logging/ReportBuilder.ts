import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useLogStore } from '../store/logStore';
import { useSettingsStore } from '../store/settingsStore';

export interface TapeDeckReport {
  schemaVersion: string;
  timestamp: string;
  appVersion: string;
  platform: {
    os: string;
    version: string | number;
  };
  settings: {
    verboseLogging: boolean;
  };
  logs: any[];
}

export class ReportBuilder {
  static async buildReport(): Promise<TapeDeckReport> {
    const settings = useSettingsStore.getState();
    const logs = useLogStore.getState().logs;

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
      schemaVersion: '2.0.0',
      timestamp: new Date().toISOString(),
      appVersion: '2.0.0', // from app.config.ts
      platform: {
        os: Platform.OS,
        version: Platform.Version,
      },
      settings: {
        verboseLogging: settings.verboseLogging,
      },
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
