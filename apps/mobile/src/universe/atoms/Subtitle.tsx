import { Text } from "react-native";

interface Props {
  title: string;
}

export const Subtitle = ({ title }: Props) => {
  return <Text className="text-xl font-bold mb-sm">{title}</Text>;
};
