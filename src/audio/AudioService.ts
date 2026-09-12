import { AudioBackend } from './AudioBackend';
import { ExpoAudioBackend } from './ExpoAudioBackend';
import { TrackPlayerBackend } from './TrackPlayerBackend';
import { IS_EXPO_GO } from '../utils/platform';
import { resolveStreamWithFallback } from '../providers/providerUtils';
import { usePlaybackStore } from '../store/playbackStore';
import { logger } from '../logging/Logger';
import { Track } from '../providers/types';

class AudioService {
  private backend: AudioBackend;

  constructor() {
    this.backend = IS_EXPO_GO ? new ExpoAudioBackend() : new TrackPlayerBackend();
  }

  async init() {
    await this.backend.init();
  }

  async playTrack(track: Track) {
    const store = usePlaybackStore.getState();
    store.setLoading(true);
    store.setCurrentTrack(track);

    try {
      logger.info('AudioService', `Resolving stream for track: ${track.id}`);
      const { streamInfo, providerId } = await resolveStreamWithFallback(track.id);
      
      store.setStreamInfo(streamInfo, providerId);
      logger.info('AudioService', `Playing stream from ${providerId} (${streamInfo.format})`);
      
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
