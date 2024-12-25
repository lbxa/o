import { Stack } from "expo-router";
import React from "react";
import type { PreloadedQuery } from "react-relay";
import { graphql, usePreloadedQuery } from "react-relay";

import type { ChallengeRootQuery } from "@/__generated__/ChallengeRootQuery.graphql";
import { MiniNav, Ozone } from "@/universe/molecules";

import { useSharedHeaderOptions } from "../../shared";
import { ChallengeActivity } from "./ChallengeActivity";
import { ChallengeHeader } from "./ChallengeHeader";

export const CHALLENGE_ROOT_QUERY = graphql`
  query ChallengeRootQuery($challengeId: ID!) {
    viewer {
      challenge(challengeId: $challengeId) {
        ...ChallengeHeader_challenge
        ...ChallengeDetails_challenge
        ...ChallengeActivityPills_challenge
        ...ChallengeActivityTopResultsFragment_challenge
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
  const sharedHeaderOptions = useSharedHeaderOptions();
  return (
    <Ozone>
      <Stack.Screen
        options={{
          ...sharedHeaderOptions,
          headerLeft: () =>
            challengeRoot.viewer?.challenge && (
              <ChallengeHeader fragmentRef={challengeRoot.viewer.challenge} />
            ),
          headerRight: () => (
            <MiniNav
              items={["manage"]}
              itemConfigs={{
                manage: {
                  href: `/(root)/community/challenge/challenge-manage`,
                },
              }}
            />
          ),
        }}
      />
      <ChallengeActivity
        challengeId={challengeId}
        challengeRoot={challengeRoot}
      />
    </Ozone>
  );
};
