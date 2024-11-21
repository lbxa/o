import CameraIcon from "@assets/icons/camera.svg";
import VerifiedBadgeIcon from "@assets/icons/verified-badge.svg";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { CommunityCardFragment$key } from "@/__generated__/CommunityCardFragment.graphql";
import { useZustStore } from "@/state";

import { OTouchable } from "../atoms";

interface Props {
  community: CommunityCardFragment$key;
  onPress?: () => void;
}

export const CommunityCard = ({ community }: Props) => {
  const router = useRouter();
  const { setSelectedCommunity } = useZustStore();
  const communityFragment = useFragment(
    graphql`
      fragment CommunityCardFragment on Community {
        id
        name
        isVerified
      }
    `,
    community
  );

  const onPress = () => {
    router.push(`/(app)/community/${communityFragment.id}`);
    setSelectedCommunity(communityFragment);
  };

  return (
    <OTouchable onPress={onPress}>
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
    </OTouchable>
  );
};
