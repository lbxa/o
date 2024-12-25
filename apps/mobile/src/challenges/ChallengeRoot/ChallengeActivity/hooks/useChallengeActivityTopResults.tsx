import { useMemo } from "react";
import { usePaginationFragment } from "react-relay";
import { graphql } from "relay-runtime";

import type { useChallengeActivityTopResultsFragment_challenge$key } from "@/__generated__/useChallengeActivityTopResultsFragment_challenge.graphql";
import type { useChallengeActivityTopResultsPaginationQuery } from "@/__generated__/useChallengeActivityTopResultsPaginationQuery.graphql";

export const useChallengeActivityTopResults = (
  fragmentRef:
    | useChallengeActivityTopResultsFragment_challenge$key
    | null
    | undefined
) => {
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    useChallengeActivityTopResultsPaginationQuery,
    useChallengeActivityTopResultsFragment_challenge$key
  >(
    graphql`
      fragment useChallengeActivityTopResultsFragment_challenge on Challenge
      @refetchable(queryName: "useChallengeActivityTopResultsPaginationQuery")
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 4 }
        cursor: { type: "String" }
      ) {
        id
        activityTopResults(first: $count, after: $cursor)
          @connection(
            key: "ChallengeActivityTopResultsFragment_activityTopResults"
          ) {
          edges {
            cursor
            node {
              id
              ...UserResultCard_challenge
            }
          }
          pageInfo {
            hasNextPage
            startCursor
            endCursor
          }
        }
      }
    `,
    fragmentRef
  );

  return useMemo(
    () => ({ data, loadNext, hasNext, isLoadingNext }),
    [data, loadNext, hasNext, isLoadingNext]
  );
};
