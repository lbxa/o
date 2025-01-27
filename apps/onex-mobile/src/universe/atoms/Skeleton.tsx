import React, { useEffect, useRef } from "react";
import type { ViewProps } from "react-native";
import { Animated } from "react-native";

type SkeletonProps = ViewProps;
export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.8,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      {...props}
      className={`bg-gray-300 ${className}`}
      style={{ opacity }}
    />
  );
};
