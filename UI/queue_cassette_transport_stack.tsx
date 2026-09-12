import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts, SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import { CourierPrime_400Regular, CourierPrime_700Bold } from '@expo-google-fonts/courier-prime';
import { COLORS, FONTS } from './theme';

const HOPPER = [
  { num: '01.', title: 'PARANOID ANDROID', artist: 'RADIOHEAD • OK COMPUTER', time: '06:27', bias: 'TYPE II CrO2', color: '#B34737' },
  { num: '02.', title: 'NIGHTCALL', artist: 'KAVINSKY • OUTRUN', time: '04:19', bias: 'TYPE I FERRIC', color: '#a8ccd7' },
  { num: '03.', title: 'SUNSET', artist: 'THE MIDNIGHT • ENDLESS SUMMER', time: '05:26', bias: 'CUSTOM J-CARD', color: '#ffb689' },
  { num: '04.', title: 'RESONANCE', artist: 'HOME • ODYSSEY', time: '03:32', bias: 'TYPE IV METAL', color: '#8d9194' },
];

export default function QueueCassetteTransportStack() {
  const [fontsLoaded] = useFonts({ SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold, CourierPrime_400Regular, CourierPrime_700Bold });
  const [continuous, setContinuous] = React.useState(true);
  const [autoRewind, setAutoRewind] = React.useState(false);

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

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Banner */}
        <View style={s.banner}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', flex: 1 }}>
              <View style={s.dot} /><Text style={s.bannerTxt} numberOfLines={1}>PLAYHEAD STACK // DECK BUFFER</Text>
            </View>
            <View style={s.busyBadge}><Text style={s.busyTxt}>BUSY // 4.76 cm/s</Text></View>
          </View>
          <Text style={s.bannerSub}>4 TAPES QUEUED • TOTAL RUNTIME: 22M 40S • AUTO-REVERSE: ON</Text>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            <TouchableOpacity style={s.actionBtn}><MaterialIcons name="delete-sweep" size={16} color={COLORS.error} /><Text style={s.actionBtnTxt}>CLEAR QUEUE</Text></TouchableOpacity>
            <TouchableOpacity style={s.actionBtn}><MaterialIcons name="shuffle" size={16} color={COLORS.secondary} /><Text style={s.actionBtnTxt}>SHUFFLE STACK</Text></TouchableOpacity>
          </View>
        </View>

        {/* Now Engaged */}
        <View style={{ padding: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
              <MaterialIcons name="tune" size={15} color={COLORS.tertiary} />
              <Text style={s.nowEngaged}>NOW ENGAGED AT PINCH ROLLER</Text>
            </View>
            <View style={s.engagedBadge}>
              <View style={s.engagedDot} /><Text style={s.engagedTxt}>PLAYHEAD ENGAGED</Text>
            </View>
          </View>

          <View style={s.wellOuter}>
            <View style={s.cassetteFace}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                  <View style={s.tinyScrew}><Text style={s.plusSign}>+</Text></View>
                  <Text style={s.chromeTxt}>CHROME CrO₂</Text>
                </View>
                <View style={s.typeIIBadge}><Text style={s.typeIITxt}>TYPE II // HIGH BIAS</Text></View>
                <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                  <Text style={s.sideTxt}>SIDE A</Text>
                  <View style={s.tinyScrew}><Text style={s.plusSign}>+</Text></View>
                </View>
              </View>

              <View style={s.titleRow}>
                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', flex: 1 }}>
                  <MaterialIcons name="motion-photos-on" size={18} color={COLORS.secondary} />
                  <View style={{ flex: 1 }}>
                    <Text style={s.nowTitle} numberOfLines={1}>STARMAN</Text>
                    <Text style={s.nowArtist} numberOfLines={1}>DAVID BOWIE • THE RISE AND FALL OF ZIGGY STARDUST</Text>
                  </View>
                </View>
                <Text style={s.nowTime}>04:14</Text>
              </View>

              <View style={s.spoolStrip}>
                <View style={s.spoolCircle}>
                  <View style={s.spoolInner}><MaterialIcons name="settings" size={20} color={COLORS.outline} /></View>
                </View>
                <View style={{ flex: 1, paddingHorizontal: 12 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                    {['0', '25', '50', '75', '100'].map(t => <Text key={t} style={s.scaleTxt}>{t}</Text>)}
                  </View>
                  <View style={s.progressBar}><View style={[s.progressFill, { width: '58%' }]} /></View>
                  <Text style={s.progressTime}>02:27 / 04:14</Text>
                </View>
                <View style={s.spoolCircle}>
                  <View style={s.spoolInner}><MaterialIcons name="settings" size={20} color={COLORS.outline} /></View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
                <View style={s.counterBox}>
                  <MaterialIcons name="speed" size={16} color={COLORS.outline} />
                  <View>
                    <Text style={s.counterLabel}>ROTARY COUNTER</Text>
                    <Text style={s.counterVal}>043 <Text style={s.detentTxt}>DETENT</Text></Text>
                  </View>
                </View>
                <View style={s.vuBox}>
                  {['L', 'R'].map(ch => (
                    <View key={ch} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <Text style={s.vuCh}>{ch}</Text>
                      <View style={{ flex: 1, flexDirection: 'row', gap: 1 }}>
                        {Array.from({ length: 12 }).map((_, i) => {
                          const active = ch === 'L' ? i < 8 : i < 7;
                          let bg = COLORS.vuGreen;
                          if (i >= 8 && i < 10) bg = COLORS.vuAmber;
                          if (i >= 10) bg = COLORS.vuRed;
                          return <View key={i} style={[s.vuSeg, { backgroundColor: bg, opacity: active ? 1 : 0.15 }]} />;
                        })}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Hopper */}
        <View style={{ paddingHorizontal: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
              <MaterialIcons name="layers" size={16} color={COLORS.secondary} />
              <Text style={s.sectionTitle}>CASSETTE HOPPER</Text>
            </View>
            <Text style={s.stackOrder}>STACK ORDER // 01 → 04</Text>
          </View>
          {HOPPER.map((t, i) => (
            <View key={i} style={s.hopperItem}>
              <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', flex: 1 }}>
                <View style={{ gap: 2 }}>
                  {[0, 1, 2].map(l => <View key={l} style={s.dragLine} />)}
                </View>
                <View style={[s.biasStripe, { backgroundColor: t.color }]} />
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                    <Text style={[s.biasSmall, { color: t.color }]}>{t.bias}</Text>
                    <Text style={{ color: COLORS.outline, fontSize: 9 }}>•</Text>
                    <Text style={s.hopperTitle} numberOfLines={1}>{t.num} {t.title}</Text>
                  </View>
                  <Text style={s.hopperSub} numberOfLines={1}>{t.artist}</Text>
                </View>
              </View>
              <Text style={s.hopperTime}>{t.time}</Text>
              <TouchableOpacity style={s.ejectBtn}><MaterialIcons name="eject" size={15} color={COLORS.onSurface} /></TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Pull Tapes CTA */}
        <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
          <TouchableOpacity style={s.pullBtn}>
            <MaterialIcons name="add-circle" size={20} color={COLORS.secondary} />
            <Text style={s.pullBtnTxt}>+ PULL TAPES FROM SHELF TO INSERT HERE</Text>
          </TouchableOpacity>
        </View>

        {/* Relay Controls */}
        <View style={s.relayCard}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 4 }}>
            <Text style={s.relayTitle}>TRANSPORT RELAY CONTROLS</Text>
            <Text style={s.relaySub}>SOLENOID DETENT</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 }}>
            <View style={{ flex: 1 }}>
              <Text style={s.relayLabel}>CONTINUOUS TAPE FEED</Text>
              <Text style={s.relayDesc}>Auto-advance stack on leadout</Text>
            </View>
            <TouchableOpacity style={[s.togSwitch, continuous ? s.togOn : s.togOff]} onPress={() => setContinuous(!continuous)}>
              <View style={[s.togKnob, continuous ? { alignSelf: 'flex-end', backgroundColor: COLORS.onSecondary } : { alignSelf: 'flex-start', backgroundColor: COLORS.outline }]} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 }}>
            <View style={{ flex: 1 }}>
              <Text style={s.relayLabel}>AUTO-REWIND ON COMPLETION</Text>
              <Text style={s.relayDesc}>Reset spools to head marker</Text>
            </View>
            <TouchableOpacity style={[s.togSwitch, autoRewind ? s.togOn : s.togOff]} onPress={() => setAutoRewind(!autoRewind)}>
              <View style={[s.togKnob, autoRewind ? { alignSelf: 'flex-end', backgroundColor: COLORS.onSecondary } : { alignSelf: 'flex-start', backgroundColor: COLORS.outline }]} />
            </TouchableOpacity>
          </View>
          <View style={s.calibPlaque}>
            <MaterialIcons name="verified" size={16} color={COLORS.secondary} />
            <Text style={s.calibTxt}>Transport mechanism calibrated to 4.76 cm/s standard bias. Wow & flutter &lt; 0.08% WRMS.</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Player */}
      <View style={s.bottomPlayer}>
        <View style={s.bpHub}><MaterialIcons name="album" size={18} color={COLORS.secondary} /></View>
        <View style={{ flex: 1 }}>
          <Text style={s.bpTitle} numberOfLines={1}>Starman • David Bowie</Text>
          <Text style={s.bpSub} numberOfLines={1}>Type II CrO₂ // DOLBY B ON</Text>
        </View>
        <TouchableOpacity style={s.bpBtn}><MaterialIcons name="fast-rewind" size={18} color={COLORS.onSurface} /></TouchableOpacity>
        <TouchableOpacity style={[s.bpBtn, { backgroundColor: COLORS.secondary }]}><MaterialIcons name="pause" size={20} color={COLORS.onSecondary} /></TouchableOpacity>
        <TouchableOpacity style={s.bpBtn}><MaterialIcons name="fast-forward" size={18} color={COLORS.onSurface} /></TouchableOpacity>
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
  banner: { paddingHorizontal: 16, paddingVertical: 12, backgroundColor: COLORS.surfaceContainerLow },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.secondary },
  bannerTxt: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.primary, textTransform: 'uppercase', letterSpacing: 1.2 },
  busyBadge: { backgroundColor: COLORS.surfaceContainerLowest, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  busyTxt: { fontFamily: FONTS.monoBold, fontSize: 12, color: COLORS.secondary, letterSpacing: 1 },
  bannerSub: { fontFamily: FONTS.mono, fontSize: 12, color: COLORS.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1, marginTop: 4 },
  actionBtn: { flex: 1, height: 40, backgroundColor: COLORS.surfaceContainerHigh, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  actionBtnTxt: { fontFamily: FONTS.display, fontSize: 12, color: COLORS.onSurface, textTransform: 'uppercase', letterSpacing: 1 },
  nowEngaged: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1 },
  engagedBadge: { flexDirection: 'row', gap: 6, alignItems: 'center', backgroundColor: COLORS.surfaceContainerHighest, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  engagedDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.vuGreen },
  engagedTxt: { fontFamily: FONTS.displayBold, fontSize: 9, color: COLORS.primary, textTransform: 'uppercase' },
  wellOuter: { backgroundColor: COLORS.surfaceContainerLowest, padding: 12, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.9, shadowRadius: 8 },
  cassetteFace: { backgroundColor: COLORS.surfaceContainer, padding: 12, borderRadius: 8, gap: 10 },
  tinyScrew: { width: 16, height: 16, borderRadius: 8, backgroundColor: COLORS.surfaceContainerHighest, alignItems: 'center', justifyContent: 'center' },
  plusSign: { color: COLORS.outline, fontSize: 9, fontWeight: 'bold' },
  chromeTxt: { fontFamily: FON