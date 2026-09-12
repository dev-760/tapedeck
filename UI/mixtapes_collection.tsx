import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts, SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import { CourierPrime_400Regular, CourierPrime_700Bold } from '@expo-google-fonts/courier-prime';
import { COLORS, FONTS } from './theme';

const MIXTAPES = [
  { title: "SUMMER ROOFTOP '94", sub: 'Balearic house & disco funk', tracks: 14, badge: 'TYPE I FERRIC', color: '#ffea79', side: 'SIDE A' },
  { title: 'RAINY COFFEE & JAZZ', sub: 'Blue Note modal cuts', tracks: 8, badge: 'TYPE II CrO2', color: '#e7dfce', side: 'SIDE A' },
  { title: 'LO-FI STUDY SESSIONS', sub: 'Dusty SP-404 tape chops', tracks: 16, badge: 'C-90 TAPE', color: '#cfb5e2', side: 'SIDE A' },
  { title: 'ROAD TRIP TO BIG SUR', sub: '70s Laurel Canyon psych folk', tracks: 10, badge: 'TYPE IV METAL', color: '#824f2b', side: 'SIDE B' },
];

const TRACKS_SIDE_A = [
  { num: 'A•01', name: 'Nightcall', artist: 'Kavinsky • Drive Original Soundtrack', time: '4:19', active: true },
  { num: 'A•02', name: 'Shadow', artist: 'Chromatics • Cherry', time: '3:45' },
  { num: 'A•03', name: 'Sunset', artist: 'The Midnight • Endless Summer', time: '5:26' },
  { num: 'A•04', name: 'Resonance', artist: 'HOME • Odyssey', time: '3:32' },
  { num: 'A•05', name: 'Tech Noir', artist: 'GUNSHIP • Gunship LP', time: '4:57' },
];

export default function MixtapesCollection() {
  const [fontsLoaded] = useFonts({ SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold, CourierPrime_400Regular, CourierPrime_700Bold });
  const [side, setSide] = useState<'A' | 'B'>('A');
  const [toast, setToast] = useState('');

  if (!fontsLoaded) return null;

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(''), 2200); };

  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle="light-content" />
      <View style={s.header}>
        <View>
          <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
            <View style={s.dot} />
            <Text style={s.hSub}>TPS-L2 // STEREO</Text>
          </View>
          <Text style={s.hTitle}>Mixtapes</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <View style={s.battBox}>
            {[COLORS.tertiary, COLORS.tertiary, COLORS.tertiary, COLORS.secondary, COLORS.outlineVariant].map((c, i) => (
              <View key={i} style={[s.battBar, { backgroundColor: c, opacity: i === 4 ? 0.4 : 0.9 }]} />
            ))}
            <Text style={s.battTxt}>BATT</Text>
          </View>
          <TouchableOpacity style={s.iconBtn}><MaterialIcons name="tune" size={20} color={COLORS.onSurface} /></TouchableOpacity>
          <View style={s.avatar}><MaterialIcons name="person" size={18} color={COLORS.onPrimary} /></View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        {/* Status Strip */}
        <View style={s.statusStrip}>
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <View style={s.dot} /><Text style={s.stripLabel}>ARCHIVE // BOX 04</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
            <Text style={s.stripCount}>5 TAPES RECORDED</Text>
            <Text style={{ color: COLORS.outlineVariant }}>•</Text>
            <Text style={s.stripBias}>BIAS NORMAL</Text>
          </View>
        </View>

        {/* Header Action */}
        <View style={s.actionRow}>
          <View>
            <Text style={s.actionSub}>PHYSICAL CRATE</Text>
            <Text style={s.actionTitle}>Curated Mixtapes</Text>
          </View>
          <TouchableOpacity style={s.newBtn} onPress={() => showToast('Blank C-60 Cassette mounted in Bay B')}>
            <MaterialIcons name="add-box" size={18} color={COLORS.onSecondary} />
            <Text style={s.newBtnTxt}>New Tape</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Cassette */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <View style={s.heroCard}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                <View style={s.screwDot} />
                <Text style={s.heroC60}>C-60 HIGH BIAS // CrO2</Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 4 }}>
                <View style={s.tinyBar} /><View style={s.screwDot} />
              </View>
            </View>

            <View style={s.heroWindow}>
              <View style={s.heroShell}>
                <View style={s.heroLabel}>
                  <View style={s.labelHeader}>
                    <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                      <View style={s.sideBadge}><Text style={s.sideBadgeTxt}>A</Text></View>
                      <Text style={s.nrTxt}>NR [DOLBY B-ON]</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                      <Text style={s.minTxt}>60 MIN</Text>
                      <View style={s.orangeDot} />
                    </View>
                  </View>
                  <Text style={s.heroTitle}>NIGHT DRIVE — VOL. 4</Text>
                  <Text style={s.heroSub}>(Late Night Synth & Mellow Groove)</Text>

                  <View style={s.tapeWindow2}>
                    <View style={s.calMarks}>
                      {[3, 2, 4, 2, 3].map((h, i) => (
                        <View key={i} style={[s.calMark, { height: h * 4, backgroundColor: i === 2 ? COLORS.secondary : COLORS.primary }]} />
                      ))}
                    </View>
                    <View style={s.spoolBox2}>
                      <View style={s.spoolFull}>
                        <View style={s.spoolHubAnimated}><View style={s.spoolHubInner2}><View style={s.tinyDot} /></View></View>
                      </View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={s.counterTxt}>04:19</Text>
                      <Text style={s.counterSub}>TYPE-II CrO2</Text>
                    </View>
                    <View style={s.spoolBox2}>
                      <View style={s.spoolPart}>
                        <View style={s.spoolHubAnimated}><View style={s.spoolHubInner2}><View style={s.tinyDot} /></View></View>
                      </View>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 6 }}>
                    <Text style={s.indexTxt}>INDEX: #ND-8409</Text>
                    <Text style={s.masterTxt}>MASTER RECORDER TP-2</Text>
                  </View>
                </View>

                <View style={s.lowerCuts}>
                  <View style={s.cutCircle} />
                  <View style={{ flexDirection: 'row', gap: 12 }}>
                    <View style={s.cutBarS} /><View style={s.cutBarM} /><View style={s.cutBarS} />
                  </View>
                  <View style={s.cutCircle} />
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 4, marginBottom: 12 }}>
              <View>
                <Text style={s.duraLabel}>TAPE DURATION</Text>
                <Text style={s.duraVal}>SIDE A (24:10) / SIDE B (23:50)</Text>
              </View>
              <View style={s.tracksBox}>
                <MaterialIcons name="graphic-eq" size={16} color={COLORS.secondary} />
                <Text style={s.tracksTxt}>12 TRACKS</Text>
              </View>
            </View>

            <TouchableOpacity style={s.insertBtn} onPress={() => showToast('NIGHT DRIVE // VOL. 4 loaded into deck')}>
              <MaterialIcons name="eject" size={20} color={COLORS.onPrimary} />
              <Text style={s.insertBtnTxt}>Insert Into Walkman</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Mixtape Vault Grid */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <MaterialIcons name="shelves" size={18} color={COLORS.tertiary} />
              <Text style={s.sectionTitle}>Mixtape Vault</Text>
            </View>
            <Text style={s.tapToLoad}>TAP TO LOAD</Text>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {MIXTAPES.map((m, i) => (
              <TouchableOpacity key={i} style={s.tapeCard}>
                <View style={[s.tapeAccent, { backgroundColor: m.color }]} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <View style={s.sideTag}><Text style={s.sideTagTxt}>{m.side}</Text></View>
                  <Text style={s.tracksCount}>{m.tracks} TRKS</Text>
                </View>
                <Text style={s.mixTitle} numberOfLines={1}>{m.title}</Text>
                <Text style={s.mixSub} numberOfLines={1}>{m.sub}</Text>
                <View style={s.mixFooter}>
                  <Text style={s.mixBadge}>{m.badge}</Text>
                  <MaterialIcons name="arrow-forward" size={16} color={COLORS.onSurfaceVariant} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* J-Card Tracklist */}
        <View style={{ paddingHorizontal: 16, marginBottom: 32 }}>
          <View style={s.jcardHeader}>
            <View>
              <Text style={s.jcardLabel}>J-CARD INSERT LINER</Text>
              <Text style={s.jcardTitle}>Tracklist Spine Rack</Text>
            </View>
            <View style={s.sideToggle}>
              <TouchableOpacity style={[s.sideBtn, side === 'A' && s.sideBtnActive]} onPress={() => setSide('A')}>
                <Text style={[s.sideBtnTxt, side === 'A' && s.sideBtnTxtActive]}>SIDE A</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[s.sideBtn, side === 'B' && s.sideBtnActive]} onPress={() => setSide('B')}>
                <Text style={[s.sideBtnTxt, side === 'B' && s.sideBtnTxtActive]}>SIDE B</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={s.jcardBody}>
            <View style={s.jcardMeta}>
              <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                <Text style={s.jcardMetaTxt}>SIDE {side} // {TRACKS_SIDE_A.length} TRACKS</Text>
                <Text style={{ color: COLORS.outline }}>•</Text>
                <Text style={s.jcardMetaSub}>TOTAL RUN: 24M 10S</Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                <View style={s.chromaDot} />
                <Text style={s.chromaTxt}>CHROMA EQ 70µs</Text>
              </View>
            </View>

            {TRACKS_SIDE_A.map((t, i) => (
              <View key={i} style={[s.trackRow, t.active && s.trackRowActive]}>
                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', flex: 1 }}>
                  <View style={[s.playBtnSmall, t.active && { backgroundColor: '#151719' }]}>
                    <MaterialIcons name="play-arrow" size={16} color={t.active ? COLORS.secondary : '#151719'} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                      <Text style={s.trackNum}>{t.num}</Text>
                      <Text style={s.trackName} numberOfLines={1}>{t.name}</Text>
                    </View>
                    <Text style={s.trackArtist} numberOfLines={1}>{t.artist}</Text>
                  </View>
                </View>
                <Text style={s.trackTime}>{t.time}</Text>
                <MaterialIcons name="drag-handle" size={18} color={COLORS.outline} />
              </View>
            ))}

            <View style={s.jcardFooter}>
              <Text style={s.jcardFooterTxt}>★ DUAL-CAPSTAN TRANSPORT COMPLIANT</Text>
              <TouchableOpacity style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                <MaterialIcons name="edit-note" size={14} color="#151719" />
                <Text style={s.annotateTxt}>ANNOTATE J-CARD</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Mini Player */}
      <View style={s.miniPlayer}>
        <View style={s.miniHub}><View style={s.miniHubInner} /></View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
            <View style={s.miniSideBadge}><Text style={s.miniSideTxt}>SIDE A</Text></View>
            <Text style={s.miniType}>TYPE II CrO2</Text>
          </View>
          <Text style={s.miniTitle}>Starman - David Bowie</Text>
        </View>
        <TouchableOpacity style={s.miniBtn}><MaterialIcons name="fast-rewind" size={18} color={COLORS.onSurface} /></TouchableOpacity>
        <TouchableOpacity style={[s.miniBtn, { backgroundColor: COLORS.secondary }]}><MaterialIcons name="pause" size={20} color={COLORS.onSecondary} /></TouchableOpacity>
        <TouchableOpacity style={s.miniBtn}><MaterialIcons name="fast-forward" size={18} color={COLORS.onSurface} /></TouchableOpacity>
      </View>

      {/* Bottom Nav */}
      <View style={s.navBar}>
        {[{ i: 'home', l: 'HOME' }, { i: 'view-column-2', l: 'SHELF' }, { i: 'manage-search', l: 'SEARCH' }, { i: 'queue-music', l: 'MIXTAPES', active: true }].map((n, i) => (
          <TouchableOpacity key={i} style={s.navItem}>
            <MaterialIcons name={n.i as any} size={22} color={n.active ? COLORS.secondary : COLORS.onSurfaceVariant} />
            <Text style={[s.navLabel, n.active && { color: COLORS.secondary }]}>{n.l}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {toast !== '' && (
        <View style={s.toast}><View style={s.toastDot} /><View style={{ flex: 1 }}><Text style={s.toastHead}>HEAD ENGAGED</Text><Text style={s.toastMsg} numberOfLines={1}>{toast}</Text></View></View>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  header: { height: 64, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.secondary },
  hSub: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.primary, textTransform: 'uppercase', letterSpacing: 1.2 },
  hTitle: { fontFamily: FONTS.display, fontSize: 18, color: COLORS.onSurface, textTransform: 'uppercase', marginTop: 2 },
  battBox: { flexDirection: 'row', gap: 2, alignItems: 'center', backgroundColor: COLORS.surfaceContainerLowest, paddingHorizontal: 4, paddingVertical: 4, borderRadius: 4 },
  battBar: { width: 3, height: 10, borderRadius: 1 },
  battTxt: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.onSurfaceVariant, marginLeft: 4 },
  iconBtn: { width: 44, height: 44, borderRadius: 4, backgroundColor: COLORS.surfaceContainerHigh, alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
  statusStrip: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  stripLabel: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.primary, textTransform: 'uppercase', letterSpacing: 1.2 },
  stripCount: { fontFamily: FONTS.monoBold, fontSize: 14, color: COLORS.onSurfaceVariant },
  stripBias: { fontFamily: FONTS.displayBold, fontSize: 10, color: COLORS.tertiary, textTransform: 'uppercase' },
  actionRow: { paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 },
  actionSub: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1.2 },
  actionTitle: { fontFamily: FONTS.displayMedium, fontSize: 22, color: COLORS.onSurface },
  newBtn: { flexDirection: 'row', gap: 6, alignItems: 'center', backgroundColor: COLORS.secondary, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 4, shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 6, elevation: 4 },
  newBtnTxt: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.onSecondary, textTransform: 'uppercase', letterSpacing: 1, fontWeight: '700' },
  heroCard: { backgroundColor: COLORS.surfaceContainer, padding: 16, borderRadius: 12, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.6, shadowRadius: 12, elevation: 6 },
  screwDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.surfaceContainerHighest },
  heroC60: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1.2 },
  tinyBar: { width: 10, height: 4, backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 2 },
  heroWindow: { backgroundColor: COLORS.surfaceContainerLowest, padding: 8, borderRadius: 8, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.6, shadowRadius: 4 },
  heroShell: { backgroundColor: COLORS.surfaceContainerHigh, padding: 8, borderRadius: 6 },
  heroLabel: { backgroundColor: '#e7dfce', padding: 12, borderRadius: 4 },
  labelHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.1)', paddingBottom: 4 },
  sideBadge: { backgroundColor: '#151719', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 2 },
  sideBadgeTxt: { fontFamily: FONTS.monoBold, fontSize: 10, color: '#e7dfce' },
  nrTxt: { fontFamily: FONTS.monoBold, fontSize: 10, color: '#3f484c', textTransform: 'uppercase' },
  minTxt: { fontFamily: FONTS.monoBold, fontSize: 10, color: '#151719' },
  orangeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.secondary },
  heroTitle: { fontFamily: FONTS.monoBold, fontSize: 16, color: '#151719', marginTop: 4 },
  heroSub: { fontFamily: FONTS.mono, fontSize: 12, color: '#3f484c', fontStyle: 'italic' },
  tapeWindow2: { backgroundColor: '#121416', padding: 8, borderRadius: 4, marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  calMarks: { position: 'absolute', left: 48, right: 48, top: '50%', flexDirection: 'row', justifyContent: 'space-between', opacity: 0.4 },
  calMark: { width: 1 },
  spoolBox2: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.surfaceContainerHigh, alignItems: 'center', justifyContent: 'center' },
  spoolFull: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,182,137,0.8)', alignItems: 'center', justifyContent: 'center' },
  spoolPart: { width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(255,182,137,0.8)', alignItems: 'center', justifyContent: 'center' },
  spoolHubAnimated: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#121416', alignItems: 'center', justifyContent: 'center' },
  spoolHubInner2: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: COLORS.secondary },
  tinyDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: COLORS.secondary },
  counterTxt: { fontFamily: FONTS.monoBold, fontSize: 20, color: COLORS.secondary, letterSpacing: 2 },
  counterSub: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.onSurfaceVariant, textTransform: 'uppercase' },
  indexTxt: { fontFamily: FONTS.monoBold, fontSize: 9, color: '#3f484c' },
  masterTxt: { fontFamily: FONTS.monoBold, fontSize: 9, color: '#151719' },
  lowerCuts: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginTop: 8 },
  cutCircle: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.surfaceContainerLowest },
  cutBarS: { width: 32, height: 8, backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 4 },
  cutBarM: { width: 40, height: 10, backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 4 },
  duraLabel: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1.2 },
  duraVal: { fontFamily: FONTS.monoBold, fontSize: 14, color: COLORS.onSurface },
  tracksBox: { flexDirection: 'row', gap: 6, alignItems: 'center', backgroundColor: COLORS.surfaceContainerLowest, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  tracksTxt: { fontFamily: FONTS.monoBold, fontSize: 12, color: COLORS.secondary },
  insertBtn: { height: 48, backgroundColor: COLORS.primary, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  insertBtnTxt: { fontFamily: FONTS.display, fontSize: 18, color: COLORS.onPrimary, textTransform: 'uppercase', letterSpacing: 1 },
  sectionTitle: { fontFamily: FONTS.display, fontSize: 18, color: COLORS.onSurface, textTransform: 'uppercase', letterSpacing: 1 },
  tapToLoad: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1.2 },
  tapeCard: { width: '48.5%', backgroundColor: COLORS.surfaceContainer, padding: 12, borderRadius: 8, marginBottom: 8, shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 4, elevation: 3 },
  tapeAccent: { height: 4, borderRadius: 2, marginBottom: 8 },
  sideTag: { backgroundColor: COLORS.surfaceContainerLowest, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 2 },
  sideTagTxt: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.secondary, textTransform: 'uppercase' },
  tracksCount: { fontFamily: FONTS.monoBold, fontSize: 10, color: COLORS.onSurfaceVariant },
  mixTitle: { fontFamily: FONTS.monoBold, fontSize: 13, color: COLORS.onSurface, marginTop: 4 },
  mixSub: { fontFamily: FONTS.mono, fontSize: 11, color: COLORS.onSurfaceVariant, marginTop: 2 },
  mixFooter: { marginTop: 12, paddingTop: 8, paddingHorizontal: 6, paddingVertical: 4, backgroundColor: 'rgba(12,14,16,0.5)', borderRadius: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  mixBadge: { fontFamily: FONTS.monoBold, fontSize: 10, color: COLORS.tertiary },
  jcardHeader: { backgroundColor: COLORS.surfaceContainerHigh, padding: 16, borderTopLeftRadius: 8, borderTopRightRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  jcardLabel: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.tertiary, textTransform: 'uppercase', letterSpacing: 1.2 },
  jcardTitle: { fontFamily: FONTS.display, fontSize: 18, color: COLORS.onSurface },
  sideToggle: { flexDirection: 'row', backgroundColor: COLORS.surfaceContainerLowest, padding: 4, borderRadius: 4 },
  sideBtn: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 4 },
  sideBtnActive: { backgroundColor: COLORS.secondary },
  sideBtnTxt: { fontFamily: FONTS.monoBold, fontSize: 14, color: COLORS.onSurfaceVariant },
  sideBtnTxtActive: { color: COLORS.onSecondary },
  jcardBody: { backgroundColor: '#e7dfce', padding: 16, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 },
  jcardMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.1)', marginBottom: 8 },
  jcardMetaTxt: { fontFamily: FONTS.monoBold, fontSize: 11, color: '#151719' },
  jcardMetaSub: { fontFamily: FONTS.mono, fontSize: 11, color: '#3f484c' },
  chromaDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#70370b' },
  chromaTxt: { fontFamily: FONTS.monoBold, fontSize: 10, color: '#70370b', textTransform: 'uppercase', letterSpacing: 1 },
  trackRow: { backgroundColor: '#f2ece0', padding: 8, borderRadius: 4, flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  trackRowActive: { backgroundColor: '#dcd3bf' },
  playBtnSmall: { width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(21,23,25,0.1)', alignItems: 'center', justifyContent: 'center' },
  trackNum: { fontFamily: FONTS.monoBold, fontSize: 11, color: '#70370b' },
  trackName: { fontFamily: FONTS.monoBold, fontSize: 14, color: '#151719' },
  trackArtist: { fontFamily: FONTS.mono, fontSize: 12, color: '#3f484c' },
  trackTime: { fontFamily: FONTS.monoBold, fontSize: 14, color: '#151719' },
  jcardFooter: { marginTop: 12, paddingTop: 8, borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.1)', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  jcardFooterTxt: { fontFamily: FONTS.displayBold, fontSize: 9, color: '#70370b', textTransform: 'uppercase', letterSpacing: 1 },
  annotateTxt: { fontFamily: FONTS.monoBold, fontSize: 11, color: '#151719' },
  miniPlayer: { position: 'absolute', bottom: 56, left: 16, right: 16, backgroundColor: 'rgba(40,42,44,0.95)', padding: 8, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 8, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 8, elevation: 8 },
  miniHub: { width: 36, height: 36, borderRadius: 4, backgroundColor: COLORS.surfaceContainerLowest, alignItems: 'center', justifyContent: 'center' },
  miniHubInner: { width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,182,137,0.7)', alignItems: 'center', justifyContent: 'center' },
  miniSideBadge: { backgroundColor: COLORS.secondaryContainer, paddingHorizontal: 4, paddingVertical: 2, borderRadius: 2 },
  miniSideTxt: { fontFamily: FONTS.monoBold, fontSize: 9, color: COLORS.onSecondaryContainer, textTransform: 'uppercase' },
  miniType: { fontFamily: FONTS.displayBold, fontSize: 10, color: COLORS.tertiary, textTransform: 'uppercase', letterSpacing: 1 },
  miniTitle: { fontFamily: FONTS.monoBold, fontSize: 13, color: COLORS.onSurface, marginTop: 2 },
  miniBtn: { width: 36, height: 36, borderRadius: 4, backgroundColor: COLORS.surfaceContainer, alignItems: 'center', justifyContent: 'center' },
  navBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 56, backgroundColor: 'rgba(18,20,22,0.9)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  navItem: { alignItems: 'center', gap: 2, width: 56 },
  navLabel: { fontFamily: FONTS.displayBold, fontSize: 10, color: COLORS.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1 },
  toast: { position: 'absolute', top: 80, left: 16, right: 16, backgroundColor: COLORS.surfaceContainerHighest, padding: 12, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 10, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 10, elevation: 10 },
  toastDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.secondary },
  toastHead: { fontFamily: FONTS.displayBold, fontSize: 10, color: COLORS.tertiary, textTransform: 'uppercase', letterSpacing: 1.2 },
  toastMsg: { fontFamily: FONTS.monoBold, fontSize: 12, color: COLORS.onSurface },
});