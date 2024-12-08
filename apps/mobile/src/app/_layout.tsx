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

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  if (__DEV__) {
    verifyInstallation();
  }

  const { environment } = useRelayEnvironment();

  /**
   * The splash screen is the best opportunity
   * to load as much content as possible to keep
   * all user journeys snappy and smooth. All subsequent
   * loading will be cached by relay.
   */
  useEffect(() => {
    const appRoot = loadQuery(environment, APP_ROOT_QUERY, {});
    void SplashScreen.hideAsync();

    return () => appRoot.dispose();
  }, [environment]);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider value={DefaultTheme}>
          <SafeAreaProvider>
            <BottomSheetModalProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="(root)" />
                <Stack.Screen name="auth" />
                <Stack.Screen
                  name="(modals)"
                  options={{
                    presentation: "modal",
                  }}
                />
              </Stack>
            </BottomSheetModalProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </RelayEnvironmentProvider>
  );
}
