import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useFragment } from "react-relay";

import type { CommunityFragment$key } from "../__generated__/CommunityFragment.graphql";
import { Subtitle } from "../universe/atoms";
import { COMMUNITY_FRAGMENT } from ".";

interface Props {
  community: CommunityFragment$key;
  onPress?: () => void;
}

export const CommunityCard = ({ community }: Props) => {
  const router = useRouter();
  const { id, name } = useFragment(COMMUNITY_FRAGMENT, community);
  // const [_, loadQuery] = useQueryLoader<CommunitySearchQuery>(
  //   COMMUNITY_SEARCH_QUERY
  // );

  const onPress = () => {
    // loadQuery({ id: _id });
    router.push("/(app)/community/" + id);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View className="bg-white mb-md pb-md rounded-lg">
        <View className="w-full h-[100px] mb-md bg-gray-200"></View>
        <View className="px-sm">
          <Subtitle title={name} />
          <Text>"Subtitle"</Text>
          <Text>"body"</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
