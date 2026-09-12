import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts, SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import { CourierPrime_400Regular, CourierPrime_700Bold } from '@expo-google-fonts/courier-prime';
import { COLORS, FONTS } from './theme';

const SHELF_I = [
  { id: '01. Starman // Bowie [4:16]', color: '#d6a84f', text: '#241a04', bias: 'TYPE I', type: 'TAPE I' },
  { id: '02. Dreams // Fleetwood [4:14]', color: '#bf4332', text: '#fff0ed', bias: 'CrO2 II', type: 'TAPE II' },
  { id: '03. Karma Police // Radiohead', color: '#e8e4d8', text: '#1c1d1a', bias: 'NORMAL', type: 'TAPE III' },
  { id: '04. Blue in Green // Miles Davis', color: '#21272a', text: '#bec8cd', bias: 'METAL IV', type: 'TAPE IV' },
];

const SHELF_II = [
  { id: 'Paranoid Android [6:27]', color: '#3d4a36', text: '#e0ebd9', bias: 'PULLED', type: 'TAPE I', active: true },
  { id: 'Riders on the Storm // Doors', color: '#2d5059', text: '#cbeaf0', bias: 'TYPE II', type: 'TAPE II' },
  { id: 'Nightcall // Kavinsky [4:19]', color: '#18191a', text: '#ffffff', bias: 'SYNTH', type: 'TAPE III' },
  { id: 'Space Oddity // Bowie [5:15]', color: '#ded7c3', text: '#29251e', bias: 'TYPE I', type: 'TAPE IV' },
];

const SHELF_III = [
  { id: "★ SUMMER '84 MIX ★", color: '#1f2224', text: '#ffb689', bias: 'C-90', type: 'MIXTAPE I' },
  { id: 'Midnight Drive // Synth Vol.3', color: '#1b3447', text: '#c9e6fc', bias: 'TYPE II', type: 'MIXTAPE II' },
  { id: 'Sunday Morning Acoustic', color: '#a87f58', text: '#24170a', bias: 'KRAFT', type: 'MIXTAPE III' },
  { id: "Tokyo City Pop '82 // Tatsuro", color: '#ab415a', text: '#ffdbe2', bias: 'CrO2', type: 'MIXTAPE IV' },
];

export default function ShelfLibrary() {
  const [fontsLoaded] = useFonts({ SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold, CourierPrime_400Regular, CourierPrime_700Bold });
  if (!fontsLoaded) return null;

  const renderShelf = (title: string, subtitle: string, data: any[], isActiveShelf = false) => (
    <View style={s.shelfSection}>
      <View style={s.shelfHeader}>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <View style={[s.dot, { backgroundColor: isActiveShelf ? COLORS.secondary : COLORS.tertiary }]} />
          <Text style={s.shelfTitle}>{title}</Text>
        </View>
        <Text style={s.shelfSub}>{subtitle}</Text>
      </View>
      
      <View style={s.shelfBay}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 8, gap: 12, alignItems: 'flex-end', height: 240 }}>
          {data.map((item, idx) => (
            <TouchableOpacity key={idx} style={[s.spineCard, { backgroundColor: item.color, height: item.active ? 208 : 192, transform: [{ translateY: item.active ? -16 : 0 }] }]}>
              <View style={s.spineTop}>
                <View style={[s.spineBadge, { backgroundColor: item.text + '20' }]}>
                  <Text style={[s.spineBadgeTxt, { color: item.text }]}>{item.bias}</Text>
                </View>
                <View style={[s.spineDot, { backgroundColor: item.text + '30' }]} />
              </View>
              
              <View style={s.spineCenter}>
                <Text style={[s.spineText, { color: item.text }]} numberOfLines={2}>
                  {item.id}
                </Text>
              </View>
              
              <View style={s.spineBottom}>
                <Text style={[s.spineBottomTxt, { color: item.text }]}>{item.type}</Text>
                <MaterialIcons name="graphic-eq" size={14} color={item.text} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* Walnut Shelf Lip */}
        <View style={s.shelfLip}>
          <View style={s.lipLine} /><View style={s.lipLine} /><View style={s.lipLine} />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle="light-content" />
      <View style={s.header}>
        <View>
          <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
            <View style={s.dot} /><Text style={s.hSub}>TPS-L2 // STEREO</Text>
          </View>
          <Text style={s.hTitle}>Cassette Shelf</Text>
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
        {/* Shelf Unit Header */}
        <View style={s.unitHeader}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <View>
              <Text style={s.unitTitle}>My Cassette Shelf</Text>
              <Text style={s.unitSub}>148 TAPES LOADED // 47H ARCHIVE</Text>
            </View>
            <View style={s.cabBadge}>
              <View style={s.dot} /><Text style={s.cabBadgeTxt}>CABINET A-1</Text>
            </View>
          </View>
          
          {/* Search */}
          <View style={s.searchBox}>
            <MaterialIcons name="search" size={18} color={COLORS.outline} />
            <Text style={s.searchTxt}>Find album, label, J-card note...</Text>
          </View>
          
          {/* Sort */}
          <View style={s.sortRow}>
            <Text style={s.sortLabel}>SORT:</Text>
            <View style={s.sortDropdown}><Text style={s.sortDropTxt}>Recently Played</Text><MaterialIcons name="expand-more" size={14} color={COLORS.secondary} /></View>
            <TouchableOpacity style={s.filterBtnActive}><Text style={s.filterTxtActive}>All</Text></TouchableOpacity>
            <TouchableOpacity style={s.filterBtn}><Text style={s.filterTxt}>Favorites</Text></TouchableOpacity>
            <TouchableOpacity style={s.filterBtn}><Text style={s.filterTxt}>CrO2 Type II</Text></TouchableOpacity>
          </View>
        </View>

        {/* Info Banner */}
        <View style={s.infoBanner}>
          <MaterialIcons name="arrow-upward" size={18} color={COLORS.secondary} />
          <Text style={s.infoBannerTxt}>Tap cassette spine to pull tape & inspect J-card</Text>
          <Text style={s.infoBannerSub}>HI-FI DETENT</Text>
        </View>

        {/* Physical Shelving Unit */}
        <View style={s.shelvingUnit}>
          {renderShelf("Shelf I : Recently Played", "SLOT 01-04", SHELF_I)}
          {renderShelf("Shelf II : Heavy Rotation", "1 TAPE EJECTED / PULLED", SHELF_II, true)}
          {renderShelf("Shelf III : Favorites & Mixtapes", "CUSTOM SPINES", SHELF_III)}
        </View>

        {/* Cleaning Footnote */}
        <View style={s.footer}>
          <MaterialIcons name="cleaning-services" size={24} color={COLORS.secondary} />
          <View style={{ flex: 1 }}>
            <Text style={s.footerTitle}>Pinch Roller & Capstan Clean</Text>
            <Text style={s.footerSub}>Head demagnetized 3 tape hours ago // Optimal Azimuth</Text>
          </View>
          <Text style={s.footerBias}>DOLBY B NR</Text>
        </View>
      </ScrollView>

      {/* Mini Player */}
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
        {[{ i: 'home', l: 'HOME' }, { i: 'view-column-2', l: 'SHELF', active: true }, { i: 'manage-search', l: 'SEARCH' }, { i: 'queue-music', l: 'MIXTAPES' }].map((n, i) => (
          <TouchableOpacity key={i} style={s.navItem}>
            <MaterialIcons name={n.i as any} size={22} color={n.active ? COLORS.secondary : COLORS.onSurfaceVariant} />
            <Text style={[s.navLabel, n.active && { color: COLORS.secondary }]}>{n.l}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
  unitHeader: { backgroundColor: COLORS.surfaceContainerLow, padding: 16, borderRadius: 12, marginHorizontal: 12, marginTop: 12, gap: 12, shadowColor: '#000', shadowOpacity: 0.4, shadowRadius: 8, elevation: 4 },
  unitTitle: { fontFamily: FONTS.display, fontSize: 18, color: COLORS.onSurface, textTransform: 'uppercase' },
  unitSub: { fontFamily: FONTS.monoBold, fontSize: 14, color: COLORS.secondary, letterSpacing: 1 },
  cabBadge: { flexDirection: 'row', gap: 6, alignItems: 'center', backgroundColor: COLORS.surfaceContainerHighest, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  cabBadgeTxt: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.onSurfaceVariant, textTransform: 'uppercase' },
  searchBox: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: COLORS.surfaceContainerLowest, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8 },
  searchTxt: { fontFamily: FONTS.mono, fontSize: 14, color: COLORS.outlineVariant },
  sortRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  sortLabel: { fontFamily: FONTS.displayBold, fontSize: 10, color: COLORS.outline },
  sortDropdown: { flexDirection: 'row', gap: 4, alignItems: 'center', backgroundColor: COLORS.surfaceContainerHigh, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  sortDropTxt: { fontFamily: FONTS.mono, fontSize: 12, color: COLORS.onSurface },
  filterBtnActive: { backgroundColor: COLORS.secondary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  filterTxtActive: { fontFamily: FONTS.displayBold, fontSize: 10, color: COLORS.onSecondary, textTransform: 'uppercase' },
  filterBtn: { backgroundColor: COLORS.surfaceContainer, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  filterTxt: { fontFamily: FONTS.displayBold, fontSize: 10, color: COLORS.onSurfaceVariant, textTransform: 'uppercase' },
  infoBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: COLORS.primaryContainer, marginHorizontal: 12, marginTop: 8, padding: 10, borderRadius: 8 },
  infoBannerTxt: { flex: 1, fontFamily: FONTS.mono, fontSize: 13, color: COLORS.onPrimaryContainer },
  infoBannerSub: { fontFamily: FONTS.monoBold, fontSize: 13, color: COLORS.tertiary },
  shelvingUnit: { backgroundColor: COLORS.surfaceContainerLowest, marginHorizontal: 12, marginTop: 12, padding: 8, borderRadius: 12, gap: 24, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 12, elevation: 8 },
  shelfSection: { gap: 4 },
  shelfHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 4 },
  shelfTitle: { fontFamily: FONTS.display, fontSize: 18, color: COLORS.onSurface, textTransform: 'uppercase', letterSpacing: 1 },
  shelfSub: { fontFamily: FONTS.monoBold, fontSize: 14, color: COLORS.outline },
  shelfBay: { backgroundColor: COLORS.surfaceContainerLow, borderRadius: 8, paddingTop: 16, paddingBottom: 8, overflow: 'hidden' },
  spineCard: { width: 120, borderRadius: 4, padding: 8, justifyContent: 'space-between', shadowColor: '#000', shadowOpacity: 0.6, shadowRadius: 6, elevation: 4 },
  spineTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  spineBadge: { paddingHorizontal: 4, paddingVertical: 2, borderRadius: 2 },
  spineBadgeTxt: { fontFamily: FONTS.displayBold, fontSize: 9, textTransform: 'uppercase' },
  spineDot: { width: 10, height: 10, borderRadius: 5 },
  spineCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  spineText: { fontFamily: FONTS.monoBold, fontSize: 13, textAlign: 'center', transform: [{ rotate: '-90deg' }], width: 140 },
  spineBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  spineBottomTxt: { fontFamily: FONTS.mono, fontSize: 10 },
  shelfLip: { height: 16, backgroundColor: COLORS.surfaceContainerHighest, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, marginTop: 4 },
  lipLine: { height: 4, width: 40, backgroundColor: COLORS.surfaceVariant, borderRadius: 2 },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: COLORS.surfaceContainerLow, marginHorizontal: 12, marginTop: 16, padding: 16, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.4, shadowRadius: 6, elevation: 3 },
  footerTitle: { fontFamily: FONTS.display, fontSize: 18, color: COLORS.onSurface, textTransform: 'uppercase' },
  footerSub: { fontFamily: FONTS.mono, fontSize: 12, color: COLORS.onSurfaceVariant, marginTop: 2 },
  footerBias: { fontFamily: FONTS.monoBold, fontSize: 14, color: COLORS.tertiary },
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
});