import ChevronLeftIcon from "@assets/icons/chevron-left.svg";
import { Touchable } from "@universe/atoms";
import { MiniNav, Ozone } from "@universe/molecules";
import { router, Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { useLazyLoadQuery } from "react-relay";

import type { ChallengeDetailsQuery } from "../../__generated__/ChallengeDetailsQuery.graphql";
import { CHALLENGE_DETAILS_QUERY, ChallengeDetails } from "./ChallengeDetails";

interface ChallengeRootProps {
  challengeId: string;
}
export const ChallengeRoot = ({ challengeId }: ChallengeRootProps) => {
  const query = useLazyLoadQuery<ChallengeDetailsQuery>(
    CHALLENGE_DETAILS_QUERY,
    { id: challengeId },
    { fetchPolicy: "store-and-network" }
  );

  return (
    <Ozone>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <View className="flex flex-row items-center gap-sm">
              <Touchable onPress={() => router.back()}>
                <ChevronLeftIcon />
              </Touchable>
              <Text className="text-3xl font-bold">
                {query.challenge?.name}
              </Text>
            </View>
          ),
          headerRight: () => <MiniNav items={["message"]} />,
        }}
      />
      <View className="px-md">
        <ChallengeDetails challengeId={challengeId} />
        <Text className="mb-md text-2xl font-bold">Top Movers</Text>
        <Text className="mb-md text-2xl font-bold">Top Results</Text>
      </View>
    </Ozone>
  );
};
