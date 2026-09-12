import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar, TextInput, ActivityIndicator } from 'react-native';
import { Icon } from '../../src/components/ui/Icon';
import { COLORS, FONTS } from '../../src/theme/theme';
import { audioService } from '../../src/audio/AudioService';
import { getActiveProvider } from '../../src/providers/registry';
import { Track } from '../../src/providers/types';
import { formatDurationMs } from '../../src/utils/formatting';

export default function SearchScreen() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const executeSearch = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    
    setIsSearching(true);
    setError('');
    
    try {
      const provider = getActiveProvider();
      const tracks = await provider.search(query);
      setResults(tracks);
    } catch (err: any) {
      setError(err.message || 'Search failed');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle="light-content" />
      <View style={s.header}>
        <TouchableOpacity style={s.iconBtn}><Icon name="menu" size={20} color={COLORS.onSurface} /></TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Text style={s.hSub}>DECK MECHANISM // EXPANDED</Text>
          <Text style={s.hTitle}>Archive Search</Text>
        </View>
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
            <Icon name="search" size={18} color={COLORS.outline} />
            <TextInput 
              style={s.searchInput} 
              value={search} 
              onChangeText={setSearch} 
              onSubmitEditing={() => executeSearch(search)}
              placeholderTextColor={COLORS.outline} 
              placeholder="Type track title, artist..."
              returnKeyType="search"
            />
            <TouchableOpacity style={s.clearBtn} onPress={() => { setSearch(''); setResults([]); }}>
              <Text style={s.clearTxt}>CLR</Text>
              <Icon name="close" size={14} color={COLORS.outlineVariant} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filterScroll}>
          {['ALL', 'TRACKS', 'ARTISTS', 'ALBUMS'].map((f, i) => (
            <TouchableOpacity key={i} style={[s.filterChip, i === 0 && s.filterChipActive]}>
              {i === 0 && <View style={[s.dot, { backgroundColor: COLORS.secondary }]} />}
              <Text style={[s.filterChipTxt, i === 0 && s.filterChipTxtActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Matches */}
        <View style={s.section}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <Text style={s.sectionTitle}>TRACK CASSETTES MATCHED</Text>
              <View style={s.countBadge}><Text style={s.countTxt}>{isSearching ? '...' : `${results.length} FOUND`}</Text></View>
            </View>
            <Text style={s.autoAzimuth}>AUTO-AZIMUTH OK</Text>
          </View>

          {isSearching && (
            <View style={{ padding: 24, alignItems: 'center' }}>
              <ActivityIndicator size="small" color={COLORS.secondary} />
              <Text style={{ marginTop: 8, fontFamily: FONTS.mono, color: COLORS.onSurfaceVariant }}>SCANNING CATALOG...</Text>
            </View>
          )}

          {!isSearching && error ? (
            <View style={{ padding: 24, alignItems: 'center' }}>
              <Text style={{ fontFamily: FONTS.mono, color: COLORS.error }}>{error}</Text>
            </View>
          ) : null}

          {!isSearching && results.map((m, i) => (
            <View key={m.id} style={s.matchCard}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', flex: 1 }}>
                  <View style={[s.matchColor, { backgroundColor: i % 2 === 0 ? COLORS.secondaryFixed : COLORS.outline }]} />
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                      <Text style={s.matchNum}>A-{(i+1).toString().padStart(2, '0')}</Text>
                      <Text style={s.matchTitle} numberOfLines={1}>{m.title}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                      <Text style={s.matchSub} numberOfLines={1}>{m.artist}</Text>
                      <Text style={{ color: COLORS.outline, fontSize: 10 }}>•</Text>
                      <Text style={s.matchBias}>{m.album || 'TYPE II CrO2'}</Text>
                    </View>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                  <Text style={s.matchTime}>{m.durationMs ? formatDurationMs(m.durationMs) : '--:--'}</Text>
                  <TouchableOpacity style={s.loadBtn} onPress={() => {
                    audioService.playTrack({ id: m.id, title: m.title, artist: m.artist, album: m.album, durationMs: m.durationMs });
                  }}><Icon name="download" size={13} color={COLORS.onPrimary} /><Text style={s.loadBtnTxt}>LOAD</Text></TouchableOpacity>
                </View>
              </View>
              <View style={s.matchFooter}>
                <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                  <View style={s.smallCircle} /><View style={s.bridgeLine} /><View style={s.smallCircle} />
                </View>
                <Text style={s.shelfLoc}>SHELF {Math.floor(i / 10).toString().padStart(2, '0')} // BAY {(i % 10).toString().padStart(2, '0')}</Text>
              </View>
            </View>
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
});
