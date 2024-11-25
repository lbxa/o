import CameraIcon from "@assets/icons/camera.svg";
import VerifiedBadgeIcon from "@assets/icons/verified-badge.svg";
import { useRouter } from "expo-router";
import { memo } from "react";
import { Text, View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { CommunityCard_community$key } from "@/__generated__/CommunityCard_community.graphql";
import { useZustStore } from "@/state";

import { OTouchable } from "../atoms";

interface Props {
  community: CommunityCard_community$key;
  onPress?: () => void;
}

const CommunityCardComponent = ({ community }: Props) => {
  const router = useRouter();
  const { setSelectedCommunity } = useZustStore();
  const communityFragment = useFragment(
    graphql`
      fragment CommunityCard_community on Community {
        id
        name
        isVerified
      }
    `,
    community
  );

  const onPress = () => {
    router.push(`/(root)/community/${communityFragment.id}`);
    setSelectedCommunity(communityFragment);
  };

  return (
    <OTouchable onPress={onPress}>
      <View className="mb-md rounded-xl bg-ivory pb-md">
        <View className="mb-sm flex h-[200px] w-full rounded-t-xl bg-gray-300">
          <View className="m-auto">
            <CameraIcon width={40} height={40} fill="gray" />
          </View>
        </View>
        <View className="px-sm">
          <View className="flex flex-row items-center gap-sm pb-sm">
            <Text className="text-3xl font-bold">{communityFragment.name}</Text>
            {communityFragment.isVerified && <VerifiedBadgeIcon width={20} />}
          </View>
          <Text>Social summary will go here</Text>
        </View>
      </View>
    </OTouchable>
  );
};

export const CommunityCard = memo(CommunityCardComponent);
