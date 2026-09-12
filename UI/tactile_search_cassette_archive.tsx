import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts, SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import { CourierPrime_400Regular, CourierPrime_700Bold } from '@expo-google-fonts/courier-prime';
import { COLORS, FONTS } from './theme';

const MATCHES = [
  { num: 'A-02', title: 'PARANOID ANDROID', artist: 'RADIOHEAD // OK COMPUTER (1997)', time: '06:27', bias: 'TYPE II CrO2', color: COLORS.secondaryFixed, shelf: 'SHELF 04 // BAY 12' },
  { num: 'A-06', title: 'KARMA POLICE', artist: 'RADIOHEAD // OK COMPUTER', time: '04:21', bias: 'TYPE I FERRIC', color: COLORS.outline },
  { num: 'B-03', title: 'NO SURPRISES', artist: 'RADIOHEAD // OK COMPUTER', time: '03:48', bias: 'TYPE II CrO2', color: COLORS.secondaryFixed },
  { num: 'A-03', title: 'SUBTERRANEAN HOMESICK ALIEN', artist: 'RADIOHEAD // OK COMPUTER', time: '04:29', bias: 'TYPE II CrO2', color: COLORS.secondaryFixed },
];

export default function TactileSearchCassetteArchive() {
  const [fontsLoaded] = useFonts({ SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold, CourierPrime_400Regular, CourierPrime_700Bold });
  const [search, setSearch] = useState('Radiohead');
  const [isPlaying, setIsPlaying] = useState(true);

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
        {/* Search Header */}
        <View style={s.searchHeader}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
              <View style={s.dot} /><Text style={s.searchTitle}>ARCHIVE INDEX // REEL SCAN</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
              <Text style={s.optTxt}>OPT-04</Text>
              <Text style={s.headReady}>HEAD READY</Text>
            </View>
          </View>
          
          <View style={s.searchBar}>
            <MaterialIcons name="search" size={18} color={COLORS.outline} />
            <TextInput 
              style={s.searchInput} 
              value={search} 
              onChangeText={setSearch} 
              placeholderTextColor={COLORS.outline} 
              placeholder="Type track title, artist..."
            />
            <TouchableOpacity style={s.clearBtn} onPress={() => setSearch('')}>
              <Text style={s.clearTxt}>CLR</Text>
              <MaterialIcons name="eject" size={14} color={COLORS.outlineVariant} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filterScroll}>
          {['ALL (148)', 'TRACKS (148)', 'ARTISTS (42)', 'ALBUMS (28)', 'MIXTAPES (8)'].map((f, i) => (
            <TouchableOpacity key={i} style={[s.filterChip, i === 0 && s.filterChipActive]}>
              {i === 0 && <View style={[s.dot, { backgroundColor: COLORS.secondary }]} />}
              <Text style={[s.filterChipTxt, i === 0 && s.filterChipTxtActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Recent Queries */}
        <View style={s.recentBox}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={s.recentLabel}>RECENT TAPE DRAWER QUERIES</Text>
            <Text style={s.recentCount}>4 LOGS</Text>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {['Radiohead', 'Type IV Metal Tapes', 'Ambient 1984', 'Bowie A-Sides'].map((q, i) => (
              <View key={i} style={s.queryChip}>
                <Text style={[s.queryTxt, i === 1 && { color: COLORS.secondary }]}>{q}</Text>
                <MaterialIcons name="close" size={13} color={COLORS.outline} />
              </View>
            ))}
          </View>
        </View>

        {/* Matches */}
        <View style={s.section}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <Text style={s.sectionTitle}>TRACK CASSETTES MATCHED</Text>
              <View style={s.countBadge}><Text style={s.countTxt}>4 FOUND</Text></View>
            </View>
            <Text style={s.autoAzimuth}>AUTO-AZIMUTH OK</Text>
          </View>

          {MATCHES.map((m, i) => (
            <View key={i} style={s.matchCard}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', flex: 1 }}>
                  <View style={[s.matchColor, { backgroundColor: m.color }]} />
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                      <Text style={s.matchNum}>{m.num}</Text>
                      <Text style={s.matchTitle} numberOfLines={1}>{m.title}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                      <Text style={s.matchSub} numberOfLines={1}>{m.artist}</Text>
                      <Text style={{ color: COLORS.outline, fontSize: 10 }}>•</Text>
                      <Text style={s.matchBias}>{m.bias}</Text>
                    </View>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                  <Text style={s.matchTime}>{m.time}</Text>
                  <TouchableOpacity style={s.loadBtn}><MaterialIcons name="download" size={13} color={COLORS.onPrimary} /><Text style={s.loadBtnTxt}>LOAD</Text></TouchableOpacity>
                </View>
              </View>
              <View style={s.matchFooter}>
                <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                  <View style={s.smallCircle} /><View style={s.bridgeLine} /><View style={s.smallCircle} />
                </View>
                <Text style={s.shelfLoc}>{m.shelf}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Artist Bin */}
        <View style={s.section}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <Text style={s.sectionTitle}>ARTIST ARCHIVE BINS</Text>
            <Text style={s.autoAzimuth}>INDEX: R-08</Text>
          </View>
          <View style={s.artistBin}>
            <View style={s.binHeader}>
              <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                <MaterialIcons name="folder-open" size={18} color={COLORS.secondary} />
                <Text style={s.binTitle}>RADIOHEAD</Text>
              </View>
              <Text style={s.binCount}>09 TAPES</Text>
            </View>
            <View style={s.binRow}><Text style={s.binKey}>ARCHIVE LOCATION:</Text><Text style={s.binVal}>CABINET 02 // SLOTS 14-22</Text></View>
            <View style={s.binRow}><Text style={s.binKey}>BIAS RATIO:</Text><Text style={s.binVal}>5x Type II (CrO2) • 4x Type I (Ferric)</Text></View>
            <View style={s.binRow}><Text style={s.binKey}>MASTER CASSETTES:</Text><Text style={s.binVal}>The Bends (1995), OK Computer (1997)...</Text></View>
            <TouchableOpacity style={s.pullBtn}><Text style={s.pullBtnTxt}>PULL ENTIRE ARTIST DRAWER</Text><MaterialIcons name="arrow-forward" size={16} color={COLORS.primary} /></TouchableOpacity>
          </View>
        </View>

        {/* Mixtapes */}
        <View style={s.section}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <Text style={s.sectionTitle}>MATCHED MIXTAPES</Text>
            <Text style={s.autoAzimuth}>C-90 CHROME</Text>
          </View>
          <View style={s.mixtapeCard}>
            <View style={s.mixtapeShell}>
              <View style={s.mixtapeHeader}>
                <Text style={s.mixtapeSide}>SIDE A // C-90 HIGH BIAS</Text>
                <Text style={s.mixtapeIndex}>INDEX #1997-ALT</Text>
              </View>
              <Text style={s.mixtapeTitle}>90s ALTERNATIVE VAULT</Text>
              <Text style={s.mixtapeSub}>Includes Radiohead, Smashing Pumpkins, Sonic Youth</Text>
              <View style={s.mixtapeTracksBadge}><Text style={s.mixtapeTracksTxt}>16 TRKS</Text></View>
            </View>
            <View style={s.spoolWindow}>
              <View style={s.spoolLeft}><View style={s.spoolInnerL}><View style={s.hubDot} /></View></View>
              <View style={s.bridge}><View style={[s.bridgeFill, { width: '75%' }]} /></View>
              <View style={s.spoolRight}><View style={s.spoolInnerR}><View style={s.hubDot} /></View></View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8 }}>
              <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                <View style={[s.dot, { backgroundColor: COLORS.tertiary }]} />
                <Text style={s.dolbyTxt}>DOLBY B NR ON</Text>
              </View>
              <TouchableOpacity style={s.insertBtn}><MaterialIcons name="play-arrow" size={16} color={COLORS.onSecondary} /><Text style={s.insertBtnTxt}>INSERT & PLAY</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Player */}
      <View style={s.bottomPlayer}>
        <View style={s.bpHub}><MaterialIcons name="album" size={18} color={COLORS.secondary} /></View>
        <View style={{ flex: 1 }}>
          <Text style={s.bpTitle} numberOfLines={1}>STARMAN</Text>
          <Text style={s.bpSub} numberOfLines={1}>DAVID BOWIE • TYPE II CrO2</Text>
        </View>
        <TouchableOpacity style={s.bpBtn}><MaterialIcons name="fast-rewind" size={18} color={COLORS.onSurface} /></TouchableOpacity>
        <TouchableOpacity style={[s.bpBtn, { backgroundColor: COLORS.secondary }]} onPress={() => setIsPlaying(!isPlaying)}>
          <MaterialIcons name={isPlaying ? 'pause' : 'play-arrow'} size={20} color={COLORS.onSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={s.bpBtn}><MaterialIcons name="fast-forward" size={18} color={COLORS.onSurface} /></TouchableOpacity>
      </View>

      {/* Bottom Nav */}
      <View style={s.navBar}>
        {[{ i: 'album', l: 'DECK' }, { i: 'shelves', l: 'SHELF' }, { i: 'search', l: 'REEL SCAN', active: true }, { i: 'tune', l: 'BIAS / EQ' }].map((n, i) => (
          <TouchableOpacity key={i} style={s.navItem}>
            <MaterialIcons name={n.i as any} size={20} color={n.active ? COLORS.secondary : COLORS.outline} />
            <Text style={[s.navLabel, n.active && { color: COLORS.secondary }]}>{n.l}</Text>
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
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.secondary },
  searchHeader: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 16 },
  searchTitle: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.primary, textTransform: 'uppercase', letterSpacing: 1.2 },
  optTxt: { fontFamily: FONTS.monoBold, fontSize: 14, color: COLORS.secondary },
  headReady: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.outline, textTransform: 'uppercase' },
  searchBar: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: COLORS.surfaceContainerLowest, padding: 8, borderRadius: 4, marginTop: 12, borderTopWidth: 2, borderTopColor: 'rgba(0,0,0,0.8)' },
  searchInput: { flex: 1, fontFamily: FONTS.mono, fontSize: 14, color: COLORS.onSurface },
  clearBtn: { flexDirection: 'row', gap: 4, alignItems: 'center', backgroundColor: COLORS.surfaceContainer, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  clearTxt: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.primary },
  filterScroll: { paddingHorizontal: 16, gap: 8, paddingBottom: 16 },
  filterChip: { flexDirection: 'row', gap: 6, alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4, backgroundColor: COLORS.surfaceContainerLow },
  filterChipActive: { backgroundColor: COLORS.surfaceContainerHigh, shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 4, elevation: 3 },
  filterChipTxt: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.onSurfaceVariant, textTransform: 'uppercase' },
  filterChipTxtActive: { color: COLORS.secondary },
  recentBox: { backgroundColor: COLORS.surfaceContainerLow, marginHorizontal: 16, padding: 12, borderRadius: 4, marginBottom: 16 },
  recentLabel: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.outline, textTransform: 'uppercase', letterSpacing: 1.2 },
  recentCount: { fontFamily: FONTS.monoBold, fontSize: 10, color: COLORS.tertiary },
  queryChip: { flexDirection: 'row', gap: 6, alignItems: 'center', backgroundColor: COLORS.surfaceContainer, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  queryTxt: { fontFamily: FONTS.mono, fontSize: 12, color: COLORS.onSurface },
  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionTitle: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.primary, textTransform: 'uppercase', letterSpacing: 1.2 },
  countBadge: { backgroundColor: COLORS.surfaceContainer, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 2 },
  countTxt: { fontFamily: FONTS.monoBold, fontSize: 10, color: COLORS.onSurfaceVariant },
  autoAzimuth: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.outline, textTransform: 'uppercase' },
  matchCard: { backgroundColor: COLORS.surfaceContainer, padding: 12, borderRadius: 4, marginBottom: 8, shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 6, elevation: 3 },
  matchColor: { width: 6, height: 40, borderRadius: 3 },
  matchNum: { fontFamily: FONTS.mono, fontSize: 11, color: COLORS.tertiary },
  matchTitle: { fontFamily: FONTS.display, fontSize: 15, color: COLORS.onSurface, textTransform: 'uppercase' },
  matchSub: { fontFamily: FONTS.mono, fontSize: 12, color: COLORS.onSurfaceVariant },
  matchBias: { fontFamily: FONTS.displayBold, fontSize: 10, color: COLORS.secondary, textTransform: 'uppercase' },
  matchTime: { fontFamily: FONTS.monoBold, fontSize: 14, color: COLORS.outline },
  loadBtn: { flexDirection: 'row', gap: 4, alignItems: 'center', backgroundColor: COLORS.primary, paddingHorizontal: 8, paddingVertical: 6, borderRadius: 4 },
  loadBtnTxt: { fontFamily: FONTS.displayBold, fontSize: 10, color: COLORS.onPrimary, textTransform: 'uppercase' },
  matchFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.surfaceContainerLowest, marginTop: 8, padding: 6, borderRadius: 4 },
  smallCircle: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.surfaceVariant },
  bridgeLine: { width: 60, height: 2, backgroundColor: COLORS.surfaceContainerHighest },
  shelfLoc: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.outline, textTransform: 'uppercase' },
  artistBin: { backgroundColor: COLORS.surfaceContainerHigh, padding: 16, borderRadius: 8, shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 8, elevation: 4 },
  binHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.surfaceContainer, padding: 8, borderRadius: 4, marginBottom: 12 },
  binTitle: { fontFamily: FONTS.display, fontSize: 18, color: COLORS.onSurface, textTransform: 'uppercase' },
  binCount: { fontFamily: FONTS.monoBold, fontSize: 20, color: COLORS.secondary },
  binRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  binKey: { fontFamily: FONTS.mono, fontSize: 12, color: COLORS.onSurfaceVariant },
  binVal: { fontFamily: FONTS.monoBold, fontSize: 12, color: COLORS.onSurface },
  pullBtn: { marginTop: 12, paddingVertical: 8, backgroundColor: COLORS.surfaceContainer, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  pullBtnTxt: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.primary, textTransform: 'uppercase', letterSpacing: 1.2 },
  mixtapeCard: { backgroundColor: COLORS.surfaceContainerHigh, padding: 12, borderRadius: 8, shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 8, elevation: 4 },
  mixtapeShell: { backgroundColor: COLORS.surfaceContainer, padding: 12, borderRadius: 4, borderTopWidth: 2, borderTopColor: 'rgba(0,0,0,0.8)' },
  mixtapeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(67,71,74,0.3)', paddingBottom: 6, marginBottom: 6 },
  mixtapeSide: { fontFamily: FONTS.monoBold, fontSize: 12, color: COLORS.secondary, letterSpacing: 1.2 },
  mixtapeIndex: { fontFamily: FONTS.monoBold, fontSize: 12, color: COLORS.tertiary },
  mixtapeTitle: { fontFamily: FONTS.display, fontSize: 20, color: COLORS.onSurface },
  mixtapeSub: { fontFamily: FONTS.mono, fontSize: 12, color: COLORS.outline, marginTop: 2 },
  mixtapeTracksBadge: { position: 'absolute', right: 12, top: 40, backgroundColor: COLORS.secondaryContainer, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  mixtapeTracksTxt: { fontFamily: FONTS.monoBold, fontSize: 14, color: COLORS.onSecondaryContainer },
  spoolWindow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surfaceContainerLowest, paddingVertical: 16, paddingHorizontal: 24, marginTop: 8, borderRadius: 4, borderTopWidth: 3, borderTopColor: 'rgba(0,0,0,0.9)' },
  spoolLeft: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.surfaceContainerHighest, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 4 },
  spoolRight: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.surfaceContainerHighest, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 4 },
  spoolInnerL: { width: 32, height: 32, borderRadius: 16, backgroundColor: COLORS.surfaceContainerLow, alignItems: 'center', justifyContent: 'center' },
  spoolInnerR: { width: 32, height: 32, borderRadius: 16, backgroundColor: COLORS.surfaceContainerLow, alignItems: 'center', justifyContent: 'center' },
  hubDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.outlineVariant },
  bridge: { flex: 1, height: 4, backgroundColor: COLORS.surfaceContainerHighest, borderRadius: 2, marginHorizontal: 12, overflow: 'hidden' },
  bridgeFill: { height: '100%', backgroundColor: COLORS.primaryContainer },
  dolbyTxt: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.onSurfaceVariant, textTransform: 'uppercase' },
  insertBtn: { flexDirection: 'row', gap: 4, alignItems: 'center', backgroundColor: COLORS.secondary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 4, shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 4 },
  insertBtnTxt: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.onSecondary, textTransform: 'uppercase', letterSpacing: 1.2 },
  bottomPlayer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(40,42,44,0.95)', paddingHorizontal: 16, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', gap: 8 },
  bpHub: { width: 36, height: 36, borderRadius: 4, backgroundColor: COLORS.surfaceContainerLowest, alignItems: 'center', justifyContent: 'center' },
  bpTitle: { fontFamily: FONTS.display, fontSize: 15, color: COLORS.onSurface, textTransform: 'uppercase' },
  bpSub: { fontFamily: FONTS.mono, fontSize: 12, color: COLORS.onSurfaceVariant },
  bpBtn: { width: 36, height: 36, borderRadius: 4, backgroundColor: COLORS.surfaceContainer, alignItems: 'center', justifyContent: 'center' },
  navBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 56, backgroundColor: 'rgba(18,20,22,0.9)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingTop: 56 },
  navItem: { alignItems: 'center', gap: 2, width: 56 },
  navLabel: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.outline, textTransform: 'uppercase', letterSpacing: 1 },
});