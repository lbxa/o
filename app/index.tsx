import { View, Text, ScrollView } from 'react-native';
import { Link, Stack } from 'expo-router';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, DarkTheme, DefaultTheme, useTheme } from '@react-navigation/native';

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <SafeAreaProvider>
        <Stack screenOptions={{statusBarTranslucent: true}}>
          <Stack.Screen name="index"/>
          <Stack.Screen name="modal" options={{presentation: "modal"}}/>
        </Stack>
        <Link href="/leaderboard">Home</Link>
        <Link href="/modal">Modal</Link>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}