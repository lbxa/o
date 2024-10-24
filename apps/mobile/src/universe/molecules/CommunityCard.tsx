import CameraIcon from "@assets/icons/camera.svg";
import VerifiedBadgeIcon from "@assets/icons/verified-badge.svg";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useFragment } from "react-relay";

import { COMMUNITY_FRAGMENT } from "@/communities/CommunityFragment";
import { useZustStore } from "@/state";

import type { CommunityFragment$key } from "../../__generated__/CommunityFragment.graphql";

interface Props {
  community: CommunityFragment$key;
  onPress?: () => void;
}

export const CommunityCard = ({ community }: Props) => {
  const router = useRouter();
  const { setSelectedCommunity } = useZustStore();
  const communityFragment = useFragment(COMMUNITY_FRAGMENT, community);

  const onPress = () => {
    router.push(`/(app)/community/${communityFragment.id}`);
    setSelectedCommunity(communityFragment);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View className="mb-md bg-ivory pb-md rounded-xl">
        <View className="mb-sm flex h-[200px] w-full rounded-t-xl bg-gray-300">
          <View className="m-auto">
            <CameraIcon width={40} height={40} fill="gray" />
          </View>
        </View>
        <View className="px-sm">
          <View className="gap-sm pb-sm flex flex-row items-center">
            <Text className="text-3xl font-bold">{communityFragment.name}</Text>
            {communityFragment.isVerified && <VerifiedBadgeIcon width={20} />}
          </View>
          <Text>Social summary will go here</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
