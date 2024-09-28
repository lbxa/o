import "../global.css";

import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";

import { RelayEnvironment } from "../relay";
import { store } from "../state";
import { ViewerProvider } from "../users/Viewer";
import { useToken } from "../utils/useToken";

export default function Root() {
  const { token } = useToken();

  return (
    <RelayEnvironment>
      <ReduxProvider store={store}>
        <GestureHandlerRootView>
          <ThemeProvider value={DefaultTheme}>
            <SafeAreaProvider>
              {token ? (
                <ViewerProvider>
                  <Stack
                    screenOptions={{
                      headerShown: false,
                    }}
                  >
                    <Stack.Screen name="(app)" />
                  </Stack>
                </ViewerProvider>
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
        </GestureHandlerRootView>
      </ReduxProvider>
    </RelayEnvironment>
  );
}
