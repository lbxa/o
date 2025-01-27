import type { BottomSheetModalProps } from "@gorhom/bottom-sheet";
import { useMemo } from "react";
import { useColorScheme } from "react-native";

import { OBackdrop } from "@/universe/molecules";

// const CHARCOAL = "#2a363e";
const CHARCOAL = "#1e1e1e";

export const useSharedBottomSheetProps = (): Pick<
  BottomSheetModalProps,
  "backgroundStyle" | "handleStyle" | "backdropComponent"
> => {
  const colorScheme = useColorScheme();
  return useMemo(
    () =>
      ({
        backdropComponent: (props) => <OBackdrop {...props} />,
        backgroundStyle: {
          backgroundColor: colorScheme === "dark" ? CHARCOAL : "#ffffff",
        },
        handleStyle: {
          backgroundColor: colorScheme === "dark" ? CHARCOAL : "#ffffff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        handleIndicatorStyle: {
          backgroundColor: colorScheme === "dark" ? "#edf4f8" : "#000000",
        },
      }) as const,
    [colorScheme]
  );
};
