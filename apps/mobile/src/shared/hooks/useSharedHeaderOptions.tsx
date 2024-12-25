import tailwind from "@o/tailwind/base";
import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { useMemo } from "react";

import { useOTheme } from "@/utils";

const COLORS = tailwind.theme.extend.colors;

/**
 * This settings should be shared across all stack headers
 */
export const useSharedHeaderOptions = (): {
  customTitleOptions: NativeStackNavigationOptions;
  builtInTitleOptions: NativeStackNavigationOptions;
} => {
  const { isDark } = useOTheme();

  const customTitleOptions: NativeStackNavigationOptions = useMemo(
    () =>
      ({
        headerShown: true,
        headerTitle: () => "",
        headerShadowVisible: false,
        headerBackVisible: false,
        headerStyle: {
          backgroundColor: isDark ? "#000000" : "#ffffff",
        },
      }) as const,
    [isDark]
  );

  const builtInTitleOptions: NativeStackNavigationOptions = useMemo(
    () =>
      ({
        headerShown: true,
        headerTitle: () => "",
        headerShadowVisible: false,
        headerBackVisible: true,
        headerStyle: {
          backgroundColor: isDark ? "#000000" : "#ffffff",
        },
        headerBackTitle: "",
        headerTintColor: isDark ? COLORS.ivory.DEFAULT : "black",
        headerBackTitleStyle: {
          fontSize: 20,
        },
      }) as const,
    [isDark]
  );

  return {
    customTitleOptions,
    builtInTitleOptions,
  };
};
