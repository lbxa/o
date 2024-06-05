import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{statusBarTranslucent: true}}>
        <Stack.Screen name="home"/>
        <Stack.Screen name="modal" options={{presentation: "modal"}}/>
      </Stack>
    </SafeAreaProvider>
  );
}