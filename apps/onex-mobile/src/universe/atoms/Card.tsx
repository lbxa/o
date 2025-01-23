import type { ReactNode } from "react";
import { View } from "react-native";

interface Props {
  children: ReactNode;
}

export const Card = ({ children }: Props) => {
  return <View className="mb-4 bg-white p-2">{children}</View>;
};
