import { useMemo } from "react";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";

import type { useChallengeActivityTop3MoversFragment_challenge$key } from "@/__generated__/useChallengeActivityTop3MoversFragment_challenge.graphql";

export const useChallengeActivityTop3Movers = (
  fragmentRef:
    | useChallengeActivityTop3MoversFragment_challenge$key
    | null
    | undefined
) => {
  const data =
    useFragment<useChallengeActivityTop3MoversFragment_challenge$key>(
      graphql`
        fragment useChallengeActivityTop3MoversFragment_challenge on Challenge {
          activityTopMovers(first: 4)
            @connection(
              key: "ChallengeActivityTop3MoversFragment_activityTopMovers"
            ) {
            edges {
              cursor
              node {
                id
                ...TopMoverCard_challenge
              }
            }
          }
        }
      `,
      fragmentRef
    );

  return useMemo(() => ({ data }), [data]);
};
