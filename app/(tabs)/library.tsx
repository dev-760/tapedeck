import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { Icon } from '../../src/components/ui/Icon';
import { COLORS, FONTS } from '../../src/theme/theme';
import { audioService } from '../../src/audio/AudioService';

const SHELF_I = [
  { id: 'shelf-1-01', title: '01. Starman // Bowie [4:16]', artist: 'David Bowie', color: '#d6a84f', text: '#241a04', bias: 'TYPE I', type: 'TAPE I' },
  { id: 'shelf-1-02', title: '02. Dreams // Fleetwood [4:14]', artist: 'Fleetwood Mac', color: '#bf4332', text: '#fff0ed', bias: 'CrO2 II', type: 'TAPE II' },
  { id: 'shelf-1-03', title: '03. Karma Police // Radiohead', artist: 'Radiohead', color: '#e8e4d8', text: '#1c1d1a', bias: 'NORMAL', type: 'TAPE III' },
  { id: 'shelf-1-04', title: '04. Blue in Green // Miles Davis', artist: 'Miles Davis', color: '#21272a', text: '#bec8cd', bias: 'METAL IV', type: 'TAPE IV' },
];

const SHELF_II = [
  { id: 'shelf-2-01', title: 'Paranoid Android [6:27]', artist: 'Radiohead', color: '#3d4a36', text: '#e0ebd9', bias: 'PULLED', type: 'TAPE I', active: true },
  { id: 'shelf-2-02', title: 'Riders on the Storm // Doors', artist: 'The Doors', color: '#2d5059', text: '#cbeaf0', bias: 'TYPE II', type: 'TAPE II' },
  { id: 'shelf-2-03', title: 'Nightcall // Kavinsky [4:19]', artist: 'Kavinsky', color: '#18191a', text: '#ffffff', bias: 'SYNTH', type: 'TAPE III' },
  { id: 'shelf-2-04', title: 'Space Oddity // Bowie [5:15]', artist: 'David Bowie', color: '#ded7c3', text: '#29251e', bias: 'TYPE I', type: 'TAPE IV' },
];

const SHELF_III = [
  { id: 'shelf-3-01', title: "★ SUMMER '84 MIX ★", artist: 'Various Artists', color: '#1f2224', text: '#ffb689', bias: 'C-90', type: 'MIXTAPE I' },
  { id: 'shelf-3-02', title: 'Midnight Drive // Synth Vol.3', artist: 'Various Artists', color: '#1b3447', text: '#c9e6fc', bias: 'TYPE II', type: 'MIXTAPE II' },
  { id: 'shelf-3-03', title: 'Sunday Morning Acoustic', artist: 'Various Artists', color: '#a87f58', text: '#24170a', bias: 'KRAFT', type: 'MIXTAPE III' },
  { id: 'shelf-3-04', title: "Tokyo City Pop '82 // Tatsuro", artist: 'Tatsuro Yamashita', color: '#ab415a', text: '#ffdbe2', bias: 'CrO2', type: 'MIXTAPE IV' },
];

export default function LibraryScreen() {
  const handlePlayTape = (item: typeof SHELF_I[0]) => {
    const titleParts = item.title.split(' // ');
    const trackTitle = titleParts[0].replace(/^\d+\.\s*/, '');
    audioService.playTrack({
      id: item.id,
      title: trackTitle,
      artist: item.artist,
    });
  };

  const renderShelf = (title: string, subtitle: string, data: typeof SHELF_I, isActiveShelf = false) => (
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
            <TouchableOpacity 
              key={idx} 
              style={[s.spineCard, { backgroundColor: item.color, height: item.active ? 208 : 192, transform: [{ translateY: item.active ? -16 : 0 }] }]}
              onPress={() => handlePlayTape(item)}
            >
              <View style={s.spineTop}>
                <View style={[s.spineBadge, { backgroundColor: item.text + '20' }]}>
                  <Text style={[s.spineBadgeTxt, { color: item.text }]}>{item.bias}</Text>
                </View>
                <View style={[s.spineDot, { backgroundColor: item.text + '30' }]} />
              </View>
              
              <View style={s.spineCenter}>
                <Text style={[s.spineText, { color: item.text }]} numberOfLines={2}>
                  {item.title}
                </Text>
              </View>
              
              <View style={s.spineBottom}>
                <Text style={[s.spineBottomTxt, { color: item.text }]}>{item.type}</Text>
                <Icon name="pulse" size={14} color={item.text} />
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
        <TouchableOpacity style={s.iconBtn}><Icon name="menu" size={20} color={COLORS.onSurface} /></TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 8 }}>
          <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
            <View style={s.headerDot} /><Text style={s.hSub}>TPS-L2 // STEREO</Text>
          </View>
          <Text style={s.hTitle}>Cassette Shelf</Text>
        </View>
        <TouchableOpacity style={s.iconBtn}><Icon name="options" size={20} color={COLORS.onSurface} /></TouchableOpacity>
        <View style={s.avatar}><Icon name="person" size={18} color={COLORS.onPrimary} /></View>
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
              <View style={s.headerDot} /><Text style={s.cabBadgeTxt}>CABINET A-1</Text>
            </View>
          </View>
          
          {/* Search */}
          <View style={s.searchBox}>
            <Icon name="search" size={18} color={COLORS.outline} />
            <Text style={s.searchTxt}>Find album, label, J-card note...</Text>
          </View>
          
          {/* Sort */}
          <View style={s.sortRow}>
            <Text style={s.sortLabel}>SORT:</Text>
            <View style={s.sortDropdown}><Text style={s.sortDropTxt}>Recently Played</Text><Icon name="chevron-down" size={14} color={COLORS.secondary} /></View>
            <TouchableOpacity style={s.filterBtnActive}><Text style={s.filterTxtActive}>All</Text></TouchableOpacity>
            <TouchableOpacity style={s.filterBtn}><Text style={s.filterTxt}>Favorites</Text></TouchableOpacity>
            <TouchableOpacity style={s.filterBtn}><Text style={s.filterTxt}>CrO2 Type II</Text></TouchableOpacity>
          </View>
        </View>

        {/* Info Banner */}
        <View style={s.infoBanner}>
          <Icon name="arrow-up" size={18} color={COLORS.secondary} />
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
          <Icon name="build" size={24} color={COLORS.secondary} />
          <View style={{ flex: 1 }}>
            <Text style={s.footerTitle}>Pinch Roller & Capstan Clean</Text>
            <Text style={s.footerSub}>Head demagnetized 3 tape hours ago // Optimal Azimuth</Text>
          </View>
          <Text style={s.footerBias}>DOLBY B NR</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  header: { height: 64, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center' },
  headerDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.secondary },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.secondary },
  hSub: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.primary, textTransform: 'uppercase', letterSpacing: 1.2 },
  hTitle: { fontFamily: FONTS.display, fontSize: 18, color: COLORS.onSurface, textTransform: 'uppercase', marginTop: 2 },
  iconBtn: { width: 44, height: 44, borderRadius: 4, backgroundColor: COLORS.surfaceContainerHigh, alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', marginLeft: 8 },
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
});
