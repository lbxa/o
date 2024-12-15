import { Text } from "react-native";
export const Caption = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text className="dark:text-ivory text-center text-2xl font-bold text-black">
      {children}
    </Text>
  );
};
