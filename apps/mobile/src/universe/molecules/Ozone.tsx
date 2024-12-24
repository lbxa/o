import type { PropsWithChildren, ReactNode } from "react";
import React, { forwardRef } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  children: ReactNode | undefined;
}

export const Ozone = forwardRef<View, PropsWithChildren<Props>>(
  ({ children }, ref) => {
    return (
      <SafeAreaView
        edges={["bottom", "left", "right"]}
        className="bg-white dark:bg-black"
        ref={ref}
      >
        <View className="min-h-full">{children}</View>
      </SafeAreaView>
    );
  }
);
