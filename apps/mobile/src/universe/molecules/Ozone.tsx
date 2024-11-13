import type { PropsWithChildren, ReactNode } from "react";
import { SafeAreaView, View } from "react-native";

interface Props {
  children: ReactNode | undefined;
}

export const Ozone: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <SafeAreaView className="bg-white">
      <View className="h-full">{children}</View>
    </SafeAreaView>
  );
};
