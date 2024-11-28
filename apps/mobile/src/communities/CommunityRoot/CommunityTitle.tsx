import ChevronLeftIcon from "@assets/icons/chevron-left.svg";
import VerifiedBadgeIcon from "@assets/icons/verified-badge.svg";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { CommunityTitle_community$key } from "@/__generated__/CommunityTitle_community.graphql";
import { OTouchable } from "@/universe/atoms";

interface CommunityTitleProps {
  community: CommunityTitle_community$key | undefined | null;
}

export const CommunityTitle: React.FC<CommunityTitleProps> = ({
  community,
}) => {
  const router = useRouter();
  const communityFragment = useFragment<CommunityTitle_community$key>(
    graphql`
      fragment CommunityTitle_community on Community {
        id
        name
        isVerified
      }
    `,
    community
  );

  return (
    <View className="flex flex-row items-center gap-sm">
      <OTouchable onPress={() => router.back()}>
        <ChevronLeftIcon />
      </OTouchable>
      <Text className="text-3xl font-bold">
        {communityFragment?.name ?? "Loading..."}
      </Text>
      {communityFragment?.isVerified && (
        <VerifiedBadgeIcon width={20} height={20} />
      )}
    </View>
  );
};
