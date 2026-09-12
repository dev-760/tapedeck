import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, Animated, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts, SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import { CourierPrime_400Regular, CourierPrime_700Bold } from '@expo-google-fonts/courier-prime';
import { COLORS, FONTS, SPACING } from './theme';

export default function CassetteTrackDetailJCard() {
  const [fontsLoaded] = useFonts({ SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold, CourierPrime_400Regular, CourierPrime_700Bold });
  const [tilted, setTilted] = useState(false);
  const [starred, setStarred] = useState(false);
  const [toast, setToast] = useState('');
  const rotAngle = useRef(0);
  const hubL = useRef(new Animated.Value(0)).current;
  const hubR = useRef(new Animated.Value(0)).current;

  if (!fontsLoaded) return null;

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(''), 2400); };
  const spin = (val: Animated.Value) => Animated.timing(val, { toValue: rotAngle.current + 360, duration: 800, useNativeDriver: true }).start();

  const loadTape = () => { rotAngle.current += 360; spin(hubL); spin(hubR); setTimeout(() => showToast('TAPE ENGAGED // PLAYHEAD CLOSED'), 400); };

  const rotateL = hubL.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] });
  const rotateR = hubR.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] });

  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle="light-content" />
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity style={s.iconBtn}><MaterialIcons name="arrow-back" size={20} color={COLORS.onSurface} /></TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={s.hSub}>DECK MECHANISM // EXPANDED</Text>
          <Text style={s.hTitle}>J Card Details</Text>
        </View>
        <TouchableOpacity style={s.iconBtn}><MaterialIcons name="equalizer" size={20} color={COLORS.onSurface} /></TouchableOpacity>
        <View style={s.avatar}><MaterialIcons name="person" size={18} color={COLORS.onPrimary} /></View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        {/* Status Ribbon */}
        <View style={s.ribbon}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View style={s.dot} />
            <Text style={s.ribbonText}>INSPECTION TRAY // BAY 01</Text>
          </View>
          <View style={s.typeII}><Text style={s.typeIITxt}>TYPE II</Text><Text style={s.eqTxt}>CrO2 HIGH BIAS 70µs EQ</Text></View>
        </View>

        {/* Cassette Shell */}
        <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
          <View style={[s.shell, tilted && { transform: [{ perspective: 600 }, { rotateX: '12deg' }, { rotateY: '-8deg' }, { scale: 0.98 }] }]}>
            {/* Screws */}
            {[{ top: 8, left: 8 }, { top: 8, right: 8 }, { bottom: 8, left: 8 }, { bottom: 8, right: 8 }].map((p, i) => (
              <View key={i} style={[s.screw, p]}><View style={s.screwLine} /></View>
            ))}

            {/* J-Card Label */}
            <View style={s.labelCard}>
              <View style={s.labelTopStripe}><View style={{ flex: 1, backgroundColor: COLORS.errorContainer }} /><View style={{ flex: 2, backgroundColor: COLORS.secondary }} /></View>
              <View style={{ paddingTop: 6, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1 }}>
                  <Text style={s.labelSmall}>CHROME POSITION // STEREO MASTER</Text>
                  <Text style={s.labelTitle}>TRK #07: PARANOID ANDROID</Text>
                  <Text style={s.labelSub}>RADIOHEAD // OK COMPUTER</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <View style={s.sideABadge}><Text style={s.sideATxt}>SIDE A</Text></View>
                  <Text style={s.duration}>06:27</Text>
                </View>
              </View>

              {/* Tape Window */}
              <View style={s.window}>
                <View style={s.alignTicks}>
                  {['0', '25', '50', '75', '100'].map(t => <Text key={t} style={s.tickTxt}>{t}</Text>)}
                </View>
                <View style={s.windowRow}>
                  <View style={s.spoolBox}>
                    <View style={[s.tapePack, { width: 56, height: 56 }]} />
                    <Animated.View style={[s.hub, { transform: [{ rotate: rotateL }] }]}><View style={s.hubInner} /></Animated.View>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <View style={s.ribbonLine} />
                    <Text style={s.ribbonLabel}>70 µS</Text>
                  </View>
                  <View style={s.spoolBox}>
                    <View style={[s.tapePack, { width: 36, height: 36 }]} />
                    <Animated.View style={[s.hub, { transform: [{ rotate: rotateR }] }]}><View style={s.hubInner} /></Animated.View>
                  </View>
                </View>
              </View>

              {/* Handwritten Note */}
              <View style={s.note}>
                <MaterialIcons name="edit-note" size={15} color={COLORS.error} />
                <Text style={s.noteTxt}>"Do not tape over! Master recording from CD 1997."</Text>
              </View>
            </View>

            {/* Lower Head Aperture */}
            <View style={s.lowerAperture}>
              <View style={s.circle} /><View style={s.bar} />
              <View style={s.centerSlot}><View style={s.centerSlotLine} /></View>
              <View style={s.bar} /><View style={s.circle} />
            </View>
          </View>

          {/* Flip Controls */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 12 }}>
            <TouchableOpacity style={s.tiltBtn} onPress={() => setTilted(!tilted)}>
              <MaterialIcons name="3d-rotation" size={14} color={COLORS.primary} />
              <Text style={s.tiltBtnTxt}>ROTATE TRAY</Text>
            </TouchableOpacity>
            <Text style={{ color: COLORS.outlineVariant, fontSize: 10 }}>•</Text>
            <Text style={s.shellWeight}>SHELL WEIGHT 38g</Text>
          </View>
        </View>

        {/* Load to Walkman */}
        <View style={{ paddingHorizontal: 16, marginTop: 16, gap: 10 }}>
          <TouchableOpacity style={s.loadBtn} onPress={loadTape}>
            <View style={s.loadBtnIcon}><MaterialIcons name="eject" size={22} color={COLORS.onSecondary} /></View>
            <View style={{ flex: 1 }}>
              <Text style={s.loadBtnTitle}>LOAD INTO WALKMAN</Text>
              <Text style={s.loadBtnSub}>ENGAGE PLAYHEAD & PINCH ROLLER</Text>
            </View>
            <MaterialIcons name="play-arrow" size={24} color={COLORS.onSecondary} />
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity style={s.secBtn} onPress={() => showToast('QUEUED AS UP-NEXT TAPE')}>
              <MaterialIcons name="playlist-play" size={20} color={COLORS.primary} />
              <Text style={s.secBtnTxt}>QUEUE UP-NEXT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.secBtn} onPress={() => { setStarred(!starred); showToast(starred ? 'REMOVED FROM FAVORITES' : 'PINNED TO FAVORITE TRAY'); }}>
              <MaterialIcons name={starred ? 'star' : 'star-border'} size={20} color={COLORS.secondary} />
              <Text style={s.secBtnTxt}>STAR CASSETTE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.secBtn}>
              <MaterialIcons name="library-add" size={20} color={COLORS.tertiary} />
              <Text style={s.secBtnTxt}>ADD TO MIXTAPE</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* J-Card Liner Notes */}
        <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <MaterialIcons name="description" size={18} color={COLORS.primary} />
              <Text style={s.sectionTitle}>J-CARD LINER NOTES</Text>
            </View>
            <View style={s.insertBadge}><Text style={s.insertBadgeTxt}>INSERT #01-A</Text></View>
          </View>

          <View style={s.linerCard}>
            <View style={s.foldLine} />
            <View style={{ paddingLeft: 8 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1 }}>
                  <Text style={s.linerSection}>PARANOID ANDROID // SECTION ONE</Text>
                  <Text style={s.linerComposer}>COMPOSERS: YORKE / GREENWOOD / O'BRIEN</Text>
                </View>
                <Text style={s.matrix}>MATRIX: C-90-OKC</Text>
              </View>
              <View style={s.lyricsBox}>
                <Text style={s.lyrics}>
                  "Please could you stop the noise, I'm trying to get some rest{'\n'}
                  From all the unborn chicken voices in my head{'\n'}
                  What's that? (I may be paranoid, but not an android)..."
                </Text>
              </View>
              <View style={s.specsGrid}>
                <View style={s.specItem}><Text style={s.specLabel}>STUDIO LOCATION:</Text><Text style={s.specValue}>St Catherine's Court, Bath, UK</Text></View>
                <View style={s.specItem}><Text style={s.specLabel}>PRODUCTION:</Text><Text style={s.specValue}>Nigel Godrich & Radiohead</Text></View>
                <View style={s.specItem}><Text style={s.specLabel}>TAPE SPEED:</Text><Text style={s.specValue}>4.76 cm/s (1-7/8 ips)</Text></View>
                <View style={s.specItem}><Text style={s.specLabel}>EQ CALIBRATION:</Text><Text style={s.specValue}>70µs CrO2 Position</Text></View>
              </View>
            </View>
          </View>

          {/* Bench Metrics */}
          <View style={s.benchCard}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <Text style={s.benchTitle}>ANALOG BENCH METRICS</Text>
              <MaterialIcons name="tune" size={16} color={COLORS.primary} />
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <View style={s.benchItem}><Text style={s.benchLabel}>MASTER SOURCE</Text><Text style={[s.benchValue, { color: COLORS.secondary }]}>96k/24b</Text></View>
              <View style={s.benchItem}><Text style={s.benchLabel}>DYNAMIC ROOM</Text><Text style={[s.benchValue, { color: COLORS.tertiary }]}>+4.2 dB</Text></View>
              <View style={s.benchItem}><Text style={s.benchLabel}>FORMULATION</Text><Text style={s.benchValue}>CrO2 II</Text></View>
            </View>
          </View>
        </View>

        {/* Walnut Shelf */}
        <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <MaterialIcons name="shelves" size={18} color={COLORS.secondary} />
              <Text style={s.sectionTitle}>ON THIS WALNUT SHELF</Text>
            </View>
            <Text style={s.adjacentTxt}>3 TAPES ADJACENT</Text>
          </View>
          {[
            { title: 'THE BENDS // 1995', sub: 'PARLOPHONE • HIGH BIAS TYPE II', time: '48:37', color: COLORS.secondary },
            { title: 'KID A // 2000', sub: 'TYPE IV METAL • DOLBY C NR', time: '49:56', color: COLORS.error },
            { title: 'IN RAINBOWS // 2007', sub: 'CHROME FORMULA • XL-II RE-ISSUE', time: '42:39', color: COLORS.tertiary },
          ].map((t, i) => (
            <TouchableOpacity key={i} style={s.spine}>
              <View style={[s.spineColor, { backgroundColor: t.color }]} />
              <View style={{ flex: 1 }}>
                <Text style={s.spineTitle}>{t.title}</Text>
                <Text style={s.spineSub}>{t.sub}</Text>
              </View>
              <Text style={s.spineTime}>{t.time}</Text>
              <MaterialIcons name="chevron-right" size={16} color={COLORS.outline} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Toast */}
      {toast !== '' && (
        <View style={s.toast}>
          <MaterialIcons name="cached" size={20} color={COLORS.secondary} />
          <Text style={s.toastTxt}>{toast}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  header: { height: 64, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.4)' },
  iconBtn: { width: 44, height: 44, borderRadius: 4, backgroundColor: COLORS.surfaceContainerHigh, alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', marginLeft: 8 },
  hSub: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.primary, textTransform: 'uppercase', letterSpacing: 1.2 },
  hTitle: { fontFamily: FONTS.display, fontSize: 18, color: COLORS.onSurface, textTransform: 'uppercase' },
  ribbon: { paddingHorizontal: 16, paddingTop: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.secondary },
  ribbonText: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.primary, textTransform: 'uppercase', letterSpacing: 1 },
  typeII: { backgroundColor: COLORS.surfaceContainerHigh, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, flexDirection: 'row', gap: 6, alignItems: 'center' },
  typeIITxt: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.secondary, textTransform: 'uppercase' },
  eqTxt: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.onSurfaceVariant, textTransform: 'uppercase' },
  shell: { backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 12, padding: 12, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 10, elevation: 10 },
  screw: { position: 'absolute', width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.surfaceVariant, alignItems: 'center', justifyContent: 'center' },
  screwLine: { width: 6, height: 2, backgroundColor: COLORS.outlineVariant, transform: [{ rotate: '45deg' }] },
  labelCard: { backgroundColor: COLORS.paperAged, borderRadius: 8, padding: 12, overflow: 'hidden' },
  labelTopStripe: { position: 'absolute', top: 0, left: 0, right: 0, height: 8, flexDirection: 'row' },
  labelSmall: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.onSecondaryFixed, textTransform: 'uppercase', letterSpacing: 1 },
  labelTitle: { fontFamily: FONTS.display, fontSize: 18, color: '#151719', textTransform: 'uppercase', marginTop: 4 },
  labelSub: { fontFamily: FONTS.displayBold, fontSize: 10, color: COLORS.outline, textTransform: 'uppercase', marginTop: 4 },
  sideABadge: { backgroundColor: COLORS.primaryContainer, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 2 },
  sideATxt: { fontFamily: FONTS.monoBold, fontSize: 12, color: COLORS.onSurface },
  duration: { fontFamily: FONTS.monoBold, fontSize: 12, color: COLORS.outline, marginTop: 4 },
  window: { marginTop: 10, marginBottom: 10, height: 80, backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 6, padding: 8, shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 4, overflow: 'hidden' },
  alignTicks: { position: 'absolute', left: 32, right: 32, top: 4, flexDirection: 'row', justifyContent: 'space-between' },
  tickTxt: { fontFamily: FONTS.monoBold, fontSize: 8, color: 'rgba(141,145,148,0.6)' },
  windowRow: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 },
  spoolBox: { width: 56, height: 56, alignItems: 'center', justifyContent: 'center' },
  tapePack: { position: 'absolute', borderRadius: 100, backgroundColor: '#1b1715', borderWidth: 4, borderColor: '#12100e' },
  hub: { width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.surfaceContainerHighest, alignItems: 'center', justifyContent: 'center', zIndex: 10 },
  hubInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.surfaceContainerLowest },
  ribbonLine: { width: 48, height: 4, backgroundColor: '#1a1715', borderRadius: 2 },
  ribbonLabel: { fontFamily: FONTS.monoBold, fontSize: 9, color: 'rgba(190,200,205,0.4)', marginTop: 4 },
  note: { backgroundColor: '#dcd4c7', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 4, flexDirection: 'row', alignItems: 'center', gap: 6 },
  noteTxt: { fontFamily: FONTS.mono, fontSize: 11, color: '#292e31', fontStyle: 'italic', flex: 1 },
  lowerAperture: { width: '75%', marginTop: 8, height: 28, backgroundColor: COLORS.surfaceContainer, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', alignSelf: 'center', paddingHorizontal: 16 },
  circle: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.surfaceContainerLowest },
  bar: { width: 16, height: 8, backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 2 },
  centerSlot: { width: 24, height: 12, backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 2, alignItems: 'center', justifyContent: 'center' },
  centerSlotLine: { width: 12, height: 4, backgroundColor: COLORS.surfaceVariant },
  tiltBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: COLORS.surfaceContainerHigh, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  tiltBtnTxt: { fontFamily: FONTS.displayBold, fontSize: 10, color: COLORS.primary, textTransform: 'uppercase', letterSpacing: 1 },
  shellWeight: { fontFamily: FONTS.monoBold, fontSize: 10, color: COLORS.onSurfaceVariant, letterSpacing: 1 },
  loadBtn: { backgroundColor: COLORS.secondary, borderRadius: 8, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 8, elevation: 5 },
  loadBtnIcon: { width: 36, height: 36, borderRadius: 4, backgroundColor: 'rgba(81,36,0,0.15)', alignItems: 'center', justifyContent: 'center' },
  loadBtnTitle: { fontFamily: FONTS.display, fontSize: 18, color: COLORS.onSecondary, fontWeight: '700', textTransform: 'uppercase' },
  loadBtnSub: { fontFamily: FONTS.displayBold, fontSize: 10, color: 'rgba(81,36,0,0.8)', textTransform: 'uppercase', letterSpacing: 1 },
  secBtn: { flex: 1, backgroundColor: COLORS.surfaceContainerHigh, borderRadius: 4, padding: 10, alignItems: 'center', gap: 4 },
  secBtnTxt: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.onSurface, textTransform: 'uppercase', textAlign: 'center' },
  sectionTitle: { fontFamily: FONTS.display, fontSize: 18, color: COLORS.onSurface, textTransform: 'uppercase', letterSpacing: 1 },
  insertBadge: { backgroundColor: COLORS.surfaceContainerHigh, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  insertBadgeTxt: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.primary },
  linerCard: { backgroundColor: '#ede6d8', borderRadius: 8, padding: 16, shadowColor: '#000', shadowOpacity: 0.6, shadowRadius: 8, elevation: 4 },
  foldLine: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 8, backgroundColor: '#d7cfbf' },
  linerSection: { fontFamily: FONTS.displayBold, fontSize: 9, color: '#70370b', textTransform: 'uppercase', letterSpacing: 1 },
  linerComposer: { fontFamily: FONTS.monoBold, fontSize: 12, color: '#1f2326', marginTop: 4 },
  matrix: { fontFamily: FONTS.monoBold, fontSize: 10, color: COLORS.outline },
  lyricsBox: { marginTop: 12, backgroundColor: '#f5efdf', padding: 12, borderRadius: 4 },
  lyrics: { fontFamily: FONTS.mono, fontSize: 12, color: '#23272a', fontStyle: 'italic', lineHeight: 18 },
  specsGrid: { marginTop: 12, flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  specItem: { width: '48%' },
  specLabel: { fontFamily: FONTS.displayBold, fontSize: 9, color: '#70370b', textTransform: 'uppercase' },
  specValue: { fontFamily: FONTS.mono, fontSize: 11, color: '#373d40' },
  benchCard: { marginTop: 16, backgroundColor: COLORS.surfaceContainer, borderRadius: 8, padding: 12 },
  benchTitle: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.primary, textTransform: 'uppercase', letterSpacing: 1 },
  benchItem: { flex: 1, backgroundColor: COLORS.surfaceContainerHigh, padding: 8, borderRadius: 4 },
  benchLabel: { fontFamily: FONTS.displayBold, fontSize: 8, color: COLORS.onSurfaceVariant, textTransform: 'uppercase' },
  benchValue: { fontFamily: FONTS.monoBold, fontSize: 14, color: COLORS.onSurface, marginTop: 2 },
  adjacentTxt: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.primary, textTransform: 'uppercase', letterSpacing: 1 },
  spine: { backgroundColor: '#1b1c1e', borderRadius: 4, padding: 8, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8, shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 4, elevation: 2 },
  spineColor: { width: 6, height: 28, borderRadius: 3 },
  spineTitle: { fontFamily: FONTS.monoBold, fontSize: 13, color: COLORS.onSurface },
  spineSub: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.onSurfaceVariant, textTransform: 'uppercase' },
  spineTime: { fontFamily: FONTS.monoBold, fontSize: 11, color: COLORS.primary },
  toast: { position: 'absolute', bottom: 24, left: 16, right: 16, backgroundColor: COLORS.surfaceContainerHighest, padding: 12, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 10, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 10, elevation: 10 },
  toastTxt: { fontFamily: FONTS.displayBold, fontSize: 12, color: COLORS.onSurface, textTransform: 'uppercase', letterSpacing: 1, flex: 1 },
});