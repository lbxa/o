import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { useMemo } from "react";
import { useColorScheme } from "react-native";

/**
 * This settings should be shared across all stack headers
 */
export const useSharedHeaderOptions = (): NativeStackNavigationOptions => {
  const colorScheme = useColorScheme();

  const sharedHeaderOptions: NativeStackNavigationOptions = useMemo(
    () =>
      ({
        headerShown: true,
        headerTitle: () => "",
        headerShadowVisible: false,
        headerBackVisible: false,
        headerStyle: {
          backgroundColor: colorScheme === "dark" ? "#000000" : "#ffffff",
        },
      }) as const,
    [colorScheme]
  );

  return sharedHeaderOptions;
};
