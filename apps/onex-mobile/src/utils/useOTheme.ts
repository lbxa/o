import tailwind from "@o/tailwind/base";
import { useMemo } from "react";
import { useColorScheme } from "react-native";

const BUILT_IN_COLORS = tailwind.theme.colors;
const COLORS = tailwind.theme.extend.colors;

export const useOTheme = (): {
  isDark: boolean;
  colors: typeof COLORS;
  builtInColors: typeof BUILT_IN_COLORS;
} => {
  const colorScheme = useColorScheme();

  return useMemo(
    () => ({
      isDark: colorScheme === "dark",
      colors: COLORS,
      builtInColors: BUILT_IN_COLORS,
    }),
    [colorScheme]
  );
};
