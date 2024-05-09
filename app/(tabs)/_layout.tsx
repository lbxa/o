import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, DarkTheme, DefaultTheme, useTheme } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{headerShown: false}}>
      <Tabs.Screen name="leaderboard" options={{title: "Home"}}/>
      <Tabs.Screen name="profile" options={{title: "Profile"}}/>
    </Tabs>
  );
}
