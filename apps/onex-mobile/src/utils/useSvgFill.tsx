import { useMemo } from "react";
import { useColorScheme } from "react-native";

/**
 * This settings should be shared across all stack headers
 */
export const useSvgFill = (): string => {
  const colorScheme = useColorScheme();

  return useMemo(
    () => (colorScheme === "dark" ? "#edf4f8" : "#000000"),
    [colorScheme]
  );
};
