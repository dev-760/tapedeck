import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar, Image } from 'react-native';
import { Icon } from '../../src/components/ui/Icon';
import { COLORS, FONTS } from '../../src/theme/theme';
import { usePlaybackStore } from '../../src/store/playbackStore';
import { audioService } from '../../src/audio/AudioService';
import { formatDurationMs } from '../../src/utils/formatting';

export default function HomeScreen() {
  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle="light-content" />
      <View style={s.header}>
        <TouchableOpacity style={s.iconBtn}><Icon name="menu" size={20} color={COLORS.onSurface} /></TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Text style={s.hSub}>DECK MECHANISM // EXPANDED</Text>
          <Text style={s.hTitle}>TapeDeck System</Text>
        </View>
        <TouchableOpacity style={s.iconBtn}><Icon name="options" size={20} color={COLORS.onSurface} /></TouchableOpacity>
        <View style={s.avatar}><Icon name="person" size={18} color={COLORS.onPrimary} /></View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* System Header */}
        <View style={s.sysHeader}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <View style={s.dot} /><Text style={s.sysTitle}>WM-D6C PRO STEREO</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <Icon name="battery-full" size={14} color={COLORS.secondary} />
              <Text style={s.battTxt}>94%</Text>
              <Text style={{ color: COLORS.primaryContainer }}>|</Text>
              <Text style={s.dolbyTxt}>DOLBY B•NR</Text>
            </View>
          </View>

          <View style={s.healthRow}>
            {[
              { l: 'VAULT', v: '148 TAPES' },
              { l: 'TOTAL SPOOL', v: '47.4 HRS' },
              { l: 'HEAD STATUS', v: 'DEMAG // OK', c: COLORS.tertiary },
            ].map((item, i) => (
              <React.Fragment key={i}>
                <View style={s.healthItem}>
                  <Text style={s.healthLabel}>{item.l}</Text>
                  <Text style={[s.healthVal, item.c && { color: item.c }]}>{item.v}</Text>
                </View>
                {i < 2 && <View style={s.healthDivider} />}
              </React.Fragment>
            ))}
            <View style={s.vuMini}>
              <View style={{ flexDirection: 'row', gap: 1 }}>
                {[COLORS.tertiary, COLORS.tertiary, COLORS.secondary, COLORS.error].map((c, i) => (
                  <View key={i} style={[s.vuMiniBar, { backgroundColor: c }]} />
                ))}
              </View>
              <Text style={s.vuMiniLabel}>PEAK VU</Text>
            </View>
          </View>
        </View>

        {/* Continue Listening */}
        <View style={{ marginTop: 24 }}>
          <View style={{ paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <Icon name="albums" size={16} color={COLORS.secondary} />
              <Text style={s.sectionTitle}>CONTINUE LISTENING // SHELF I</Text>
            </View>
            <Text style={s.pullToDeck}>PULL TO DECK ▼</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
            {[
              { title: '01. Karma Police', artist: 'Radiohead — OK Computer', type: 'SIDE A • CR-O2', color: COLORS.errorContainer, id: 'track1' },
              { title: '02. Nightcall', artist: 'Kavinsky — OutRun Synth', type: 'SIDE A • FERRIC', color: COLORS.tertiaryContainer, id: 'track2' },
              { title: '03. Blue in Green', artist: 'Miles Davis — Kind of Blue', type: 'SIDE B • METAL IV', color: COLORS.outlineVariant, id: 'track3' },
            ].map((t, i) => (
              <TouchableOpacity key={i} style={s.spineCard} onPress={() => {
                audioService.playTrack({ id: t.id, title: t.title, artist: t.artist });
              }}>
                <View style={[s.spineColor, { backgroundColor: t.color }]} />
                <View style={{ flex: 1 }}>
                  <Text style={s.spineType}>{t.type}</Text>
                  <Text style={s.spineTitle} numberOfLines={1}>{t.title}</Text>
                  <Text style={s.spineArtist} numberOfLines={1}>{t.artist}</Text>
                </View>
                <TouchableOpacity style={s.loadIconBtn}><Icon name="download" size={18} color={COLORS.onSurface} /></TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Mixtape Vault */}
        <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <Icon name="disc" size={16} color={COLORS.secondary} />
              <Text style={s.sectionTitle}>CURATED MIXTAPE VAULT</Text>
            </View>
            <Text style={s.seriesTxt}>SERIES // 04</Text>
          </View>
          <View style={s.mixtapeCard}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWb7SSjCY5rFrCx5gsgiKwGvqx86Dk2c1SKZUCId_KDSB9IEr0EJPs0QXMjBnc4K8jhfvdgrXHAsQ5nP2V_xRtbODSNUK799fdS1WtePkAq4p4LxJZLbpniFzUpVS_M7Gv1JD0LnxQDcnlliYPoPgTClLSj4dgtWkkZmILIpRFB3_WlmDI91disHNTS3DXP60EPIHjT-BOTix3yL8f3SO8Fmu17GlC21NjHeYTuXyT' }}
              style={s.mixtapeImage}
            />
            <View style={s.mixtapeContent}>
              <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                <View style={s.c90Badge}><Text style={s.c90Txt}>C-90 CHROME</Text></View>
                <Text style={s.totalRun}>48:12 TOTAL RUN</Text>
              </View>
              <Text style={s.mixtapeTitle}>NIGHT DRIVE // VOL. 4</Text>
              
              <View style={s.jcardNotes}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                  <Text style={s.notesLabel}>J-CARD INSERT NOTES</Text>
                  <Text style={s.notesSub}>12 MASTERED CUTS</Text>
                </View>
                {[
                  { n: 'A•01', t: 'Resonance — HOME', d: '3:32' },
                  { n: 'A•02', t: 'Days of Thunder — The Midnight', d: '5:24' },
                  { n: 'A•03', t: 'Sunset — Gunship', d: '4:40' },
                ].map((track, i) => (
                  <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text style={s.trackTxt}><Text style={s.trackNum}>{track.n}</Text> {track.t}</Text>
                    <Text style={s.trackDur}>{track.d}</Text>
                  </View>
                ))}
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                  <Icon name="checkmark-circle" size={16} color={COLORS.tertiary} />
                  <Text style={s.calibratedTxt}>DOLBY C CALIBRATED</Text>
                </View>
                <TouchableOpacity style={s.loadAllBtn}><Icon name="play-circle" size={16} color={COLORS.onPrimary} /><Text style={s.loadAllTxt}>LOAD ALL 12 TRACKS</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  header: { height: 64, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center' },
  iconBtn: { width: 44, height: 44, borderRadius: 4, backgroundColor: COLORS.surfaceContainerHigh, alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', marginLeft: 8 },
  hSub: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.primary, textTransform: 'uppercase', letterSpacing: 1.2 },
  hTitle: { fontFamily: FONTS.display, fontSize: 18, color: COLORS.onSurface, textTransform: 'uppercase' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.secondary },
  sysHeader: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: COLORS.surfaceContainerLowest },
  sysTitle: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.primary, textTransform: 'uppercase', letterSpacing: 1.2 },
  battTxt: { fontFamily: FONTS.monoBold, fontSize: 14, color: COLORS.onSurfaceVariant },
  dolbyTxt: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.secondary, textTransform: 'uppercase' },
  healthRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surfaceContainer, padding: 8, borderRadius: 4, marginTop: 8 },
  healthItem: { flex: 1, alignItems: 'center' },
  healthLabel: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.primary, textTransform: 'uppercase' },
  healthVal: { fontFamily: FONTS.monoBold, fontSize: 14, color: COLORS.onSurface, marginTop: 2 },
  healthDivider: { width: 1, height: 24, backgroundColor: COLORS.surfaceContainerHighest },
  vuMini: { alignItems: 'center', paddingHorizontal: 8 },
  vuMiniBar: { width: 4, height: 12, borderRadius: 2 },
  vuMiniLabel: { fontFamily: FONTS.displayBold, fontSize: 8, color: COLORS.onSurfaceVariant, marginTop: 2 },
  sectionTitle: { fontFamily: FONTS.display, fontSize: 18, color: COLORS.onSurface, textTransform: 'uppercase', letterSpacing: 1 },
  pullToDeck: { fontFamily: FONTS.displayBold, fontSize: 10, color: COLORS.primary, textTransform: 'uppercase', letterSpacing: 1.2 },
  spineCard: { width: 256, padding: 12, borderRadius: 4, backgroundColor: COLORS.surfaceContainer, flexDirection: 'row', alignItems: 'center', gap: 12 },
  spineColor: { width: 6, height: 48, borderRadius: 3 },
  spineType: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.secondary, textTransform: 'uppercase', letterSpacing: 1.2 },
  spineTitle: { fontFamily: FONTS.monoBold, fontSize: 13, color: COLORS.onSurface, marginTop: 2 },
  spineArtist: { fontFamily: FONTS.mono, fontSize: 11, color: COLORS.onSurfaceVariant },
  loadIconBtn: { width: 32, height: 32, borderRadius: 4, backgroundColor: COLORS.surfaceContainerHighest, alignItems: 'center', justifyContent: 'center' },
  seriesTxt: { fontFamily: FONTS.displayBold, fontSize: 10, color: COLORS.primary, textTransform: 'uppercase', letterSpacing: 1.2 },
  mixtapeCard: { borderRadius: 8, backgroundColor: COLORS.surfaceContainer, overflow: 'hidden' },
  mixtapeImage: { width: '100%', height: 144 },
  mixtapeContent: { padding: 12 },
  c90Badge: { backgroundColor: COLORS.secondary, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 2 },
  c90Txt: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.onSecondary, textTransform: 'uppercase' },
  totalRun: { fontFamily: FONTS.monoBold, fontSize: 14, color: COLORS.onSurface },
  mixtapeTitle: { fontFamily: FONTS.displayMedium, fontSize: 22, color: COLORS.onSurface, marginTop: 4 },
  jcardNotes: { backgroundColor: COLORS.surfaceContainerHigh, padding: 12, borderRadius: 4, marginTop: 8 },
  notesLabel: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.primary, textTransform: 'uppercase', letterSpacing: 1.2 },
  notesSub: { fontFamily: FONTS.mono, fontSize: 11, color: COLORS.onSurfaceVariant },
  trackTxt: { fontFamily: FONTS.mono, fontSize: 13, color: COLORS.onSurface },
  trackNum: { fontFamily: FONTS.monoBold, color: COLORS.secondary },
  trackDur: { fontFamily: FONTS.mono, fontSize: 13, color: COLORS.onSurfaceVariant },
  calibratedTxt: { fontFamily: FONTS.displayBold, fontSize: 10, color: COLORS.onSurfaceVariant, textTransform: 'uppercase' },
  loadAllBtn: { flexDirection: 'row', gap: 4, alignItems: 'center', backgroundColor: COLORS.primary, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 4 },
  loadAllTxt: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.onPrimary, textTransform: 'uppercase', letterSpacing: 1.2 },
});
