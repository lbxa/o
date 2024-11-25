import type { PropsWithChildren, ReactNode } from "react";
import React, { forwardRef } from "react";
import { SafeAreaView, View } from "react-native";

interface Props {
  children: ReactNode | undefined;
}

export const Ozone = forwardRef<SafeAreaView, PropsWithChildren<Props>>(
  ({ children }, ref) => {
    return (
      <SafeAreaView className="bg-white" ref={ref}>
        <View className="h-full">{children}</View>
      </SafeAreaView>
    );
  }
);
