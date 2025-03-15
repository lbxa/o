import "../global.css";
import "expo-dev-client";

import OnexIcon from "@assets/images/onex-ivory.svg";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { verifyInstallation } from "nativewind";
import { useEffect } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { loadQuery, RelayEnvironmentProvider } from "react-relay";

import { ErrorBoundary, useRelayEnvironment } from "@/relay";
import { APP_ROOT_QUERY } from "@/root";
import { OText } from "@/universe/atoms/OText";

import { useOTheme } from "../utils/useOTheme";

void SplashScreen.preventAutoHideAsync();

function AppContent() {
  const { isDark } = useOTheme();
  const { environment } = useRelayEnvironment();

  useEffect(() => {
    const appRoot = loadQuery(environment, APP_ROOT_QUERY, {});
    void SplashScreen.hideAsync();

    return () => appRoot.dispose();
  }, [environment]);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
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

export default function RootLayout() {
  const { colors } = useOTheme();

  if (__DEV__) {
    verifyInstallation();
  }

  // TODO mock up a proper error boundary
  return (
    <ErrorBoundary
      fallback={
        <View className="flex-1 items-center justify-center bg-indigo text-ivory">
          <OnexIcon width={100} height={100} fill={colors.ivory.DEFAULT} />
          <View className="mt-lg flex flex-col items-center gap-sm">
            <OText className="text-6xl font-bold text-ivory dark:text-black">
              Uh oh!
            </OText>
            <OText className="text-ivory dark:text-black">
              There's been a critical problem. We're working on it!
            </OText>
          </View>
        </View>
      }
    >
      <AppContent />
    </ErrorBoundary>
  );
}
