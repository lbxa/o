import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, DarkTheme, DefaultTheme, useTheme } from '@react-navigation/native';

export default function HomeLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <SafeAreaProvider>
        <Stack screenOptions={{statusBarTranslucent: true}}>
          <Stack.Screen name="home" options={{headerShown: false}}/>
          <Stack.Screen name="modal" options={{presentation: "modal"}}/>
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
