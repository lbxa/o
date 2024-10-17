import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface CustomBackdropProps extends BottomSheetBackdropProps {
  snapPoints?: (number | string)[]; // Accept snap points as a prop
}

export const BottomSheetBackdrop = ({
  animatedIndex,
  style,
  snapPoints,
}: CustomBackdropProps) => {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    // Determine the opacity range based on the snap points
    const snapPointLength = snapPoints?.length ?? 1;
    const inputRange = [0, snapPointLength - 1];
    const outputRange = [0.6, 0]; // Opacity fades from 0.6 to 0

    return {
      opacity: interpolate(
        animatedIndex.value,
        inputRange,
        outputRange,
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
