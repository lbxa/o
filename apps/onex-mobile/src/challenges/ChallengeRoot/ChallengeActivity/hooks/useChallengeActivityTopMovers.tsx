import { useMemo } from "react";
import { usePaginationFragment } from "react-relay";
import { graphql } from "relay-runtime";

import type { useChallengeActivityTopMoversFragment_challenge$key } from "@/__generated__/useChallengeActivityTopMoversFragment_challenge.graphql";
import type { useChallengeActivityTopMoversPaginationQuery } from "@/__generated__/useChallengeActivityTopMoversPaginationQuery.graphql";

export const useChallengeActivityTopMovers = (
  fragmentRef:
    | useChallengeActivityTopMoversFragment_challenge$key
    | null
    | undefined
) => {
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    useChallengeActivityTopMoversPaginationQuery,
    useChallengeActivityTopMoversFragment_challenge$key
  >(
    graphql`
      fragment useChallengeActivityTopMoversFragment_challenge on Challenge
      @refetchable(queryName: "useChallengeActivityTopMoversPaginationQuery")
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 4 }
        cursor: { type: "String" }
      ) {
        activityTopMovers(first: $count, after: $cursor)
          @connection(
            key: "ChallengeActivityTopMoversFragment_activityTopMovers"
          ) {
          edges {
            cursor
            node {
              id
              ...TopMoverCard_challenge
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
