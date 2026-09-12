import { AudioBackend } from './AudioBackend';
import { StreamInfo } from '../providers/types';
import { logger } from '../logging/Logger';

export class ExpoAudioBackend implements AudioBackend {
  private player: any = null;
  
  async init(): Promise<void> {
    logger.warn('ExpoAudioBackend', 'expo-audio is not available in this build. Using TrackPlayerBackend instead.');
    throw new Error('expo-audio not available - use development build with TrackPlayerBackend');
  }
  
  async play(stream: StreamInfo, trackId: string): Promise<void> {
    logger.error('ExpoAudioBackend', 'expo-audio not available. Cannot play.');
    throw new Error('expo-audio not available');
  }
  
  async pause(): Promise<void> {
    logger.error('ExpoAudioBackend', 'expo-audio not available.');
  }
  
  async resume(): Promise<void> {
    logger.error('ExpoAudioBackend', 'expo-audio not available.');
  }
  
  async stop(): Promise<void> {
    logger.error('ExpoAudioBackend', 'expo-audio not available.');
  }
  
  async seekTo(positionMs: number): Promise<void> {
    logger.error('ExpoAudioBackend', 'expo-audio not available.');
  }
  
  async getPosition(): Promise<number> {
    return 0;
  }
  
  async getDuration(): Promise<number> {
    return 0;
  }
  
  async setVolume(volume: number): Promise<void> {
    logger.error('ExpoAudioBackend', 'expo-audio not available.');
  }
  
  supportsSeek(stream: StreamInfo): boolean {
    return false;
  }
  
  async dispose(): Promise<void> {
    this.player = null;
  }
}
