import "../global.css";

import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { RelayEnvironment } from "../relay";

export default function Root() {
  return (
    <RelayEnvironment>
      <ThemeProvider value={DefaultTheme}>
        <SafeAreaProvider>
          <Stack
            screenOptions={{
              statusBarTranslucent: true,
              headerShown: false,
            }}
          >
            {/* <Stack.Screen name="(auth)"/> */}
          </Stack>
        </SafeAreaProvider>
      </ThemeProvider>
    </RelayEnvironment>
  );
}
