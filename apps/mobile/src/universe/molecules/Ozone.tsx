import type { PropsWithChildren, ReactNode } from "react";
import { SafeAreaView, ScrollView } from "react-native";

interface Props {
  children: ReactNode | undefined;
}

export const Ozone: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <SafeAreaView>
      <ScrollView className="h-full bg-white pt-md">{children}</ScrollView>
    </SafeAreaView>
  );
};
