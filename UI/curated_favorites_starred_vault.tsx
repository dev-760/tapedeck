import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts, SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import { CourierPrime_400Regular, CourierPrime_700Bold } from '@expo-google-fonts/courier-prime';
import { COLORS, FONTS } from './theme';

const SHELVES = [
  { title: 'SHELF A', sub: 'ALL-TIME MASTER TAPES', count: '08 CASSETTES', items: [
    { title: 'PINK FLOYD - TIME', sub: 'Harvest UK 1973 • Type IV Metal', time: '07:05', badge: 'CrO2', color: COLORS.secondary },
    { title: 'FLEETWOOD MAC - DREAMS', sub: 'Warner Bros 1977 • Dolby B 120µs', time: '04:17', badge: 'FE-I', color: COLORS.tertiary },
    { title: 'LED ZEPPELIN - KASHMIR', sub: 'Swan Song Master Reel • Type II', time: '08:37', badge: 'TYPE-II', color: COLORS.secondaryFixedDim },
    { title: 'STEELY DAN - AJA', sub: 'ABC Records 1977 • Pure Chromium', time: '07:56', badge: 'METAL', color: COLORS.primary },
  ]},
  { title: 'SHELF B', sub: 'LATE NIGHT & SYNTH FAVORITES', count: '09 CASSETTES', items: [
    { title: 'KAVINSKY - NIGHTCALL', sub: 'Record Makers • Neon Cyan Chrome', time: '04:19', badge: '70µs', color: COLORS.tertiary },
    { title: 'THE MIDNIGHT - SUNSET', sub: 'Silk City Records • Type II Super', time: '05:26', badge: 'TYPE-II', color: COLORS.secondary },
    { title: 'GUNSHIP - TECH NOIR', sub: 'Horsie In The Hedge • Heavy Bass', time: '04:57', badge: 'DOLBY-C', color: COLORS.primaryContainer },
  ]},
  { title: 'SHELF C', sub: 'ACOUSTIC & AMBIENT GEMS', count: '07 CASSETTES', items: [
    { title: 'BRIAN ENO - 1/1', sub: 'Polydor 1978 • Kraft Paper J-Card', time: '16:30', badge: '120µs', color: COLORS.outline },
    { title: 'NICK DRAKE - PINK MOON', sub: 'Island Records 1972 • Type I Ferric', time: '02:06', badge: 'TYPE-I', color: COLORS.secondaryContainer },
  ]},
];

export default function CuratedFavoritesStarredVault() {
  const [fontsLoaded] = useFonts({ SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold, CourierPrime_400Regular, CourierPrime_700Bold });
  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle="light-content" />
      <View style={s.header}>
        <TouchableOpacity style={s.iconBtn}><MaterialIcons name="arrow-back" size={20} color={COLORS.onSurface} /></TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Text style={s.hSub}>DECK MECHANISM // EXPANDED</Text>
          <Text style={s.hTitle}>J Card Details</Text>
        </View>
        <TouchableOpacity style={s.iconBtn}><MaterialIcons name="equalizer" size={20} color={COLORS.onSurface} /></TouchableOpacity>
        <View style={s.avatar}><MaterialIcons name="person" size={18} color={COLORS.onPrimary} /></View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        {/* Chassis Header Strip */}
        <View style={s.strip}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <View style={s.dot} /><Text style={s.stripLabel}>TPS-L2 // STEREO ARCHIVE</Text>
            </View>
            <View style={s.calBadge}><Text style={s.calTxt}>CAL-70µs</Text></View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 8 }}>
            <Text style={s.heroTitle}>FAVORITES{'\n'}VAULT</Text>
            <Text style={s.heroSub}>24 STARRED TAPES // WALNUT CASE 01</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
            <TouchableOpacity style={s.actionBtn}><MaterialIcons name="shuffle" size={18} color={COLORS.secondary} /><Text style={s.actionBtnTxtShuffle}>SHUFFLE ENTIRE VAULT</Text></TouchableOpacity>
            <TouchableOpacity style={s.actionBtn}><MaterialIcons name="sync" size={18} color={COLORS.primary} /><Text style={s.actionBtnTxt}>RE-INDEX REELS</Text></TouchableOpacity>
          </View>
        </View>

        {/* Inspection Tray - Featured */}
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <View style={s.tray}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                <MaterialIcons name="star" size={16} color={COLORS.secondary} />
                <Text style={s.trayLabel}>INSPECTION TRAY // STARRED MASTER</Text>
              </View>
              <Text style={s.trayBias}>TYPE IV METAL // 70µs</Text>
            </View>

            <View style={s.wellFrame}>
              <View style={s.shellBody}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 6 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={s.masterArchive}>KUROGANE MASTER ARCHIVE #04</Text>
                    <Text style={s.masterTitle}>DAVID BOWIE - STARMAN</Text>
                    <Text style={s.masterSub}>"Ziggy Stardust sessions // Abbey Road 1972 Reel"</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <View style={s.favBadge}><Text style={s.favBadgeTxt}>FAVORITE #01</Text></View>
                    <Text style={s.masterTime}>41:29</Text>
                  </View>
                </View>

                <View style={s.spoolWindow}>
                  <View style={s.calRuler}>
                    {['0','25','50','75','100'].map(t => <Text key={t} style={s.calTxt2}>{t}</Text>)}
                  </View>
                  <View style={s.spoolL}><View style={s.spoolPackL}><View style={s.spoolInner}><View style={s.hubSmall} /></View></View></View>
                  <View style={s.bridge}><View style={s.bridgeMarker} /></View>
                  <View style={s.spoolR}><View style={s.spoolPackR}><View style={s.spoolInner}><View style={s.hubSmall} /></View></View></View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10 }}>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <Text style={s.smallInfo}>BIAS: 70µs CrO2</Text>
                    <View style={s.dotSep} />
                    <Text style={s.smallInfo}>NR: DOLBY C</Text>
                  </View>
                  <TouchableOpacity style={s.loadBtn}><MaterialIcons name="eject" size={18} color={COLORS.onSecondary} /><Text style={s.loadBtnTxt}>LOAD INTO PINCH ROLLER</Text></TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Sort Bar */}
        <View style={s.sortBar}>
          <Text style={s.sortLabel}>SORT:</Text>
          <TouchableOpacity style={s.sortBtnActive}><Text style={s.sortBtnActiveTxt}>STARRED DATE</Text></TouchableOpacity>
          <TouchableOpacity style={s.sortBtn}><Text style={s.sortBtnTxt}>REEL BIAS</Text></TouchableOpacity>
          <TouchableOpacity style={s.sortBtn}><Text style={s.sortBtnTxt}>ARTIST A-Z</Text></TouchableOpacity>
          <TouchableOpacity style={s.filterBtn}><MaterialIcons name="tune" size={14} color={COLORS.onSurface} /><Text style={s.filterTxt}>FILTERS</Text></TouchableOpacity>
        </View>

        {/* Shelves */}
        {SHELVES.map((shelf, si) => (
          <View key={si} style={{ paddingHorizontal: 16, marginTop: 20 }}>
            <View style={s.shelfHeader}>
              <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                <Text style={s.shelfTitle}>{shelf.title} //</Text>
                <Text style={s.shelfSub}>{shelf.sub}</Text>
              </View>
              <Text style={s.shelfCount}>{shelf.count}</Text>
            </View>
            <View style={s.shelfRack}>
              {shelf.items.map((item, i) => (
                <TouchableOpacity key={i} style={s.spineItem}>
                  <View style={[s.spineColor, { backgroundColor: item.color }]} />
                  <View style={{ flex: 1, paddingLeft: 8 }}>
                    <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                      <MaterialIcons name="star" size={14} color={COLORS.secondary} />
                      <Text style={s.spineTitle} numberOfLines={1}>{item.title}</Text>
                    </View>
                    <Text style={s.spineSub} numberOfLines={1}>{item.sub}</Text>
                  </View>
                  <Text style={s.spineTime}>{item.time}</Text>
                  <View style={s.spineBadge}><Text style={s.spineBadgeTxt}>{item.badge}</Text></View>
                  <MaterialIcons name="drag-handle" size={18} color={COLORS.onSurfaceVariant} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Demagnetizer */}
        <View style={s.demagCard}>
          <View style={s.demagIcon}><MaterialIcons name="cleaning-services" size={24} color={COLORS.secondary} /></View>
          <View style={{ flex: 1 }}>
            <Text style={s.demagTitle}>HEAD DEMAGNETIZER DETENT</Text>
            <Text style={s.demagSub}>Favorites preserved with active 70µs bias alignment. Next service: 42 playback hrs.</Text>
          </View>
          <View style={s.demagStatus}><Text style={s.demagStatusTxt}>OK // STABLE</Text></View>
        </View>
      </ScrollView>

      {/* Bottom Transport */}
      <View style={s.dockPlayer}>
        <View style={s.dockHub}><View style={s.dockHubInner} /></View>
        <View style={{ flex: 1 }}>
          <Text style={s.dockTitle}>DAVID BOWIE - STARMAN</Text>
          <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
            <Text style={s.dockTime}>02:14</Text>
            <Text style={s.dockDur}>/ 41:29</Text>
            <View style={s.dockBadge}><Text style={s.dockBadgeTxt}>DOLBY-C</Text></View>
          </View>
        </View>
        <TouchableOpacity style={s.dockBtn}><MaterialIcons name="fast-rewind" size={18} color={COLORS.onSurface} /></TouchableOpacity>
        <TouchableOpacity style={[s.dockBtn, { backgroundColor: COLORS.secondary, width: 40, height: 40 }]}><MaterialIcons name="pause" size={20} color={COLORS.onSecondary} /></TouchableOpacity>
        <TouchableOpacity style={s.dockBtn}><MaterialIcons name="fast-forward" size={18} color={COLORS.onSurface} /></TouchableOpacity>
      </View>

      {/* Nav */}
      <View style={s.nav}>
        {[{ i: 'radio', l: 'DECK' }, { i: 'shelves', l: 'SHELF' }, { i: 'search', l: 'SEARCH' }, { i: 'album', l: 'MIXES' }, { i: 'star', l: 'VAULT', active: true }].map((n, i) => (
          <TouchableOpacity key={i} style={s.navItem}>
            <MaterialIcons name={n.i as any} size={20} color={n.active ? COLORS.secondary : COLORS.onSurfaceVariant} />
            <Text style={[s.navLabel, n.active && { color: COLORS.secondary, fontFamily: FONTS.displayBold }]}>{n.l}</Text>
            {n.active && <View style={s.navIndicator} />}
          </TouchableOpacity>
        ))}
      </View>
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
  strip: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: COLORS.surfaceContainerLowest },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.secondary },
  stripLabel: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.primary, textTransform: 'uppercase', letterSpacing: 1.2 },
  calBadge: { backgroundColor: COLORS.surfaceContainer, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  calTxt: { fontFamily: FONTS.monoBold, fontSize: 12, color: COLORS.secondary, letterSpacing: 1 },
  heroTitle: { fontFamily: FONTS.displayMedium, fontSize: 24, color: COLORS.onSurface, textTransform: 'uppercase', lineHeight: 28 },
  heroSub: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.onSurfaceVariant, textTransform: 'uppercase', flexShrink: 1, textAlign: 'right', marginLeft: 8 },
  actionBtn: { flex: 1, backgroundColor: COLORS.surfaceContainerHigh, paddingVertical: 8, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  actionBtnTxt: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.onSurface, textTransform: 'uppercase', letterSpacing: 1 },
  actionBtnTxtShuffle: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.secondary, textTransform: 'uppercase', letterSpacing: 1 },
  tray: { backgroundColor: COLORS.surfaceContainerLow, padding: 8, borderRadius: 8, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 12, elevation: 5 },
  trayLabel: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1 },
  trayBias: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.primary, textTransform: 'uppercase' },
  wellFrame: { backgroundColor: COLORS.surfaceContainerLowest, padding: 8, borderRadius: 4, marginTop: 8 },
  shellBody: { backgroundColor: COLORS.surfaceContainerHigh, padding: 8, borderRadius: 4, shadowColor: '#000', shadowOpacity: 0.7, shadowRadius: 8, elevation: 4 },
  masterArchive: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.secondary, textTransform: 'uppercase', letterSpacing: 1 },
  masterTitle: { fontFamily: FONTS.display, fontSize: 18, color: COLORS.onSurface, textTransform: 'uppercase' },
  masterSub: { fontFamily: FONTS.mono, fontSize: 12, color: COLORS.onSurfaceVariant, fontStyle: 'italic' },
  favBadge: { backgroundColor: COLORS.secondaryContainer, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  favBadgeTxt: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.onSecondaryContainer, textTransform: 'uppercase' },
  masterTime: { fontFamily: FONTS.monoBold, fontSize: 14, color: COLORS.secondary, marginTop: 4 },
  spoolWindow: { height: 80, backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, marginTop: 8 },
  calRuler: { position: 'absolute', left: 40, right: 40, top: 4, flexDirection: 'row', justifyContent: 'space-between' },
  calTxt2: { fontFamily: FONTS.monoBold, fontSize: 9, color: 'rgba(190,200,205,0.3)' },
  spoolL: { width: 56, height: 56, borderRadius: 28, backgroundColor: COLORS.surfaceContainer, alignItems: 'center', justifyContent: 'center' },
  spoolR: { width: 56, height: 56, borderRadius: 28, backgroundColor: COLORS.surfaceContainer, alignItems: 'center', justifyContent: 'center' },
  spoolPackL: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.surfaceContainerLowest, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: COLORS.surfaceContainerHighest, borderStyle: 'dashed' },
  spoolPackR: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.surfaceContainerLowest, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: COLORS.surfaceContainerHighest, borderStyle: 'dashed' },
  spoolInner: { width: 20, height: 20, borderRadius: 10, backgroundColor: COLORS.primaryContainer, alignItems: 'center', justifyContent: 'center' },
  hubSmall: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.secondary },
  bridge: { flex: 1, height: 2, backgroundColor: COLORS.surfaceContainerHighest, marginHorizontal: 8 },
  bridgeMarker: { position: 'absolute', left: '40%', top: -2, width: 16, height: 4, backgroundColor: COLORS.secondary, borderRadius: 2 },
  smallInfo: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.onSurfaceVariant, textTransform: 'uppercase' },
  dotSep: { width: 4, height: 4, borderRadius: 2, backgroundColor: COLORS.outline, alignSelf: 'center' },
  loadBtn: { backgroundColor: COLORS.secondary, paddingHorizontal: 16, paddingVertical: 6, borderRadius: 4, flexDirection: 'row', alignItems: 'center', gap: 6, shadowColor: COLORS.secondary, shadowOpacity: 0.4, shadowRadius: 6, elevation: 3 },
  loadBtnTxt: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.onSecondary, textTransform: 'uppercase', letterSpacing: 1, fontWeight: '700' },
  sortBar: { paddingHorizontal: 16, paddingTop: 12, flexDirection: 'row', alignItems: 'center', gap: 6 },
  sortLabel: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.primary, textTransform: 'uppercase' },
  sortBtnActive: { backgroundColor: COLORS.secondaryContainer, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  sortBtnActiveTxt: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.onSecondaryContainer, textTransform: 'uppercase' },
  sortBtn: { backgroundColor: COLORS.surfaceContainer, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  sortBtnTxt: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.onSurfaceVariant, textTransform: 'uppercase' },
  filterBtn: { marginLeft: 'auto', flexDirection: 'row', gap: 4, alignItems: 'center', backgroundColor: COLORS.surfaceContainerHigh, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  filterTxt: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.onSurface, textTransform: 'uppercase' },
  shelfHeader: { paddingBottom: 8, backgroundColor: COLORS.surfaceContainerLowest, paddingHorizontal: 8, paddingVertical: 4, borderTopLeftRadius: 4, borderTopRightRadius: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  shelfTitle: { fontFamily: FONTS.display, fontSize: 18, color: COLORS.secondary, textTransform: 'uppercase' },
  shelfSub: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.onSurface, textTransform: 'uppercase', letterSpacing: 1.2 },
  shelfCount: { fontFamily: FONTS.monoBold, fontSize: 14, color: COLORS.onSurfaceVariant },
  shelfRack: { backgroundColor: COLORS.surfaceContainerLow, padding: 6, borderBottomLeftRadius: 4, borderBottomRightRadius: 4, gap: 6 },
  spineItem: { backgroundColor: COLORS.surfaceContainerHigh, padding: 8, borderRadius: 4, flexDirection: 'row', alignItems: 'center', gap: 8 },
  spineColor: { width: 6, height: 36, borderRadius: 3 },
  spineTitle: { fontFamily: FONTS.monoBold, fontSize: 12, color: COLORS.onSurface, textTransform: 'uppercase' },
  spineSub: { fontFamily: FONTS.mono, fontSize: 11, color: COLORS.onSurfaceVariant },
  spineTime: { fontFamily: FONTS.monoBold, fontSize: 11, color: COLORS.primary, marginRight: 4 },
  spineBadge: { paddingHorizontal: 6, paddingVertical: 2, backgroundColor: COLORS.surfaceContainerHighest, borderRadius: 2 },
  spineBadgeTxt: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.secondary, textTransform: 'uppercase' },
  demagCard: { marginHorizontal: 16, marginTop: 24, backgroundColor: COLORS.surfaceContainerLowest, padding: 12, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 12 },
  demagIcon: { width: 40, height: 40, borderRadius: 4, backgroundColor: COLORS.surfaceContainerHigh, alignItems: 'center', justifyContent: 'center' },
  demagTitle: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.onSurface, textTransform: 'uppercase', letterSpacing: 1 },
  demagSub: { fontFamily: FONTS.mono, fontSize: 12, color: COLORS.onSurfaceVariant, marginTop: 2 },
  demagStatus: { backgroundColor: COLORS.surfaceContainer, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  demagStatusTxt: { fontFamily: FONTS.monoBold, fontSize: 12, color: COLORS.secondary },
  dockPlayer: { position: 'absolute', bottom: 56, left: 0, right: 0, backgroundColor: COLORS.surfaceContainerHigh, paddingHorizontal: 16, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', gap: 8, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 8, elevation: 8 },
  dockHub: { width: 32, height: 32, borderRadius: 4, backgroundColor: COLORS.surfaceContainerLowest, alignItems: 'center', justifyContent: 'center' },
  dockHubInner: { width: 16, height: 16, borderRadius: 8, borderWidth: 1, borderColor: COLORS.secondary, alignItems: 'center', justifyContent: 'center' },
  dockTitle: { fontFamily: FONTS.monoBold, fontSize: 13, color: COLORS.onSurface },
  dockTime: { fontFamily: FONTS.monoBold, fontSize: 11, color: COLORS.secondary },
  dockDur: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.onSurfaceVariant },
  dockBadge: { backgroundColor: COLORS.surfaceContainerHighest, paddingHorizontal: 4, borderRadius: 2 },
  dockBadgeTxt: { fontFamily: FONTS.monoBold, fontSize: 9, color: COLORS.primary },
  dockBtn: { width: 32, height: 32, borderRadius: 4, backgroundColor: COLORS.surfaceContainer, alignItems: 'center', justifyContent: 'center' },
  nav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 56, backgroundColor: COLORS.surfaceContainerLowest, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  navItem: { alignItems: 'center', gap: 2, width: 56 },
  navLabel: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.onSurfaceVariant, textTransform: 'uppercase' },
  navIndicator: { position: 'absolute', bottom: -4, width: 24, height: 2, backgroundColor: COLORS.secondary, borderRadius: 1 },
});