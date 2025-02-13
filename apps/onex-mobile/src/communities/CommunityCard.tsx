import CameraIcon from "@assets/icons/camera.svg";
import VerifiedBadgeIcon from "@assets/icons/verified-badge.svg";
import { useRouter } from "expo-router";
import { memo } from "react";
import { Text, useColorScheme, View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { CommunityCard_community$key } from "@/__generated__/CommunityCard_community.graphql";
import { useZustStore } from "@/state";

import { OTouchable } from "../universe/atoms";
import { CommunitySocials } from "./CommunitySocials";

interface Props {
  community: CommunityCard_community$key;
  onPress?: () => void;
}

const CommunityCardComponent = ({ community }: Props) => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { setSelectedCommunity } = useZustStore();
  const communityFragment = useFragment(
    graphql`
      fragment CommunityCard_community on Community {
        id
        name
        isVerified
        ...CommunitySocials_community
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
      <View className="mb-md rounded-3xl bg-ivory pb-md dark:bg-surface-dark">
        <View className="mb-sm flex h-[200px] w-full rounded-t-3xl bg-gray-300 dark:bg-white/20">
          <View className="m-auto">
            <CameraIcon width={40} height={40} fill="gray" />
          </View>
        </View>
        <View className="px-3">
          <Text className="mb-sm text-3xl font-bold text-black dark:text-ivory">
            {communityFragment.name}{" "}
            {communityFragment.isVerified && (
              <VerifiedBadgeIcon
                width={20}
                height={20}
                fill={colorScheme === "dark" ? "#edf4f8" : "#5955eb"}
              />
            )}
          </Text>
          <CommunitySocials fragmentRef={communityFragment} />
        </View>
      </View>
    </OTouchable>
  );
};

export const CommunityCard = memo(CommunityCardComponent);
