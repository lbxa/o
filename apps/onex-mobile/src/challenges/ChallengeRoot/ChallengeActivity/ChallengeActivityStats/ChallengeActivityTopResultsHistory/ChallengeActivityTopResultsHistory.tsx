/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @stylistic/js/max-len */
import Void from "@assets/images/void.svg";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import type { PreloadedQuery } from "react-relay";
import { usePaginationFragment, usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";

import type { ChallengeActivityTopResultsHistory_challenge$key } from "@/__generated__/ChallengeActivityTopResultsHistory_challenge.graphql";
import type { ChallengeActivityTopResultsHistoryPaginationQuery } from "@/__generated__/ChallengeActivityTopResultsHistoryPaginationQuery.graphql";
import type { ChallengeActivityTopResultsHistoryQuery } from "@/__generated__/ChallengeActivityTopResultsHistoryQuery.graphql";
import {
  ChallengeActivityHistoryCard,
  ChallengeActivityTopResultsHistoryUserDetails,
} from "@/challenges/ChallengeRoot";
import { useNoSuspenseRefetch } from "@/relay";
import { Caption } from "@/universe/atoms";

export const CHALLENGE_ACTIVITY_TOP_RESULTS_HISTORY_QUERY = graphql`
  query ChallengeActivityTopResultsHistoryQuery(
    $challengeId: ID!
    $userId: ID!
  ) {
    viewer {
      user {
        id
      }
      challenge(challengeId: $challengeId) {
        id
        ...ChallengeActivityTopResultsHistory_challenge
          @arguments(userId: $userId)
      }
    }
  }
`;

interface ChallengeActivityTopResultsHistoryProps {
  queryRef: PreloadedQuery<ChallengeActivityTopResultsHistoryQuery>;
}

export const ChallengeActivityTopResultsHistory = ({
  queryRef,
}: ChallengeActivityTopResultsHistoryProps) => {
  const query = usePreloadedQuery<ChallengeActivityTopResultsHistoryQuery>(
    CHALLENGE_ACTIVITY_TOP_RESULTS_HISTORY_QUERY,
    queryRef
  );

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    ChallengeActivityTopResultsHistoryPaginationQuery,
    ChallengeActivityTopResultsHistory_challenge$key
  >(
    graphql`
      fragment ChallengeActivityTopResultsHistory_challenge on Challenge
      @refetchable(
        queryName: "ChallengeActivityTopResultsHistoryPaginationQuery"
      )
      @argumentDefinitions(
        userId: { type: "ID!" }
        count: { type: "Int", defaultValue: 10 }
        cursor: { type: "String" }
      ) {
        resultsHistory(userId: $userId, first: $count, after: $cursor)
          @connection(
            key: "ChallengeActivityTopResultsHistory_challenge_resultsHistory"
          ) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...ChallengeActivityHistoryCard_challenge
              ...ChallengeActivityTopResultsHistoryUserDetails_challengeActivityResult
            }
          }
        }
      }
    `,
    query.viewer?.challenge
  );

  const { refetch: refetchTopResults, isRefetching: isRefetchingTopResults } =
    useNoSuspenseRefetch({
      ancestorQuery: CHALLENGE_ACTIVITY_TOP_RESULTS_HISTORY_QUERY,
      ancestorVariables: {
        challengeId: query.viewer?.challenge?.id,
        userId: query.viewer?.user?.id,
      },
    });

  return (
    <FlatList
      className="min-h-full px-md"
      data={data?.resultsHistory?.edges?.map((edge) => edge.node)}
      renderItem={({ item }) => <ChallengeActivityHistoryCard result={item} />}
      ListHeaderComponent={
        data?.resultsHistory?.edges?.length ? (
          <ChallengeActivityTopResultsHistoryUserDetails
            userHistory={data?.resultsHistory}
          />
        ) : null
      }
      ListEmptyComponent={
        <View className="flex flex-col gap-md pt-md">
          <View className="mx-auto">
            <Void width={150} height={150} />
          </View>
          <Caption>You have no activity history yet.</Caption>
        </View>
      }
      ListFooterComponent={
        isLoadingNext ? <ActivityIndicator size="large" /> : null
      }
      onEndReached={() => !isLoadingNext && hasNext && loadNext(10)}
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingTopResults}
          onRefresh={refetchTopResults}
        />
      }
    />
  );
};
