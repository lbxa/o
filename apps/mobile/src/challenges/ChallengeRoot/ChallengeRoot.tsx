import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useQueryLoader } from "react-relay";

import { MiniNav, Ozone } from "@/universe/molecules";

import type { ChallengeDetailsQuery } from "../../__generated__/ChallengeDetailsQuery.graphql";
import { TimerLogger } from "../ChallengeLogger";
import { CHALLENGE_DETAILS_QUERY, ChallengeDetails } from "./ChallengeDetails";
import { ChallengeHeader } from "./ChallengeHeader";

interface ChallengeRootProps {
  challengeId: string;
}
export const ChallengeRoot = ({ challengeId }: ChallengeRootProps) => {
  const [queryRef, loadQuery, disposeQuery] =
    useQueryLoader<ChallengeDetailsQuery>(CHALLENGE_DETAILS_QUERY);

  useEffect(() => {
    loadQuery({ id: challengeId });
    return () => disposeQuery();
  }, [challengeId, loadQuery, disposeQuery]);

  return (
    <Ozone>
      <Stack.Screen
        options={{
          headerLeft: () => queryRef && <ChallengeHeader queryRef={queryRef} />,
          headerRight: () => <MiniNav items={["message"]} />,
        }}
      />
      <TimerLogger />
      <View className="px-md">
        {queryRef && <ChallengeDetails queryRef={queryRef} />}
        <Text className="mb-md text-2xl font-bold">Top Movers</Text>
        <Text className="mb-md text-2xl font-bold">Top Results</Text>
      </View>
    </Ozone>
  );
};
