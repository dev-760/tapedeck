import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar, Image } from 'react-native';
import { Icon } from '../../src/components/ui/Icon';
import { COLORS, FONTS } from '../../src/theme/theme';
import { audioService } from '../../src/audio/AudioService';
import { radioParadiseProvider } from '../../src/providers/radioparadise';

export default function LiveScreen() {
  const handlePlayLive = async (channel: string) => {
    try {
      audioService.playTrack({
        id: `rp-${channel}`,
        title: `Radio Paradise - ${channel.toUpperCase()}`,
        artist: 'Live Broadcast',
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle="light-content" />
      <View style={s.header}>
        <TouchableOpacity style={s.iconBtn}><Icon name="menu" size={20} color={COLORS.onSurface} /></TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Text style={s.hSub}>DECK MECHANISM // EXPANDED</Text>
          <Text style={s.hTitle}>Live Tuner</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        {/* Banner */}
        <View style={s.banner}>
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <View style={s.dot} /><Text style={s.bannerTxt}>FM TUNER // LOSSLESS STREAM</Text>
          </View>
          <View style={s.calBadge}><Text style={s.calTxt}>ANT: LOCKED</Text></View>
        </View>

        <View style={s.card}>
          <View style={s.cardHeader}>
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
              <Icon name="radio" size={18} color={COLORS.secondary} />
              <Text style={s.cardTitle}>RADIO PARADISE{'\n'}BANDS</Text>
            </View>
            <Text style={s.cardMeta}>FLAC{'\n'}BROADCAST</Text>
          </View>

          {['main', 'mellow', 'rock', 'world'].map((band) => (
            <TouchableOpacity 
              key={band} 
              style={s.bandBox}
              onPress={() => handlePlayLive(band)}
            >
              <View style={s.bandHeader}>
                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                  <Text style={s.bandName}>{band} MIX</Text>
                  <View style={s.hzBadge}><Text style={s.hzTxt}>LIVE</Text></View>
                </View>
                <Icon name="play-circle" size={24} color={COLORS.secondary} />
              </View>
              <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center', marginTop: 8 }}>
                <Icon name="pulse" size={14} color={COLORS.primary} />
                <Text style={s.bandDesc}>Flac Lossless Stream</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  header: { height: 64, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center' },
  iconBtn: { width: 44, height: 44, borderRadius: 4, backgroundColor: COLORS.surfaceContainerHigh, alignItems: 'center', justifyContent: 'center' },
  hSub: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.primary, textTransform: 'uppercase', letterSpacing: 1.2 },
  hTitle: { fontFamily: FONTS.display, fontSize: 18, color: COLORS.onSurface, textTransform: 'uppercase' },
  banner: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: COLORS.surfaceContainerLowest, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.secondary },
  bannerTxt: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1.2 },
  calBadge: { backgroundColor: COLORS.surfaceContainerHighest, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  calTxt: { fontFamily: FONTS.monoBold, fontSize: 10, color: COLORS.secondary, fontWeight: '700' },
  card: { marginHorizontal: 16, marginTop: 16, backgroundColor: COLORS.surfaceContainerLow, padding: 16, borderRadius: 12, gap: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  cardTitle: { fontFamily: FONTS.display, fontSize: 18, color: COLORS.onSurface, textTransform: 'uppercase', letterSpacing: 1, lineHeight: 22 },
  cardMeta: { fontFamily: FONTS.monoBold, fontSize: 10, color: COLORS.tertiary, textAlign: 'right' },
  bandBox: { backgroundColor: COLORS.surfaceContainer, padding: 12, borderRadius: 8, borderLeftWidth: 3, borderLeftColor: COLORS.secondary },
  bandHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bandName: { fontFamily: FONTS.displayBold, fontSize: 14, color: COLORS.onSurface, textTransform: 'uppercase' },
  hzBadge: { backgroundColor: COLORS.primaryContainer, paddingHorizontal: 4, paddingVertical: 2, borderRadius: 2 },
  hzTxt: { fontFamily: FONTS.monoBold, fontSize: 10, color: COLORS.primary },
  bandDesc: { fontFamily: FONTS.mono, fontSize: 12, color: COLORS.onSurfaceVariant },
});
