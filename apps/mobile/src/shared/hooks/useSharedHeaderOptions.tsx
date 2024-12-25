import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { useMemo } from "react";

import { useOTheme } from "@/utils";

/**
 * This settings should be shared across all stack headers
 */
export const useSharedHeaderOptions = (): {
  customTitleOptions: NativeStackNavigationOptions;
  builtInTitleOptions: NativeStackNavigationOptions;
  headerSearchBarOptions: NativeStackNavigationOptions["headerSearchBarOptions"];
} => {
  const { isDark, colors } = useOTheme();

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
        headerTintColor: isDark ? colors.ivory.DEFAULT : "black",
        headerBackTitleStyle: {
          fontSize: 20,
        },
      }) as const,
    [colors.ivory.DEFAULT, isDark]
  );

  const headerSearchBarOptions: NativeStackNavigationOptions["headerSearchBarOptions"] =
    useMemo(
      () => ({
        autoFocus: true,
        headerIconColor: isDark ? colors.ivory.DEFAULT : "black",
        inputType: "text",
      }),
      [colors.ivory.DEFAULT, isDark]
    );

  return {
    customTitleOptions,
    builtInTitleOptions,
    headerSearchBarOptions,
  };
};
