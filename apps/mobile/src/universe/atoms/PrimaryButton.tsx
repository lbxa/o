import { TouchableOpacity, Text } from "react-native";

interface Props {
  title: string;
}

export const PrimaryButton = ({ title }: Props) => {
  return (
    <TouchableOpacity className="bg-blue-200 rounded-md py-sm">
      <Text className="color-blue-800 text-center font-bold">{title}</Text>
    </TouchableOpacity>
  );
};