import ChevronLeftIcon from "@assets/icons/chevron-left.svg";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import { useFragment, usePreloadedQuery } from "react-relay";

import { Touchable } from "@/universe/atoms";

import type { ChallengeDetailsQuery } from "../../__generated__/ChallengeDetailsQuery.graphql";
import type { ChallengeFragment$key } from "../../__generated__/ChallengeFragment.graphql";
import { CHALLENGE_FRAGMENT } from "../ChallengeFragment";
import { CHALLENGE_DETAILS_QUERY } from "./ChallengeDetails";

export const ChallengeHeader: React.FC<{
  queryRef: PreloadedQuery<ChallengeDetailsQuery>;
}> = ({ queryRef }) => {
  const query = usePreloadedQuery<ChallengeDetailsQuery>(
    CHALLENGE_DETAILS_QUERY,
    queryRef
  );

  const challenge = useFragment<ChallengeFragment$key>(
    CHALLENGE_FRAGMENT,
    query.challenge
  );

  return (
    <View className="flex flex-row items-center gap-sm">
      <Touchable onPress={() => router.back()}>
        <ChevronLeftIcon />
      </Touchable>
      <Text className="text-3xl font-bold">{challenge?.name}</Text>
    </View>
  );
};
