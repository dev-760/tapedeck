import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'TapeDeck',
  slug: 'tapedeck',
  version: '0.1.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'tapedeck',
  userInterfaceStyle: 'dark',
  ios: {
    bundleIdentifier: 'com.tapedeck.app',
    infoPlist: {
      UIBackgroundModes: ['audio', 'fetch'],
    },
  },
  android: {
    package: 'com.tapedeck.app',
    versionCode: 1,
    permissions: [
      'android.permission.FOREGROUND_SERVICE',
      'android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK'
    ],
  },
  web: {
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#121416', // COLORS.surface
      },
    ],
    [
      'expo-font',
      {
        fonts: [
          'node_modules/@expo-google-fonts/space-grotesk/SpaceGrotesk_400Regular.ttf',
          'node_modules/@expo-google-fonts/space-grotesk/SpaceGrotesk_500Medium.ttf',
          'node_modules/@expo-google-fonts/space-grotesk/SpaceGrotesk_600SemiBold.ttf',
          'node_modules/@expo-google-fonts/space-grotesk/SpaceGrotesk_700Bold.ttf',
          'node_modules/@expo-google-fonts/courier-prime/CourierPrime_400Regular.ttf',
          'node_modules/@expo-google-fonts/courier-prime/CourierPrime_700Bold.ttf'
        ]
      }
    ],
    [
      'expo-build-properties',
      {
        ios: {
          deploymentTarget: "16.4"
        }
      }
    ]
  ],
  experiments: {
    typedRoutes: true,
  },
  // @ts-ignore - newArchEnabled is supported by Expo SDK 51+
  newArchEnabled: false,
  extra: {
    eas: {
      projectId: "13a5257b-72fd-495c-80bb-fd7c8a80b337"
    }
  }
});
