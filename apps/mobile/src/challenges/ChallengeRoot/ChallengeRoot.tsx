import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useQueryLoader } from "react-relay";

import { MiniNav, Ozone } from "@/universe/molecules";

import type { ChallengeDetailsQuery } from "../../__generated__/ChallengeDetailsQuery.graphql";
import type { ChallengeTopMoversQuery } from "../../__generated__/ChallengeTopMoversQuery.graphql";
import { CHALLENGE_DETAILS_QUERY, ChallengeDetails } from "./ChallengeDetails";
import { ChallengeHeader } from "./ChallengeHeader";
import {
  CHALLENGE_TOP_MOVERS_QUERY,
  ChallengeTopMovers,
} from "./ChallengeTopMovers";

interface ChallengeRootProps {
  challengeId: string;
}
export const ChallengeRoot = ({ challengeId }: ChallengeRootProps) => {
  const [detailsQueryRef, loadDetailsQuery, disposeDetailsQuery] =
    useQueryLoader<ChallengeDetailsQuery>(CHALLENGE_DETAILS_QUERY);

  const [topMoversQueryRef, loadTopMoversQuery, disposeTopMoversQuery] =
    useQueryLoader<ChallengeTopMoversQuery>(CHALLENGE_TOP_MOVERS_QUERY);

  useEffect(() => {
    loadDetailsQuery({ id: challengeId });
    loadTopMoversQuery({ challengeId });
    return () => {
      disposeDetailsQuery();
      disposeTopMoversQuery();
    };
  }, [
    challengeId,
    loadDetailsQuery,
    loadTopMoversQuery,
    disposeDetailsQuery,
    disposeTopMoversQuery,
  ]);

  return (
    <Ozone>
      <Stack.Screen
        options={{
          headerLeft: () =>
            detailsQueryRef && <ChallengeHeader queryRef={detailsQueryRef} />,
          headerRight: () => <MiniNav items={["message"]} />,
        }}
      />
      <View className="px-md">
        {detailsQueryRef && <ChallengeDetails queryRef={detailsQueryRef} />}
        {topMoversQueryRef && (
          <ChallengeTopMovers queryRef={topMoversQueryRef} />
        )}
        <Text className="mb-md text-2xl font-bold">Top Results</Text>
      </View>
    </Ozone>
  );
};
