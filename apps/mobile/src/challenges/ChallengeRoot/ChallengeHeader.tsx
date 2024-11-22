import ChevronLeftIcon from "@assets/icons/chevron-left.svg";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { useFragment } from "react-relay";

import { OTouchable } from "@/universe/atoms";

import type { ChallengeFragment$key } from "../../__generated__/ChallengeFragment.graphql";
import { CHALLENGE_FRAGMENT } from "../ChallengeFragment";

export const ChallengeHeader: React.FC<{
  fragmentRef: ChallengeFragment$key;
}> = ({ fragmentRef }) => {
  // const query = usePreloadedQuery<ChallengeRootQuery>(
  //   CHALLENGE_DETAILS_QUERY,
  //   queryRef
  // );

  const challenge = useFragment<ChallengeFragment$key>(
    CHALLENGE_FRAGMENT,
    fragmentRef
  );

  return (
    <View className="flex flex-row items-center gap-sm">
      <OTouchable onPress={() => router.back()}>
        <ChevronLeftIcon />
      </OTouchable>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        className="flex-1 text-3xl font-bold"
      >
        {challenge.name}
      </Text>
    </View>
  );
};
