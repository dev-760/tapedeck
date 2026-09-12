import { StreamInfo } from '../providers/types';

export interface AudioBackend {
  init(): Promise<void>;
  play(stream: StreamInfo, trackId: string): Promise<void>;
  pause(): Promise<void>;
  resume(): Promise<void>;
  stop(): Promise<void>;
  seekTo(positionMs: number): Promise<void>;
  getPosition(): Promise<number>;
  getDuration(): Promise<number>;
  setVolume(volume: number): Promise<void>;
  supportsSeek(stream: StreamInfo): boolean;
  dispose(): Promise<void>;
}
