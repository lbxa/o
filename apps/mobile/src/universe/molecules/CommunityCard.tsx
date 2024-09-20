import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useFragment } from "react-relay";

import type { CommunityFragment$key } from "../../__generated__/CommunityFragment.graphql";
import { COMMUNITY_FRAGMENT } from "../../communities/CommunityFragment";
import { Title } from "../atoms";

interface Props {
  community: CommunityFragment$key;
  onPress?: () => void;
}

export const CommunityCard = ({ community }: Props) => {
  const router = useRouter();
  const { id, name } = useFragment(COMMUNITY_FRAGMENT, community);

  const onPress = () => {
    router.push(`/(app)/community/${id}`);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View className="mx-sm mb-md bg-ivory py-md rounded-xl">
        <View className="px-sm">
          <Title>{name}</Title>
          <Text>Subtitle</Text>
          <Text>body</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
