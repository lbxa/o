import { Text } from "react-native";
export const Caption = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text className="text-center text-2xl font-bold text-black dark:text-ivory">
      {children}
    </Text>
  );
};
