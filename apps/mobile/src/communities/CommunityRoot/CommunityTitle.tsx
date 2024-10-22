import ChevronLeftIcon from "@assets/icons/chevron-left.svg";
import VerifiedBadgeIcon from "@assets/icons/verified-badge.svg";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { useFragment } from "react-relay";

import { Touchable } from "@/universe/atoms";

import type { CommunityFragment$key } from "../../__generated__/CommunityFragment.graphql";
import { COMMUNITY_FRAGMENT } from "../CommunityFragment";

interface CommunityTitleProps {
  community: CommunityFragment$key | undefined | null;
}

export const CommunityTitle: React.FC<CommunityTitleProps> = ({
  community,
}) => {
  const router = useRouter();
  const communityFragment = useFragment(COMMUNITY_FRAGMENT, community);

  return (
    <View className="gap-sm flex flex-row items-center">
      <Touchable onPress={() => router.back()}>
        <ChevronLeftIcon />
      </Touchable>
      <Text className="text-3xl font-bold">
        {communityFragment?.name ?? "Loading..."}
      </Text>
      {communityFragment?.isVerified && (
        <VerifiedBadgeIcon width={20} height={20} />
      )}
    </View>
  );
};
