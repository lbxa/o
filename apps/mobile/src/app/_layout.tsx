import "../global.css";
import "expo-dev-client";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { verifyInstallation } from "nativewind";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { RelayEnvironment } from "@/relay";
import { ViewerProvider } from "@/users/Viewer";

export default function Root() {
  verifyInstallation();

  return (
    <RelayEnvironment>
      <GestureHandlerRootView>
        <ThemeProvider value={DefaultTheme}>
          <SafeAreaProvider>
            <BottomSheetModalProvider>
              <ViewerProvider>
                <Stack
                  screenOptions={{
                    headerShown: false,
                  }}
                >
                  <Stack.Screen name="(app)" />
                  <Stack.Screen name="(auth)" />
                </Stack>
              </ViewerProvider>
            </BottomSheetModalProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </RelayEnvironment>
  );
}
