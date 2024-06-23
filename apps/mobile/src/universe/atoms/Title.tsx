import { Text } from "react-native";

interface Props {
  title: string;
}

export const Title = ({ title }: Props) => {
  return <Text className="text-3xl font-black mb-md">{title}</Text>;
};
