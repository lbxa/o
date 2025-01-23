/* eslint-disable @stylistic/js/max-len */
import { useMemo } from "react";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";

import type { useChallengeActivityTop3ResultsFragment_challenge$key } from "@/__generated__/useChallengeActivityTop3ResultsFragment_challenge.graphql";

export const useChallengeActivityTop3Results = (
  fragmentRef:
    | useChallengeActivityTop3ResultsFragment_challenge$key
    | null
    | undefined
) => {
  const data =
    useFragment<useChallengeActivityTop3ResultsFragment_challenge$key>(
      graphql`
        fragment useChallengeActivityTop3ResultsFragment_challenge on Challenge {
          activityTopResults(first: 4)
            @connection(
              key: "ChallengeActivityTop3ResultsFragment_activityTopResults"
            ) {
            edges {
              cursor
              node {
                id
                ...TopResultCard_challenge
              }
            }
          }
        }
      `,
      fragmentRef
    );

  return useMemo(() => ({ data }), [data]);
};
