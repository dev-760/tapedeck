import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { Icon } from '../../src/components/ui/Icon';
import { COLORS, FONTS } from '../../src/theme/theme';

import { useRouter } from 'expo-router';

type Tab = 'playback' | 'library' | 'chassis' | 'maintenance';

export default function SettingsScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('playback');
  const [dolby, setDolby] = useState<'off' | 'b' | 'c'>('b');
  const [bias, setBias] = useState<'type1' | 'type2' | 'type4'>('type2');
  const [azimuth, setAzimuth] = useState(1.2);
  const [autoReverse, setAutoReverse] = useState(true);
  const [limiter, setLimiter] = useState(true);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'playback', label: 'PLAYBACK' },
    { id: 'library', label: 'LIBRARY' },
    { id: 'chassis', label: 'CHASSIS' },
    { id: 'maintenance', label: 'BENCH' },
  ];

  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle="light-content" />
      <View style={s.header}>
        <TouchableOpacity style={s.iconBtn}><Icon name="menu" size={20} color={COLORS.onSurface} /></TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Text style={s.hSub}>DECK MECHANISM // EXPANDED</Text>
          <Text style={s.hTitle}>Settings</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Banner */}
        <View style={s.banner}>
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <View style={s.dot} /><Text style={s.bannerTxt}>WM-D6C // BENCH CALIBRATION</Text>
          </View>
          <View style={s.calBadge}><Text style={s.calTxt}>CALIB: ACTIVE</Text></View>
        </View>

        {/* Tab Selector */}
        <View style={s.tabBar}>
          {tabs.map(t => (
            <TouchableOpacity key={t.id} style={[s.tabBtn, tab === t.id && s.tabBtnActive]} onPress={() => setTab(t.id)}>
              <Text style={[s.tabTxt, tab === t.id && s.tabTxtActive]}>{t.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {tab === 'playback' && (
          <>
            {/* Tape Head & Bias */}
            <View style={s.card}>
              <View style={s.cardHeader}>
                <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                  <Icon name="options" size={18} color={COLORS.secondary} />
                  <Text style={s.cardTitle}>TAPE HEAD & BIAS{'\n'}DETENTS</Text>
                </View>
                <Text style={s.cardMeta}>ST-70{'\n'}RECEPTACLE</Text>
              </View>

              {/* Dolby */}
              <View style={s.subBox}>
                <View style={s.subBoxHeader}>
                  <Text style={s.subBoxLabel}>DOLBY NOISE REDUCTION MODE</Text>
                  <Text style={s.subBoxValue}>{dolby === 'off' ? 'OFF' : dolby === 'b' ? 'TYPE-B' : 'TYPE-C'}</Text>
                </View>
                <View style={s.switchRow}>
                  {(['off', 'b', 'c'] as const).map(d => (
                    <TouchableOpacity key={d} style={[s.switchOpt, dolby === d && s.switchOptActive]} onPress={() => setDolby(d)}>
                      <Text style={[s.switchOptTxt, dolby === d && s.switchOptTxtActive]}>{d === 'off' ? 'OFF' : `${d.toUpperCase()}-TYPE`}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Bias */}
              <View style={s.subBox}>
                <View style={s.subBoxHeader}>
                  <Text style={s.subBoxLabel}>TAPE FORMULATION / EQ BIAS</Text>
                  <Text style={[s.subBoxValue, { color: COLORS.tertiary }]}>{bias === 'type1' ? 'TYPE I // 120µs' : bias === 'type2' ? 'TYPE II // 70µs' : 'TYPE IV // 70µs'}</Text>
                </View>
                <View style={s.switchRow}>
                  {([
                    { id: 'type1', l: 'Type I', sub: 'FERRIC' },
                    { id: 'type2', l: 'Type II', sub: 'CrO2 70µs' },
                    { id: 'type4', l: 'Type IV', sub: 'METAL' },
                  ] as const).map(b => (
                    <TouchableOpacity key={b.id} style={[s.biasOpt, bias === b.id && s.biasOptActive]} onPress={() => setBias(b.id)}>
                      <Text style={[s.biasOptTitle, bias === b.id && s.biasOptTitleActive]}>{b.l}</Text>
                      <Text style={[s.biasOptSub, bias === b.id && s.biasOptSubActive]}>{b.sub}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Azimuth */}
              <View style={s.subBox}>
                <View style={s.subBoxHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={s.subBoxLabel}>TAPE HEAD AZIMUTH ANGLE</Text>
                    <Text style={s.subBoxDesc}>Fine-tune high-frequency phase alignment</Text>
                  </View>
                  <View style={s.readout}><Text style={s.readoutTxt}>{azimuth > 0 ? '+' : ''}{azimuth.toFixed(1)}'</Text></View>
                </View>
                {/* Simplified slider using buttons */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12 }}>
                  <Text style={s.sliderEnd}>-15'</Text>
                  <View style={s.sliderTrack}>
                    <View style={[s.sliderFill, { width: `${((azimuth + 15) / 30) * 100}%` }]} />
                    <View style={[s.sliderThumb, { left: `${((azimuth + 15) / 30) * 100}%` }]} />
                  </View>
                  <Text style={s.sliderEnd}>+15'</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                  <Text style={s.sliderMeta}>HIGH DAMP</Text>
                  <Text style={s.sliderMeta}>CENTER (0.0')</Text>
                  <Text style={s.sliderMeta}>TREBLE PEAK</Text>
                </View>
              </View>
            </View>

            {/* Solenoid & Capstan */}
            <View style={s.card}>
              <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center', marginBottom: 12 }}>
                <Icon name="hardware-chip" size={18} color={COLORS.secondary} />
                <Text style={s.cardTitle2}>SOLENOID & CAPSTAN CONTROLS</Text>
              </View>

              <View style={s.toggleRow}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                    <Text style={s.toggleLabel}>SOLENOID AUTO-REVERSE</Text>
                    <View style={[s.toggleLed, !autoReverse && { backgroundColor: COLORS.outline }]} />
                  </View>
                  <Text style={s.toggleDesc}>Bi-directional optical loop sensor</Text>
                </View>
                <TouchableOpacity style={[s.toggleSwitch, autoReverse ? s.toggleOn : s.toggleOff]} onPress={() => setAutoReverse(!autoReverse)}>
                  <View style={[s.toggleKnob, autoReverse ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' }]} />
                </TouchableOpacity>
              </View>

              <View style={[s.toggleRow, { marginTop: 8 }]}>
                <View style={{ flex: 1 }}>
                  <Text style={s.toggleLabel}>TAPE FEEDER STABILIZER</Text>
                  <Text style={s.toggleDesc}>Quartz-locked capstan &lt;0.08% WRMS</Text>
                </View>
                <TouchableOpacity style={[s.toggleSwitch, limiter ? s.toggleOn : s.toggleOff]} onPress={() => setLimiter(!limiter)}>
                  <View style={[s.toggleKnob, limiter ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' }]} />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}

        {tab === 'library' && (
          <View style={s.card}>
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center', marginBottom: 12 }}>
              <Icon name="folder" size={18} color={COLORS.secondary} />
              <Text style={s.cardTitle2}>TAPE VAULT DIRECTORY</Text>
            </View>
            <Text style={s.subBoxLabel}>ARCHIVE MOUNT PATH</Text>
            <View style={s.pathBox}>
              <Text style={s.pathTxt} numberOfLines={1}>/Volumes/AudioArchive/CassetteDumps</Text>
              <TouchableOpacity style={s.browseBtn}><Text style={s.browseTxt}>BROWSE</Text></TouchableOpacity>
            </View>
            <View style={[s.toggleRow, { marginTop: 12 }]}>
              <View style={{ flex: 1 }}>
                <Text style={s.toggleLabel}>SHELVED CASSETTES</Text>
                <Text style={[s.toggleDesc, { fontFamily: FONTS.monoBold, color: COLORS.tertiary, fontSize: 14 }]}>148 TAPES INDEXED</Text>
              </View>
              <TouchableOpacity style={s.scanBtn}><Icon name="sync" size={16} color={COLORS.onPrimary} /><Text style={s.scanBtnTxt}>SCAN REELS</Text></TouchableOpacity>
            </View>
          </View>
        )}

        {tab === 'chassis' && (
          <View style={s.card}>
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center', marginBottom: 12 }}>
              <Icon name="phone-portrait" size={18} color={COLORS.secondary} />
              <Text style={s.cardTitle2}>CHASSIS & BALLISTICS</Text>
            </View>
            <Text style={s.subBoxLabel}>MECHANICAL HAPTIC DETENT WEIGHT</Text>
            <View style={s.switchRow}>
              {['SOFT', 'MEDIUM', 'SOLENOID'].map((l, i) => (
                <TouchableOpacity key={l} style={[s.switchOpt, i === 1 && s.switchOptActive]}>
                  <Text style={[s.switchOptTxt, i === 1 && s.switchOptTxtActive]}>{l}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {tab === 'maintenance' && (
          <View style={s.card}>
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center', marginBottom: 12 }}>
              <Icon name="build" size={18} color={COLORS.secondary} />
              <Text style={s.cardTitle2}>BENCH SERVICE METRICS</Text>
            </View>
            <View style={s.subBox}>
              <View style={s.subBoxHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={s.toggleLabel}>TAPE HEAD DEMAGNETIZER</Text>
                  <Text style={s.toggleDesc}>Last discharge cycle: 12 playback hours ago</Text>
                </View>
                <View style={[s.toggleLed, { backgroundColor: COLORS.tertiary, width: 12, height: 12, borderRadius: 6 }]} />
              </View>
              <TouchableOpacity style={s.demagBtn} onPress={() => router.push('/dev-options')}>
                <Text style={s.demagBtnTxt}>OPEN DEVELOPER OPTIONS</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  tabBar: { marginHorizontal: 16, marginTop: 16, backgroundColor: COLORS.surfaceContainerLowest, padding: 4, borderRadius: 8, flexDirection: 'row', gap: 4 },
  tabBtn: { flex: 1, paddingVertical: 8, borderRadius: 4, alignItems: 'center' },
  tabBtnActive: { backgroundColor: COLORS.secondary },
  tabTxt: { fontFamily: FONTS.displayBold, fontSize: 10, color: COLORS.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1 },
  tabTxtActive: { color: COLORS.onSecondary, fontWeight: '700' },
  card: { marginHorizontal: 16, marginTop: 16, backgroundColor: COLORS.surfaceContainerLow, padding: 16, borderRadius: 12, gap: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardTitle: { fontFamily: FONTS.display, fontSize: 18, color: COLORS.onSurface, textTransform: 'uppercase', letterSpacing: 1, lineHeight: 22 },
  cardTitle2: { fontFamily: FONTS.display, fontSize: 18, color: COLORS.onSurface, textTransform: 'uppercase', letterSpacing: 1 },
  cardMeta: { fontFamily: FONTS.monoBold, fontSize: 10, color: COLORS.tertiary, textAlign: 'right' },
  subBox: { backgroundColor: COLORS.surfaceContainer, padding: 12, borderRadius: 8 },
  subBoxHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  subBoxLabel: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1 },
  subBoxDesc: { fontFamily: FONTS.mono, fontSize: 12, color: COLORS.onSurfaceVariant, marginTop: 2 },
  subBoxValue: { fontFamily: FONTS.monoBold, fontSize: 14, color: COLORS.secondary, fontWeight: '700' },
  switchRow: { flexDirection: 'row', backgroundColor: COLORS.surfaceContainerLowest, padding: 4, borderRadius: 4, gap: 4 },
  switchOpt: { flex: 1, paddingVertical: 8, borderRadius: 4, alignItems: 'center' },
  switchOptActive: { backgroundColor: COLORS.secondary },
  switchOptTxt: { fontFamily: FONTS.displayBold, fontSize: 10, color: COLORS.onSurfaceVariant, textTransform: 'uppercase' },
  switchOptTxtActive: { color: COLORS.onSecondary, fontWeight: '700' },
  biasOpt: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 4 },
  biasOptActive: { backgroundColor: COLORS.tertiary },
  biasOptTitle: { fontFamily: FONTS.displayBold, fontSize: 10, color: COLORS.onSurfaceVariant, textTransform: 'uppercase' },
  biasOptTitleActive: { color: COLORS.onTertiary },
  biasOptSub: { fontFamily: FONTS.mono, fontSize: 9, color: COLORS.outline, marginTop: 2 },
  biasOptSubActive: { color: COLORS.onTertiary },
  readout: { backgroundColor: COLORS.surfaceContainerLowest, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  readoutTxt: { fontFamily: FONTS.monoBold, fontSize: 14, color: COLORS.secondary },
  sliderEnd: { fontFamily: FONTS.mono, fontSize: 10, color: COLORS.outline },
  sliderTrack: { flex: 1, height: 6, backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 3, position: 'relative' },
  sliderFill: { height: '100%', backgroundColor: COLORS.secondary, borderRadius: 3 },
  sliderThumb: { position: 'absolute', top: -4, width: 14, height: 14, borderRadius: 7, backgroundColor: COLORS.secondary, marginLeft: -7 },
  sliderMeta: { fontFamily: FONTS.mono, fontSize: 9, color: COLORS.outline },
  toggleRow: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: COLORS.surfaceContainer, borderRadius: 8 },
  toggleLabel: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.onSurface, textTransform: 'uppercase', letterSpacing: 1 },
  toggleDesc: { fontFamily: FONTS.mono, fontSize: 12, color: COLORS.onSurfaceVariant, marginTop: 2 },
  toggleLed: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.secondary },
  toggleSwitch: { width: 56, height: 32, borderRadius: 16, padding: 4, justifyContent: 'center' },
  toggleOn: { backgroundColor: COLORS.secondary },
  toggleOff: { backgroundColor: COLORS.surfaceContainerHighest },
  toggleKnob: { width: 24, height: 24, borderRadius: 12, backgroundColor: COLORS.onSecondary, shadowColor: '#000', shadowOpacity: 0.4, shadowRadius: 2 },
  pathBox: { backgroundColor: COLORS.surfaceContainerLowest, padding: 12, borderRadius: 4, flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  pathTxt: { flex: 1, fontFamily: FONTS.monoBold, fontSize: 13, color: COLORS.secondary },
  browseBtn: { backgroundColor: COLORS.surfaceContainerHigh, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  browseTxt: { fontFamily: FONTS.displayBold, fontSize: 10, color: COLORS.primary, textTransform: 'uppercase' },
  scanBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 4, flexDirection: 'row', alignItems: 'center', gap: 6 },
  scanBtnTxt: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.onPrimary, textTransform: 'uppercase' },
  demagBtn: { width: '100%', paddingVertical: 8, borderRadius: 4, backgroundColor: COLORS.surfaceContainerHighest, alignItems: 'center', marginTop: 12 },
  demagBtnTxt: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.secondary, textTransform: 'uppercase', letterSpacing: 1 },
});
