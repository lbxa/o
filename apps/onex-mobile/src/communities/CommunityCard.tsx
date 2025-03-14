import VerifiedBadgeIcon from "@assets/icons/verified-badge.svg";
import { useRouter } from "expo-router";
import { memo } from "react";
import { Image, Text, useColorScheme, View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { CommunityCard_community$key } from "@/__generated__/CommunityCard_community.graphql";
import { SocialGallery } from "@/shared";
import { useZustStore } from "@/state";

import { OTouchable } from "../universe/atoms";

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
        imageUrl(size: LARGE)
        ...SocialGallery
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
      <View className="mb-md bg-ivory pb-sm dark:bg-surface-dark rounded-3xl">
        {communityFragment.imageUrl && (
          <View className="flex h-[200px] w-full rounded-t-3xl bg-gray-300 dark:bg-white/20">
            <Image
              source={{ uri: communityFragment.imageUrl }}
              className="size-full rounded-t-3xl"
            />
            {/* <View className="m-auto"> */}
            {/* <CameraIcon width={40} height={40} fill="gray" /> */}
            {/* </View> */}
          </View>
        )}
        <View className="px-3">
          <Text className="my-sm dark:text-ivory text-3xl font-bold text-black">
            {communityFragment.name}{" "}
            {communityFragment.isVerified && (
              <VerifiedBadgeIcon
                width={20}
                height={20}
                fill={colorScheme === "dark" ? "#edf4f8" : "#5955eb"}
              />
            )}
          </Text>
          <SocialGallery fragmentRef={communityFragment} type="community" />
        </View>
      </View>
    </OTouchable>
  );
};

export const CommunityCard = memo(CommunityCardComponent);
