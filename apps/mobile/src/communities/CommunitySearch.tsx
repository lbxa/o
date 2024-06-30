import { PrimaryButton, PrimaryTextInput, Title } from "@universe/atoms";
import { View } from "react-native";

export const CommunitySearch = () => {
  return (
    <View className="mb-md">
      <Title title="Search" />
      <PrimaryTextInput className="mb-md" placeholder="Community name" />
      <PrimaryButton title="Search" />
    </View>
  );
};
