import { AudioBackend } from './AudioBackend';
import { ExpoAudioBackend } from './ExpoAudioBackend';
import { TrackPlayerBackend } from './TrackPlayerBackend';
import { usePlaybackStore } from '../store/playbackStore';
import { logger } from '../logging/Logger';
import { Track, StreamInfo } from '../providers/types';
import { getActiveProvider } from '../providers/registry';

class AudioService {
  private backend: AudioBackend;

  constructor() {
    // Always use TrackPlayerBackend for production builds
    // ExpoAudioBackend is only for Expo Go development
    this.backend = new TrackPlayerBackend();
  }

  async init() {
    await this.backend.init();
  }

  async playTrack(track: Track) {
    const store = usePlaybackStore.getState();
    store.setLoading(true);
    store.setCurrentTrack(track);

    try {
      logger.info('AudioService', `Playing track: ${track.id}`);
      
      const provider = getActiveProvider();
      const streamInfo = await provider.getStreamInfo(track.id);
      
      store.setStreamInfo(streamInfo);
      
      await this.backend.play(streamInfo, track.id);
      store.setPlaying(true);
      store.setError(null);
    } catch (e: any) {
      logger.error('AudioService', 'Failed to play track', e);
      store.setError(e.message);
      store.setPlaying(false);
    } finally {
      store.setLoading(false);
    }
  }

  async pause() {
    await this.backend.pause();
    usePlaybackStore.getState().setPlaying(false);
  }

  async resume() {
    await this.backend.resume();
    usePlaybackStore.getState().setPlaying(true);
  }

  async stop() {
    await this.backend.stop();
    usePlaybackStore.getState().setPlaying(false);
  }

  async seekTo(positionMs: number) {
    await this.backend.seekTo(positionMs);
  }

  async syncPosition() {
    const position = await this.backend.getPosition();
    const duration = await this.backend.getDuration();
    usePlaybackStore.getState().setProgress(position, duration);
  }
}

export const audioService = new AudioService();
