import { Stack } from "expo-router";
import React from "react";
import type { PreloadedQuery } from "react-relay";
import { graphql, useFragment, usePreloadedQuery } from "react-relay";

import type { ChallengeRootName_challenge$key } from "@/__generated__/ChallengeRootName_challenge.graphql";
import type { ChallengeRootQuery } from "@/__generated__/ChallengeRootQuery.graphql";
import { MiniNav, Ozone } from "@/universe/molecules";

import { ChallengeActivity } from "./ChallengeActivity";

export const CHALLENGE_ROOT_QUERY = graphql`
  query ChallengeRootQuery($challengeId: ID!) {
    viewer {
      challenge(challengeId: $challengeId) {
        ...ChallengeRootName_challenge
        ...ChallengeDetails_challenge
        ...ChallengeActivityPills_challenge
        ...useChallengeActivityTopResultsFragment_challenge @arguments(count: 4)
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
      <ChallengeActivity
        challengeId={challengeId}
        challengeRoot={challengeRoot}
      />
    </Ozone>
  );
};
