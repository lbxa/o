import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

export const OBackdrop = ({
  animatedIndex,
  style,
}: BottomSheetBackdropProps) => {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    // Use -1 to 0 for the closing animation, and 0 to 1 for opening
    return {
      opacity: interpolate(
        animatedIndex.value,
        [-1, 0, 1],
        [0, 0.6, 0.6],
        Extrapolate.CLAMP
      ),
    };
  });

  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "#000000",
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );

  return <Animated.View style={containerStyle} />;
};
