import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { 
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold
} from '@expo-google-fonts/space-grotesk';
import {
  CourierPrime_400Regular,
  CourierPrime_700Bold
} from '@expo-google-fonts/courier-prime';
import * as SplashScreen from 'expo-splash-screen';
import { COLORS } from '../src/theme/theme';
import { audioService } from '../src/audio/AudioService';
import { StatusBar } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
    CourierPrime_400Regular,
    CourierPrime_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);
  
  useEffect(() => {
    audioService.init();
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack screenOptions={{ 
        headerStyle: { backgroundColor: COLORS.surface },
        headerTintColor: COLORS.onSurface,
        headerShown: false,
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="now-playing" 
          options={{ 
            presentation: 'modal', 
            headerShown: false 
          }} 
        />
      </Stack>
    </>
  );
}
