import { useEffect, useState } from 'react';
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

import { fetchRegistry } from '../src/extensions/registry';
import { downloadAndInstallExtension } from '../src/extensions/loader';
import { SpotiFLACExtensionProvider } from '../src/providers/spotiflac-extension';
import { PROVIDERS } from '../src/providers/registry';
import { logger } from '../src/logging/Logger';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [extensionsLoaded, setExtensionsLoaded] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
    CourierPrime_400Regular,
    CourierPrime_700Bold,
  });

  useEffect(() => {
    async function bootstrapExtensions() {
      try {
        const registry = await fetchRegistry();
        const tidalEntry = registry.find((e) => e.id === 'tidal-web');

        if (tidalEntry) {
          const { manifest, code } = await downloadAndInstallExtension(tidalEntry);
          const provider = new SpotiFLACExtensionProvider('tidal-web', manifest, code);
          await provider.initialize(code);
          
          PROVIDERS['ext:tidal-web'] = provider;
          logger.info('Extensions', `Loaded extension: ${manifest.name} v${manifest.version}`);
        } else {
          logger.warn('Extensions', 'tidal-web extension not found in registry');
        }
      } catch (err) {
        logger.error('Extensions', 'Failed to load extensions', err);
      } finally {
        setExtensionsLoaded(true);
      }
    }
    
    bootstrapExtensions();
  }, []);

  useEffect(() => {
    if ((fontsLoaded || fontError) && extensionsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, extensionsLoaded]);
  
  useEffect(() => {
    audioService.init();
  }, []);

  if ((!fontsLoaded && !fontError) || !extensionsLoaded) {
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

