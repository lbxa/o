import { Ozone } from "@universe/molecules";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function CommunityPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <Ozone>
      <Text>{id}</Text>
      <Text>Community name {}</Text>
    </Ozone>
  );
}
