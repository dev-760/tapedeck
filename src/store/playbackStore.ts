import { create } from 'zustand';
import { Track, StreamInfo, ProviderId } from '../providers/types';

interface PlaybackState {
  currentTrack: Track | null;
  streamInfo: StreamInfo | null;
  activeProviderId: ProviderId | null;
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
  positionMs: number;
  durationMs: number;
  
  setCurrentTrack: (track: Track | null) => void;
  setStreamInfo: (stream: StreamInfo | null, providerId: ProviderId | null) => void;
  setPlaying: (playing: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setProgress: (position: number, duration: number) => void;
}

export const usePlaybackStore = create<PlaybackState>((set) => ({
  currentTrack: null,
  streamInfo: null,
  activeProviderId: null,
  isPlaying: false,
  isLoading: false,
  error: null,
  positionMs: 0,
  durationMs: 0,
  
  setCurrentTrack: (track) => set({ currentTrack: track, positionMs: 0 }),
  setStreamInfo: (streamInfo, activeProviderId) => set({ streamInfo, activeProviderId }),
  setPlaying: (isPlaying) => set({ isPlaying }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setProgress: (positionMs, durationMs) => set({ positionMs, durationMs }),
}));
