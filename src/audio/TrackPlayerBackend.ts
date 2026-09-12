import TrackPlayer, { 
  AppKilledBehavior, 
  Capability, 
} from 'react-native-track-player';
import { AudioBackend } from './AudioBackend';
import { StreamInfo } from '../providers/types';
import { logger } from '../logging/Logger';

export class TrackPlayerBackend implements AudioBackend {
  private isInitialized = false;

  async init(): Promise<void> {
    if (this.isInitialized) return;
    try {
      await TrackPlayer.setupPlayer({
        autoUpdateMetadata: true,
      });
      await TrackPlayer.updateOptions({
        android: {
          appKilledBehavior: AppKilledBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop,
          Capability.SeekTo,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop,
        ],
      });
      this.isInitialized = true;
      logger.info('TrackPlayerBackend', 'Initialized TrackPlayer');
    } catch (e) {
      logger.error('TrackPlayerBackend', 'Failed to initialize TrackPlayer', e);
    }
  }

  async play(stream: StreamInfo, trackId: string): Promise<void> {
    if (!this.isInitialized) await this.init();
    await TrackPlayer.reset();
    
    await TrackPlayer.add({
      id: trackId,
      url: stream.url,
      title: 'TapeDeck Audio', // Updated later via metadata sync
      artist: 'TapeDeck',
      isLiveStream: stream.isLive,
    });
    
    await TrackPlayer.play();
  }

  async pause(): Promise<void> {
    await TrackPlayer.pause();
  }

  async resume(): Promise<void> {
    await TrackPlayer.play();
  }

  async stop(): Promise<void> {
    await TrackPlayer.stop();
  }

  async seekTo(positionMs: number): Promise<void> {
    await TrackPlayer.seekTo(positionMs / 1000);
  }

  async getPosition(): Promise<number> {
    const { position } = await TrackPlayer.getProgress();
    return position * 1000;
  }

  async getDuration(): Promise<number> {
    const { duration } = await TrackPlayer.getProgress();
    return duration * 1000;
  }

  async setVolume(volume: number): Promise<void> {
    await TrackPlayer.setVolume(volume);
  }

  supportsSeek(stream: StreamInfo): boolean {
    return !stream.isLive;
  }

  async dispose(): Promise<void> {
    await TrackPlayer.stop();
  }
}
