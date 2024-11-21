import "../global.css";
import "expo-dev-client";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { verifyInstallation } from "nativewind";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RelayEnvironmentProvider } from "react-relay";

import { useRelayEnvironment } from "@/relay";

import { AppRoot } from "../root/AppRoot";

export default function RootLayout() {
  if (__DEV__) {
    verifyInstallation();
  }

  const { environment } = useRelayEnvironment();

  return (
    <RelayEnvironmentProvider environment={environment}>
      <GestureHandlerRootView>
        <ThemeProvider value={DefaultTheme}>
          <SafeAreaProvider>
            <BottomSheetModalProvider>
              <AppRoot>
                <Stack
                  screenOptions={{
                    headerShown: false,
                  }}
                >
                  <Stack.Screen name="(app)" />
                  <Stack.Screen name="(auth)" />
                </Stack>
              </AppRoot>
            </BottomSheetModalProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </RelayEnvironmentProvider>
  );
}
