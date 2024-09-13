import { Text } from "react-native";

interface Props {
  title: string;
}

export const Title = ({ title }: Props) => {
  return <Text className="mb-md text-3xl font-black">{title}</Text>;
};
