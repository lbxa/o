import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, DarkTheme, DefaultTheme, useTheme } from '@react-navigation/native';
import { View, Text } from 'react-native';

export default function HomeLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <SafeAreaProvider>
        <View><Text>TBA</Text></View>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
