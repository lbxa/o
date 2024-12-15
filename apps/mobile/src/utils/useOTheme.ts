import { useMemo } from "react";
import { useColorScheme } from "react-native";

export const useOTheme = (): { isDark: boolean } => {
  const colorScheme = useColorScheme();

  return useMemo(
    () => ({
      isDark: colorScheme === "dark",
    }),
    [colorScheme]
  );
};
