import "../global.css";
import "expo-dev-client";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { verifyInstallation } from "nativewind";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { loadQuery, RelayEnvironmentProvider } from "react-relay";

import { useRelayEnvironment } from "@/relay";
import { APP_ROOT_QUERY } from "@/root";

export default function RootLayout() {
  if (__DEV__) {
    verifyInstallation();
  }

  const { environment } = useRelayEnvironment();

  useEffect(() => {
    void SplashScreen.preventAutoHideAsync();
    const appRoot = loadQuery(environment, APP_ROOT_QUERY, {});
    void SplashScreen.hideAsync();

    return () => appRoot.dispose();
  }, [environment]);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <GestureHandlerRootView>
        <ThemeProvider value={DefaultTheme}>
          <SafeAreaProvider>
            <BottomSheetModalProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="(app)" />
                <Stack.Screen name="(auth)" />
              </Stack>
            </BottomSheetModalProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </RelayEnvironmentProvider>
  );
}
