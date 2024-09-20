import { Text } from "react-native";

interface Props {
  title: string;
}

export const Subtitle = ({ title }: Props) => {
  return <Text className="mb-sm text-xl font-bold">{title}</Text>;
};
