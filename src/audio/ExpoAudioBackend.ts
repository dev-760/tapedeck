import { AudioBackend } from './AudioBackend';
import { StreamInfo } from '../providers/types';
import { logger } from '../logging/Logger';

// Note: Using dynamic imports or any type to avoid strict TS errors 
// if expo-audio types are not perfectly resolved in this environment.
let expoAudioModule: any = null;
try {
  expoAudioModule = require('expo-audio');
} catch (e) {
  // Ignore
}

export class ExpoAudioBackend implements AudioBackend {
  private player: any = null;
  
  async init(): Promise<void> {
    logger.info('ExpoAudioBackend', 'Initialized expo-audio backend');
  }
  
  async play(stream: StreamInfo, trackId: string): Promise<void> {
    if (stream.format === 'flac') {
      logger.warn('audio.format', 'FLAC playback in Expo Go may be unstable.');
    }
    
    if (this.player && typeof this.player.release === 'function') {
      this.player.release();
    }
    
    try {
      if (expoAudioModule && expoAudioModule.createAudioPlayer) {
         this.player = expoAudioModule.createAudioPlayer(stream.url);
         this.player.play();
      } else {
         logger.error('ExpoAudioBackend', 'expo-audio createAudioPlayer API is not available.');
      }
    } catch (e) {
      logger.error('ExpoAudioBackend', 'Failed to play', e);
    }
  }
  
  async pause(): Promise<void> {
    if (this.player) this.player.pause();
  }
  
  async resume(): Promise<void> {
    if (this.player) this.player.play();
  }
  
  async stop(): Promise<void> {
    if (this.player) {
      this.player.pause();
      if (typeof this.player.seekTo === 'function') {
        this.player.seekTo(0);
      }
    }
  }
  
  async seekTo(positionMs: number): Promise<void> {
    if (this.player && typeof this.player.seekTo === 'function') {
       this.player.seekTo(positionMs);
    }
  }
  
  async getPosition(): Promise<number> {
    if (this.player && this.player.currentTime !== undefined) {
       return this.player.currentTime * 1000;
    }
    return 0;
  }
  
  async getDuration(): Promise<number> {
    if (this.player && this.player.duration !== undefined) {
      return this.player.duration * 1000;
    }
    return 0;
  }
  
  async setVolume(volume: number): Promise<void> {
    if (this.player) this.player.volume = volume;
  }
  
  supportsSeek(stream: StreamInfo): boolean {
    return !stream.isLive;
  }
  
  async dispose(): Promise<void> {
    if (this.player && typeof this.player.release === 'function') {
      this.player.release();
    }
    this.player = null;
  }
}
