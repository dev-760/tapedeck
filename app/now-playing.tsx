import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar, Animated, Easing } from 'react-native';
import { Icon } from '../src/components/ui/Icon';
import { useFonts, SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold, SpaceGrotesk_400Regular, SpaceGrotesk_500Medium } from '@expo-google-fonts/space-grotesk';
import { CourierPrime_400Regular, CourierPrime_700Bold } from '@expo-google-fonts/courier-prime';
import { COLORS, FONTS } from '../src/theme/theme';
import { useRouter } from 'expo-router';
import { usePlaybackStore } from '../src/store/playbackStore';
import { audioService } from '../src/audio/AudioService';
import { formatDurationMs } from '../src/utils/formatting';

export default function NowPlayingModal() {
  const router = useRouter();
  const { currentTrack, isPlaying, positionMs, durationMs, streamInfo } = usePlaybackStore();
  
  const [bassBoost, setBassBoost] = useState(true);
  const [notchFav, setNotchFav] = useState(false);
  const spinLeft = useRef(new Animated.Value(0)).current;
  const spinRight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let animL: Animated.CompositeAnimation | null = null;
    let animR: Animated.CompositeAnimation | null = null;
    if (isPlaying) {
      spinLeft.setValue(0); spinRight.setValue(0);
      animL = Animated.loop(Animated.timing(spinLeft, { toValue: 1, duration: 4000, easing: Easing.linear, useNativeDriver: true }));
      animR = Animated.loop(Animated.timing(spinRight, { toValue: 1, duration: 4000, easing: Easing.linear, useNativeDriver: true }));
      animL.start(); animR.start();
    } else {
      spinLeft.stopAnimation(); spinRight.stopAnimation();
    }
    return () => { animL?.stop(); animR?.stop(); };
  }, [isPlaying]);

  const rotateL = spinLeft.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const rotateR = spinRight.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  const activeVUMeters = isPlaying ? Math.floor(Math.random() * 4) + 6 : 0; // Fake VU for now

  const renderVU = (activeCount: number) => Array.from({ length: 12 }).map((_, i) => {
    let c = COLORS.tertiary;
    if (i >= 8 && i < 10) c = COLORS.secondary;
    if (i >= 10) c = COLORS.error;
    return <View key={i} style={[s.vuSeg, { backgroundColor: c, opacity: i < activeCount ? 1 : 0.15 }]} />;
  });

  const progressPercent = durationMs > 0 ? (positionMs / durationMs) * 100 : 0;

  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle="light-content" />
      <View style={s.header}>
        <TouchableOpacity style={s.iconBtn} onPress={() => router.back()}><Icon name="chevron-down" size={24} color={COLORS.onSurface} /></TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Text style={s.hSub}>DECK MECHANISM // EXPANDED</Text>
          <Text style={s.hTitle}>Player Deck</Text>
        </View>
        <TouchableOpacity style={s.iconBtn}><Icon name="options" size={20} color={COLORS.onSurface} /></TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Metadata Strip */}
        <View style={s.metaStrip}>
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <View style={s.dot} /><Text style={s.metaTxt}>TPS-AUDIOPHILE // WM-D6C PRO CHASSIS</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
            <Icon name="speedometer-outline" size={14} color={COLORS.onSurfaceVariant} />
            <Text style={s.speedTxt}>4.8 cm/s</Text>
          </View>
        </View>

        {/* Cassette Well */}
        <View style={s.wellOuter}>
          <View style={s.wellInner}>
            <View style={s.shell}>
              {[{ top: 8, left: 8 }, { top: 8, right: 8 }, { bottom: 8, left: 8 }, { bottom: 8, right: 8 }].map((p, i) => (
                <View key={i} style={[s.screw, p]}><View style={s.screwLine} /></View>
              ))}
              
              <View style={s.jCard}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <Text style={s.jcHeader}>SIDE A // {streamInfo?.format?.toUpperCase() || 'UNKNOWN'}</Text>
                  <Text style={s.jcMeta}>TYPE II • CrO2 70µs</Text>
                </View>
                <Text style={s.jcTitle} numberOfLines={1}>{currentTrack?.title || 'NO TAPE'}</Text>
                <Text style={s.jcArtist} numberOfLines={1}>{currentTrack?.artist || '—'}</Text>
              </View>

              <View style={s.tapeWindow}>
                <View style={s.pathBg} />
                {/* Left Spool */}
                <View style={s.spoolBox}>
                  <Animated.View style={[s.spoolHub, { transform: [{ rotate: rotateL }] }]}>
                    <View style={s.toothTop} /><View style={s.toothBottom} />
                    <View style={s.toothLeft} /><View style={s.toothRight} />
                    <View style={s.hubCenter} />
                  </Animated.View>
                </View>
                {/* Center Aperture */}
                <View style={s.centerAperture}>
                  <View style={s.headSight}><Icon name="radio" size={14} color={COLORS.primary} /></View>
                  <View style={s.pinchRollers}><View style={s.roller} /><View style={s.head} /><View style={s.roller} /></View>
                </View>
                {/* Right Spool */}
                <View style={s.spoolBox}>
                  <Animated.View style={[s.spoolHub, { transform: [{ rotate: rotateR }] }]}>
                    <View style={s.toothTop} /><View style={s.toothBottom} />
                    <View style={s.toothLeft} /><View style={s.toothRight} />
                    <View style={s.hubCenter} />
                  </Animated.View>
                </View>
              </View>

              <View style={s.lowerGuides}>
                <View style={s.guideSmall} /><View style={s.guideLarge} /><View style={s.guideSmall} />
              </View>
            </View>
          </View>
        </View>

        {/* Telemetry */}
        <View style={s.telemetryContainer}>
          <View style={s.telemetryCard}>
            <View style={s.telHeader}>
              <View style={s.counterContainer}>
                <Text style={s.counterLabel}>INDEX</Text>
                <View style={s.counterDigits}>
                  <Text style={s.counterText}>0</Text>
                  <Text style={s.counterText}>2</Text>
                  <Text style={s.counterText}>4</Text>
                </View>
                <TouchableOpacity style={s.resetBtn}><Icon name="refresh" size={13} color={COLORS.onSurface} /></TouchableOpacity>
              </View>
              <View style={{ alignItems: 'flex-end', gap: 4 }}>
                <Text style={s.peakLabel}>PEAK LEVEL</Text>
                <Text style={s.peakMeta}>+3 dB DETECT</Text>
                <View style={s.peakLed} />
              </View>
            </View>

            <View style={s.vuContainer}>
              <View style={s.vuScale}>
                {['-20', '-10', '-5', '-3', '0', '+2', '+3 dB'].map((t, i) => (
                  <Text key={i} style={[s.vuScaleTxt, i === 5 && { color: COLORS.secondary }, i === 6 && { color: COLORS.error }]}>{t}</Text>
                ))}
              </View>
              <View style={s.vuRow}><Text style={s.vuCh}>L</Text><View style={s.vuSegs}>{renderVU(isPlaying ? activeVUMeters : 0)}</View></View>
              <View style={s.vuRow}><Text style={s.vuCh}>R</Text><View style={s.vuSegs}>{renderVU(isPlaying ? activeVUMeters - 1 : 0)}</View></View>
            </View>

            <View style={s.progressContainer}>
              <View style={s.progressBg}><View style={[s.progressFill, { width: `${progressPercent}%` }]} /></View>
              <View style={s.progressTimeRow}>
                <Text style={s.progressTime}>{formatDurationMs(positionMs)}</Text>
                <Text style={s.progressMeta}>TAPE SPOOL PROGRESS</Text>
                <Text style={s.progressTime}>{streamInfo?.isLive ? 'LIVE' : `-${formatDurationMs(durationMs - positionMs)}`}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Transport */}
        <View style={s.transportContainer}>
          <View style={s.transportDeck}>
            {[
              { i: 'play-skip-back', l: 'REW', action: () => audioService.seekTo(Math.max(0, positionMs - 10000)) },
              { i: 'play', l: 'PLAY', active: isPlaying, action: () => audioService.resume() },
              { i: 'play-skip-forward', l: 'F.FWD', action: () => audioService.seekTo(positionMs + 10000) },
              { i: 'stop', l: 'STOP/EJ', action: () => audioService.stop() },
              { i: 'pause', l: 'PAUSE', active: !isPlaying && positionMs > 0, action: () => audioService.pause() },
            ].map((btn, i) => (
              <TouchableOpacity key={i} style={[s.pianoKey, btn.active && s.pianoKeyActive]} onPress={btn.action}>
                {btn.active && <View style={[s.playLed]} />}
                <Icon name={btn.i as any} size={24} color={btn.active ? COLORS.secondary : COLORS.onSurface} style={{ marginTop: 4 }} />
                <Text style={[s.pianoKeyTxt, btn.active && { color: COLORS.secondary }]}>{btn.l}</Text>
              </TouchableOpacity>
            ))}
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
  hSub: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.primary, textTransform: 'uppercase', letterSpacing: 1.2 },
  hTitle: { fontFamily: FONTS.display, fontSize: 18, color: COLORS.onSurface, textTransform: 'uppercase' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.secondary },
  metaStrip: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  metaTxt: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.primary, textTransform: 'uppercase', letterSpacing: 1.2 },
  speedTxt: { fontFamily: FONTS.monoBold, fontSize: 12, color: COLORS.onSurfaceVariant },
  wellOuter: { paddingHorizontal: 16, marginVertical: 8 },
  wellInner: { borderRadius: 12, backgroundColor: COLORS.surfaceContainerLowest, padding: 12, borderTopWidth: 3, borderTopColor: 'rgba(0,0,0,0.8)' },
  shell: { backgroundColor: COLORS.surfaceContainerHigh, borderRadius: 8, padding: 12, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.7, shadowRadius: 8, elevation: 6 },
  screw: { position: 'absolute', width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.outlineVariant, opacity: 0.6 },
  screwLine: { width: 6, height: 1, backgroundColor: COLORS.surfaceContainerLowest, alignSelf: 'center', marginTop: 3.5 },
  jCard: { width: '100%', backgroundColor: COLORS.surfaceBright, borderRadius: 4, padding: 10, marginBottom: 8, borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.4)' },
  jcHeader: { fontFamily: FONTS.displayBold, fontSize: 10, color: COLORS.secondary, textTransform: 'uppercase', letterSpacing: 1 },
  jcMeta: { fontFamily: FONTS.monoBold, fontSize: 12, color: COLORS.onSurfaceVariant },
  jcTitle: { fontFamily: FONTS.display, fontSize: 18, color: COLORS.onSurface, textTransform: 'uppercase', marginTop: 2 },
  jcArtist: { fontFamily: FONTS.mono, fontSize: 14, color: COLORS.onSurfaceVariant, textTransform: 'uppercase', marginTop: 2 },
  tapeWindow: { width: '100%', height: 144, borderRadius: 4, backgroundColor: COLORS.surfaceContainerLowest, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 8, overflow: 'hidden', borderTopWidth: 3, borderTopColor: 'rgba(0,0,0,0.85)' },
  pathBg: { position: 'absolute', left: 48, right: 48, top: '50%', height: 64, marginTop: -32, backgroundColor: 'rgba(26, 28, 30, 0.4)', borderRadius: 32 },
  spoolBox: { width: 96, height: 96, borderRadius: 48, backgroundColor: COLORS.surfaceContainerLowest, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.9, shadowRadius: 4, elevation: 5, zIndex: 10 },
  spoolHub: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.surfaceContainerHighest, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 3, elevation: 3 },
  toothTop: { position: 'absolute', width: 4, height: 12, backgroundColor: COLORS.primary, borderRadius: 2, top: -2 },
  toothBottom: { position: 'absolute', width: 4, height: 12, backgroundColor: COLORS.primary, borderRadius: 2, bottom: -2 },
  toothLeft: { position: 'absolute', width: 12, height: 4, backgroundColor: COLORS.primary, borderRadius: 2, left: -2 },
  toothRight: { position: 'absolute', width: 12, height: 4, backgroundColor: COLORS.primary, borderRadius: 2, right: -2 },
  hubCenter: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.surfaceContainerHigh },
  centerAperture: { alignItems: 'center', justifyContent: 'center', zIndex: 10 },
  headSight: { width: 32, height: 16, borderTopLeftRadius: 4, borderTopRightRadius: 4, backgroundColor: COLORS.surfaceContainer, alignItems: 'center', justifyContent: 'center' },
  pinchRollers: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  roller: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.surfaceBright },
  head: { width: 14, height: 12, backgroundColor: COLORS.outline, borderRadius: 2 },
  lowerGuides: { width: '75%', height: 12, backgroundColor: 'rgba(51, 53, 55, 0.8)', borderBottomLeftRadius: 6, borderBottomRightRadius: 6, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 16, marginTop: 4 },
  guideSmall: { width: 8, height: 6, backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 2 },
  guideLarge: { width: 16, height: 6, backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 2 },
  telemetryContainer: { paddingHorizontal: 16, marginTop: 12 },
  telemetryCard: { backgroundColor: COLORS.surfaceContainerHigh, borderRadius: 12, padding: 12, shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 6, elevation: 5 },
  telHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  counterContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  counterLabel: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.onSurfaceVariant, textTransform: 'uppercase' },
  counterDigits: { flexDirection: 'row', backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 4, gap: 4, borderTopWidth: 2, borderTopColor: 'rgba(0,0,0,0.8)' },
  counterText: { fontFamily: FONTS.monoBold, fontSize: 20, color: COLORS.primary },
  resetBtn: { width: 24, height: 24, borderRadius: 4, backgroundColor: COLORS.surfaceContainer, alignItems: 'center', justifyContent: 'center' },
  peakLabel: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.onSurfaceVariant, textTransform: 'uppercase' },
  peakMeta: { fontFamily: FONTS.mono, fontSize: 10, color: COLORS.tertiary },
  peakLed: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.error, shadowColor: COLORS.error, shadowOpacity: 0.9, shadowRadius: 4, elevation: 4 },
  vuContainer: { backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 8, padding: 10, gap: 6, borderTopWidth: 2, borderTopColor: 'rgba(0,0,0,0.9)' },
  vuScale: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4, marginBottom: 4 },
  vuScaleTxt: { fontFamily: FONTS.monoBold, fontSize: 8, color: COLORS.onSurfaceVariant },
  vuRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  vuCh: { fontFamily: FONTS.monoBold, fontSize: 12, color: COLORS.primary, width: 12 },
  vuSegs: { flex: 1, flexDirection: 'row', gap: 4, height: 12 },
  vuSeg: { flex: 1, borderRadius: 2, height: '100%' },
  progressContainer: { marginTop: 8, gap: 4 },
  progressBg: { width: '100%', height: 10, backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 5, overflow: 'hidden', padding: 2 },
  progressFill: { height: '100%', backgroundColor: COLORS.secondary, borderRadius: 4, shadowColor: COLORS.secondary, shadowOpacity: 0.8, shadowRadius: 3 },
  progressTimeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressTime: { fontFamily: FONTS.mono, fontSize: 14, color: COLORS.onSurfaceVariant },
  progressMeta: { fontFamily: FONTS.displayBold, fontSize: 10, color: COLORS.primary, textTransform: 'uppercase' },
  transportContainer: { paddingHorizontal: 16, marginTop: 16 },
  transportDeck: { backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 12, padding: 8, flexDirection: 'row', gap: 6, borderTopWidth: 3, borderTopColor: 'rgba(0,0,0,0.85)' },
  pianoKey: { flex: 1, height: 64, borderRadius: 4, backgroundColor: COLORS.surfaceContainerHigh, alignItems: 'center', justifyContent: 'center', shadowColor: '#121416', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 4, marginBottom: 4 },
  pianoKeyActive: { backgroundColor: COLORS.surfaceContainerHighest, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0, elevation: 0, transform: [{ translateY: 4 }], borderTopWidth: 2, borderTopColor: 'rgba(0,0,0,0.8)' },
  pianoKeyTxt: { fontFamily: FONTS.displayBold, fontSize: 8, color: COLORS.onSurfaceVariant, textTransform: 'uppercase', marginTop: 4 },
  playLed: { position: 'absolute', top: 6, width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.secondary, shadowColor: COLORS.secondary, shadowOpacity: 1, shadowRadius: 4, elevation: 4 },
});
