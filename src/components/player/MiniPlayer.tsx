import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Icon } from '../ui/Icon';
import { COLORS, FONTS } from '../../theme/theme';
import { usePlaybackStore } from '../../store/playbackStore';
import { audioService } from '../../audio/AudioService';
import { formatDurationMs } from '../../utils/formatting';
import { useRouter } from 'expo-router';

export const MiniPlayer = () => {
  const currentTrack = usePlaybackStore(state => state.currentTrack);
  const isPlaying = usePlaybackStore(state => state.isPlaying);
  const positionMs = usePlaybackStore(state => state.positionMs);
  const router = useRouter();

  if (!currentTrack) return null;

  return (
    <Pressable style={s.bottomPlayer} onPress={() => router.push('/now-playing')}>
      <View style={s.bpHub}><Icon name="settings" size={16} color={COLORS.secondary} /></View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
          <View style={s.miniSideBadge}><Text style={s.miniSideTxt}>SIDE A</Text></View>
          <Text style={s.bpTime}>{formatDurationMs(positionMs)}</Text>
        </View>
        <Text style={s.bpTitle} numberOfLines={1}>{currentTrack.title} — {currentTrack.artist}</Text>
      </View>
      <TouchableOpacity style={s.bpBtn} onPress={() => {}}>
        <Icon name="play-skip-back" size={16} color={COLORS.onSurface} />
      </TouchableOpacity>
      <TouchableOpacity 
        style={[s.bpBtn, { backgroundColor: COLORS.secondary }]}
        onPress={() => isPlaying ? audioService.pause() : audioService.resume()}
      >
        <Icon name={isPlaying ? "pause" : "play"} size={18} color={COLORS.onSecondary} />
      </TouchableOpacity>
      <TouchableOpacity style={s.bpBtn} onPress={() => {}}>
        <Icon name="play-skip-forward" size={16} color={COLORS.onSurface} />
      </TouchableOpacity>
    </Pressable>
  );
};

const s = StyleSheet.create({
  bottomPlayer: { 
    position: 'absolute', 
    bottom: 64, // Above the tab bar
    left: 16, 
    right: 16, 
    backgroundColor: 'rgba(40,42,44,0.95)', 
    padding: 8, 
    borderRadius: 8, 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8, 
    shadowColor: '#000', 
    shadowOpacity: 0.8, 
    shadowRadius: 8, 
    elevation: 8 
  },
  bpHub: { width: 32, height: 32, borderRadius: 4, backgroundColor: COLORS.secondaryContainer, alignItems: 'center', justifyContent: 'center' },
  miniSideBadge: { backgroundColor: COLORS.secondary, paddingHorizontal: 4, paddingVertical: 2, borderRadius: 2 },
  miniSideTxt: { fontFamily: FONTS.displayBold, fontSize: 8, color: COLORS.onSecondary, textTransform: 'uppercase' },
  bpTime: { fontFamily: FONTS.monoBold, fontSize: 10, color: COLORS.primary },
  bpTitle: { fontFamily: FONTS.monoBold, fontSize: 13, color: COLORS.onSurface, marginTop: 2 },
  bpBtn: { width: 32, height: 32, borderRadius: 4, backgroundColor: COLORS.surfaceContainer, alignItems: 'center', justifyContent: 'center' },
});
