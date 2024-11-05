import ChevronLeftIcon from "@assets/icons/chevron-left.svg";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import { useFragment, usePreloadedQuery } from "react-relay";

import { OTouchable } from "@/universe/atoms";

import type { ChallengeDetailsQuery } from "../../__generated__/ChallengeDetailsQuery.graphql";
import type { ChallengeFragment$key } from "../../__generated__/ChallengeFragment.graphql";
import type { ChallengeRootQuery } from "../../__generated__/ChallengeRootQuery.graphql";
import { CHALLENGE_FRAGMENT } from "../ChallengeFragment";
import { CHALLENGE_DETAILS_QUERY } from "./ChallengeDetails";

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
      <Text className="text-3xl font-bold">{challenge.name}</Text>
    </View>
  );
};
