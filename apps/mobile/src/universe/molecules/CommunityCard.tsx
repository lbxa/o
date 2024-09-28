import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useFragment } from "react-relay";

import type { CommunityFragment$key } from "../../__generated__/CommunityFragment.graphql";
import { COMMUNITY_FRAGMENT } from "../../communities/CommunityFragment";
import { setActiveCommunity, useAppDispatch } from "../../state";
import { Title } from "../atoms";

interface Props {
  community: CommunityFragment$key;
  onPress?: () => void;
}

export const CommunityCard = ({ community }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const communityFragment = useFragment(COMMUNITY_FRAGMENT, community);

  const onPress = () => {
    router.push(`/(app)/community/${communityFragment.id}`);
    dispatch(setActiveCommunity(communityFragment));
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View className="mx-sm mb-md bg-ivory py-md rounded-xl">
        <View className="px-sm">
          <Title>{communityFragment.name}</Title>
          <Text>Subtitle</Text>
          <Text>body</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
