import ChevronLeftIcon from "@assets/icons/chevron-left.svg";
import VerifiedBadgeIcon from "@assets/icons/verified-badge.svg";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { CommunityTitle_community$key } from "@/__generated__/CommunityTitle_community.graphql";
import { OTouchable } from "@/universe/atoms";

import { useSvgFill } from "../../utils";

interface CommunityTitleProps {
  community: CommunityTitle_community$key | undefined | null;
}

export const CommunityTitle: React.FC<CommunityTitleProps> = ({
  community,
}) => {
  const router = useRouter();
  const svgFill = useSvgFill();
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
    <View className="gap-sm mr-auto flex flex-row items-center">
      <OTouchable onPress={() => router.back()}>
        <ChevronLeftIcon fill={svgFill} />
      </OTouchable>
      <Text
        className="dark:text-ivory w-10/12 text-3xl font-bold text-black"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {communityFragment?.name ?? "Loading..."}
      </Text>
      {communityFragment?.isVerified && (
        <VerifiedBadgeIcon width={20} height={20} />
      )}
    </View>
  );
};
