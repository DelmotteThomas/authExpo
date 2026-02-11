import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import {colors} from '@/styles/colors';
import {Ionicons} from '@expo/vector-icons';



export default function TabLayout() {
 

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: () => <IconSymbol size={28} name="house.fill" color={colors.primary} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Profil',
          tabBarIcon: () => <Ionicons size={28} name="person" color={colors.primary} />,
        }}
      />
    </Tabs>
  );
}
