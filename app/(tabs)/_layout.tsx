import React from 'react';
import { Tabs } from 'expo-router';
import { COLORS } from '../../src/theme/theme';
import { Icon } from '../../src/components/ui/Icon';
import { usePlaybackStore } from '../../src/store/playbackStore';
import { MiniPlayer } from '../../src/components/player/MiniPlayer';

export default function TabLayout() {
  const currentTrack = usePlaybackStore(state => state.currentTrack);
  
  // Simple layout adjustment to accommodate absolute MiniPlayer
  const tabBarPadding = currentTrack ? 72 : 0; // MiniPlayer height

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.secondary,
          tabBarInactiveTintColor: COLORS.onSurfaceVariant,
          tabBarStyle: {
            backgroundColor: COLORS.surfaceContainerLowest,
            borderTopColor: COLORS.surfaceContainerHigh,
            height: 60,
            marginBottom: tabBarPadding, // push tabs up when player is visible
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Icon name="home" color={color} size={24} />,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({ color }) => <Icon name="search" color={color} size={24} />,
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: 'Library',
            tabBarIcon: ({ color }) => <Icon name="library" color={color} size={24} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <Icon name="settings" color={color} size={24} />,
          }}
        />
      </Tabs>
      <MiniPlayer />
    </>
  );
}
