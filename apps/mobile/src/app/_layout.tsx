import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, DefaultTheme } from '@react-navigation/native';

import "../global.css";

export default function HomeLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <SafeAreaProvider>
        <Stack screenOptions={{statusBarTranslucent: true}}>
          <Stack.Screen name="index"/>
          <Stack.Screen name="modal" options={{presentation: "modal"}}/>
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
