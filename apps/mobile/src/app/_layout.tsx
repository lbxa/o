import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, DefaultTheme } from '@react-navigation/native';
import { RelayEnvironment } from '../relay';

import "../global.css";

export default function RootLayout() {
  return (
    <RelayEnvironment>
      <ThemeProvider value={DefaultTheme}>
        <SafeAreaProvider>
          <Stack screenOptions={{
            statusBarTranslucent: true,
            headerShown: false,
          }}>
            {/* <Stack.Screen name="(auth)"/> */}
          </Stack>
        </SafeAreaProvider>
      </ThemeProvider>
    </RelayEnvironment>
  );
}
