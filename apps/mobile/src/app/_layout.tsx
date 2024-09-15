import "../global.css";

import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { RelayEnvironment } from "../relay";
import { ActiveUserProvider } from "../users/ActiveUser";

export default function Root() {
  return (
    <RelayEnvironment>
      <ActiveUserProvider>
        <ThemeProvider value={DefaultTheme}>
          <SafeAreaProvider>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="(app)" />
              <Stack.Screen name="(auth)" />
            </Stack>
          </SafeAreaProvider>
        </ThemeProvider>
      </ActiveUserProvider>
    </RelayEnvironment>
  );
}
