import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import TabBarBackground from '@/components/ui/TabBarBackground';
// import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#fff',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: '#ADD8E6', 
          },
          default: {
            backgroundColor: '#ADD8E6', 
          },
        }),
      }}>
        
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Acceuil',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="account-circle" color={color} size={28} />  
          ),
        }}
      />
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="check-box" color={color} size={28} /> 
          ),
        }}
      />
      <Tabs.Screen
        name="readme"
        options={{
          title: 'Readme',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="description" color={color} size={28} />
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}
