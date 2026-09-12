import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, Switch, TextInput } from 'react-native';
import { Icon } from '../src/components/ui/Icon';
import { COLORS, FONTS } from '../src/theme/theme';
import { useRouter } from 'expo-router';
import { useSettingsStore } from '../src/store/settingsStore';
import { useLogStore } from '../src/store/logStore';
import { ReportBuilder } from '../src/logging/ReportBuilder';
import { ProviderId } from '../src/providers/types';
import { PROVIDERS } from '../src/providers/registry';

export default function DevOptionsScreen() {
  const router = useRouter();
  const settings = useSettingsStore();
  const logs = useLogStore(state => state.logs);
  const clearLogs = useLogStore(state => state.clearLogs);
  
  const [healthStatus, setHealthStatus] = useState<Record<string, string>>({});
  const [testing, setTesting] = useState(false);

  const testProviders = async () => {
    setTesting(true);
    const results: Record<string, string> = {};
    for (const id of Object.keys(PROVIDERS) as ProviderId[]) {
      try {
        const h = await PROVIDERS[id].getHealth();
        results[id] = `${h.status.toUpperCase()} ${h.latencyMs ? `(${h.latencyMs}ms)` : ''}`;
      } catch (e: any) {
        results[id] = `ERROR: ${e.message}`;
      }
    }
    setHealthStatus(results);
    setTesting(false);
  };

  const handleExport = async () => {
    await ReportBuilder.exportReport();
  };

  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <TouchableOpacity style={s.iconBtn} onPress={() => router.back()}><Icon name="chevron-back" size={24} color={COLORS.onSurface} /></TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Text style={s.hSub}>BENCH CALIBRATION // DEV</Text>
          <Text style={s.hTitle}>Developer Options</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        {/* Active Provider */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>ACTIVE PROVIDER</Text>
          <View style={s.card}>
            {(['spotiflac', 'octofiesta', 'radioparadise'] as ProviderId[]).map(id => (
              <TouchableOpacity key={id} style={s.radioRow} onPress={() => settings.setActiveProvider(id)}>
                <Icon name={settings.activeProviderId === id ? "radio-button-on" : "radio-button-off"} size={20} color={settings.activeProviderId === id ? COLORS.secondary : COLORS.onSurfaceVariant} />
                <View style={{ marginLeft: 12 }}>
                  <Text style={s.radioTitle}>{PROVIDERS[id].name}</Text>
                  <View style={{ flexDirection: 'row', gap: 6, marginTop: 4 }}>
                    {PROVIDERS[id].capabilities.search && <Text style={s.capBadge}>SEARCH</Text>}
                    {PROVIDERS[id].capabilities.stream && <Text style={s.capBadge}>STREAM</Text>}
                    {PROVIDERS[id].capabilities.live && <Text style={s.capBadge}>LIVE</Text>}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Global Settings */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>GLOBAL BEHAVIOR</Text>
          <View style={s.card}>
            <View style={s.toggleRow}>
              <View>
                <Text style={s.toggleLabel}>VERBOSE LOGGING</Text>
                <Text style={s.toggleDesc}>Log trace and debug levels</Text>
              </View>
              <Switch value={settings.verboseLogging} onValueChange={settings.setVerboseLogging} trackColor={{ true: COLORS.secondary, false: COLORS.surfaceContainerHighest }} />
            </View>
            <View style={[s.toggleRow, { marginTop: 12 }]}>
              <View>
                <Text style={s.toggleLabel}>AUTO FALLBACK</Text>
                <Text style={s.toggleDesc}>Cascade if primary provider fails</Text>
              </View>
              <Switch value={settings.autoFallback} onValueChange={settings.setAutoFallback} trackColor={{ true: COLORS.secondary, false: COLORS.surfaceContainerHighest }} />
            </View>
          </View>
        </View>

        {/* Overrides */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>PROVIDER OVERRIDES</Text>
          <View style={s.card}>
            <Text style={s.inputLabel}>OCTOFIESTA BASE URL</Text>
            <TextInput 
              style={s.input} 
              value={settings.octoFiestaUrl || ''} 
              onChangeText={settings.setOctoFiestaUrl}
              placeholder="https://api.octofiesta.local"
              placeholderTextColor={COLORS.outline}
            />
          </View>
        </View>

        {/* Diagnostics */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>DIAGNOSTICS & TELEMETRY</Text>
          <View style={s.card}>
            <TouchableOpacity style={s.actionBtn} onPress={testProviders} disabled={testing}>
              <Icon name="pulse" size={18} color={COLORS.onSurface} />
              <Text style={s.actionBtnTxt}>{testing ? 'TESTING...' : 'TEST ALL PROVIDERS'}</Text>
            </TouchableOpacity>
            
            {Object.keys(healthStatus).length > 0 && (
              <View style={s.healthResults}>
                {Object.entries(healthStatus).map(([id, status]) => (
                  <Text key={id} style={s.healthText}>{id}: {status}</Text>
                ))}
              </View>
            )}

            <TouchableOpacity style={[s.actionBtn, { marginTop: 12 }]} onPress={handleExport}>
              <Icon name="share" size={18} color={COLORS.onSurface} />
              <Text style={s.actionBtnTxt}>EXPORT DIAGNOSTIC REPORT</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[s.actionBtn, { marginTop: 12, backgroundColor: COLORS.errorContainer }]} onPress={clearLogs}>
              <Icon name="trash" size={18} color={COLORS.error} />
              <Text style={[s.actionBtnTxt, { color: COLORS.error }]}>CLEAR LOCAL LOGS</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Log Preview */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>LOG PREVIEW ({logs.length} ENTRIES)</Text>
          <View style={s.logBox}>
            {logs.slice(0, 20).map((l, i) => (
              <Text key={i} style={[s.logText, l.level === 'error' && { color: COLORS.error }, l.level === 'warn' && { color: COLORS.tertiary }]} numberOfLines={2}>
                [{new Date(l.timestamp).toISOString().split('T')[1].replace('Z', '')}] {l.tag}: {l.message}
              </Text>
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
  section: { marginHorizontal: 16, marginTop: 24 },
  sectionLabel: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.primary, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8 },
  card: { backgroundColor: COLORS.surfaceContainerLow, borderRadius: 12, padding: 16 },
  radioRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.surfaceContainerHigh },
  radioTitle: { fontFamily: FONTS.displayBold, fontSize: 14, color: COLORS.onSurface },
  capBadge: { backgroundColor: COLORS.surfaceContainerHighest, paddingHorizontal: 4, paddingVertical: 2, borderRadius: 2, fontFamily: FONTS.monoBold, fontSize: 9, color: COLORS.onSurfaceVariant },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  toggleLabel: { fontFamily: FONTS.displayBold, fontSize: 12, color: COLORS.onSurface },
  toggleDesc: { fontFamily: FONTS.mono, fontSize: 11, color: COLORS.onSurfaceVariant, marginTop: 2 },
  inputLabel: { fontFamily: FONTS.displayBold, fontSize: 10, color: COLORS.onSurfaceVariant, marginBottom: 4 },
  input: { backgroundColor: COLORS.surfaceContainerLowest, fontFamily: FONTS.mono, color: COLORS.onSurface, padding: 12, borderRadius: 8, fontSize: 12 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: COLORS.surfaceContainerHighest, padding: 12, borderRadius: 8 },
  actionBtnTxt: { fontFamily: FONTS.displayBold, fontSize: 12, color: COLORS.onSurface },
  healthResults: { backgroundColor: COLORS.surfaceContainerLowest, padding: 12, borderRadius: 8, marginTop: 12 },
  healthText: { fontFamily: FONTS.mono, fontSize: 11, color: COLORS.secondary, marginBottom: 4 },
  logBox: { backgroundColor: '#000', padding: 12, borderRadius: 8, height: 200 },
  logText: { fontFamily: FONTS.mono, fontSize: 9, color: COLORS.onSurfaceVariant, marginBottom: 4 },
});
