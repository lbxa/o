import { Stack } from "expo-router";
import React from "react";
import { RefreshControl, ScrollView } from "react-native";
import type { PreloadedQuery } from "react-relay";
import { graphql, useFragment, usePreloadedQuery } from "react-relay";

import type { ChallengeRootName_challenge$key } from "@/__generated__/ChallengeRootName_challenge.graphql";
import type { ChallengeRootQuery } from "@/__generated__/ChallengeRootQuery.graphql";
import { ChallengeDetails } from "@/challenges/ChallengeRoot/ChallengeDetails";
import { useNoSuspenseRefetch } from "@/relay";
import { MiniNav, Ozone } from "@/universe/molecules";

import { ChallengeActivityResults } from "./ChallengeActivity";

export const CHALLENGE_ROOT_QUERY = graphql`
  query ChallengeRootQuery($challengeId: ID!) {
    viewer {
      challenge(challengeId: $challengeId) {
        ...ChallengeRootName_challenge
        ...ChallengeDetails_challenge
        ...ChallengeActivityPills_challenge
        ...useChallengeActivityTop3MoversFragment_challenge
        ...useChallengeActivityTop3ResultsFragment_challenge
      }
    }
  }
`;

interface ChallengeRootProps {
  challengeId: string;
  queryRef: PreloadedQuery<ChallengeRootQuery>;
}
export const ChallengeRoot = ({
  challengeId,
  queryRef,
}: ChallengeRootProps) => {
  const challengeRoot = usePreloadedQuery<ChallengeRootQuery>(
    CHALLENGE_ROOT_QUERY,
    queryRef
  );

  const challenge = useFragment<ChallengeRootName_challenge$key>(
    graphql`
      fragment ChallengeRootName_challenge on Challenge {
        id
        name
      }
    `,
    challengeRoot.viewer?.challenge
  );

  const {
    refetch: refetchChallengeRoot,
    isRefetching: isRefetchingTopResults,
  } = useNoSuspenseRefetch({
    ancestorQuery: CHALLENGE_ROOT_QUERY,
    ancestorVariables: { challengeId },
  });

  return (
    <Ozone>
      <Stack.Screen
        options={{
          title: challenge?.name ?? "Challenge",
          headerRight: () => (
            <MiniNav
              items={["manage"]}
              itemConfigs={{
                manage: {
                  href: "/community/challenge/(challenge-manage)/challenge-manage",
                },
              }}
            />
          ),
        }}
      />
      <ScrollView
        className="flex-1 px-md"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingTopResults}
            onRefresh={refetchChallengeRoot}
          />
        }
      >
        {challengeRoot.viewer?.challenge && (
          <ChallengeDetails
            challengeFragmentRef={challengeRoot.viewer.challenge}
            challengeActivityPillsFragmentRef={challengeRoot.viewer.challenge}
          />
        )}
        <ChallengeActivityResults challengeRoot={challengeRoot} />
      </ScrollView>
    </Ozone>
  );
};
