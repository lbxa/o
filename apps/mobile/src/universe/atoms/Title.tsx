import type { PropsWithChildren } from "react";
import { Text } from "react-native";

export const Title: React.FC<PropsWithChildren> = ({ children }) => {
  return <Text className="mb-md text-3xl font-bold">{children}</Text>;
};
