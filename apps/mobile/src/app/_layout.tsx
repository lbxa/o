import "../global.css";

import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { RelayEnvironment } from "../relay";
import { ActiveUserProvider } from "../users/ActiveUser";
import { useAuth } from "../utils/useAuth";

export default function Root() {
  const { session } = useAuth();

  return (
    <RelayEnvironment>
      <ThemeProvider value={DefaultTheme}>
        <SafeAreaProvider>
          {session ? (
            <ActiveUserProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="(app)" />
              </Stack>
            </ActiveUserProvider>
          ) : (
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="(auth)" />
            </Stack>
          )}
        </SafeAreaProvider>
      </ThemeProvider>
    </RelayEnvironment>
  );
}
