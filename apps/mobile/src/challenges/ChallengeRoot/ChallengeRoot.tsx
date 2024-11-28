import { Stack } from "expo-router";
import React from "react";
import type { PreloadedQuery } from "react-relay";
import { graphql, usePreloadedQuery } from "react-relay";

import type { ChallengeRootQuery } from "@/__generated__/ChallengeRootQuery.graphql";
import { MiniNav, Ozone } from "@/universe/molecules";

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
          @arguments(challengeId: $challengeId, count: 10)
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

  return (
    <Ozone>
      <Stack.Screen
        options={{
          headerLeft: () =>
            challengeRoot.viewer?.challenge && (
              <ChallengeHeader fragmentRef={challengeRoot.viewer.challenge} />
            ),
          headerRight: () => <MiniNav items={["message"]} />,
        }}
      />
      <ChallengeActivity
        challengeId={challengeId}
        challengeRoot={challengeRoot}
      />
    </Ozone>
  );
};
