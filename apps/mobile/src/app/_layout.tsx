import "../global.css";

import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";

import { RelayEnvironment } from "../relay";
import { store } from "../state";
import { ViewerProvider } from "../users/Viewer";
import { useAuth } from "../utils/useAuth";

export default function Root() {
  const { session } = useAuth();

  return (
    <RelayEnvironment>
      <ReduxProvider store={store}>
        <ThemeProvider value={DefaultTheme}>
          <SafeAreaProvider>
            {session ? (
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
      </ReduxProvider>
    </RelayEnvironment>
  );
}
