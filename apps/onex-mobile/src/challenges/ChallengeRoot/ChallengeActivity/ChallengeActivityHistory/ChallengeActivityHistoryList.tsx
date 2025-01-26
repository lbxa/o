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

import type { ChallengeActivityHistoryList_challenge$key } from "@/__generated__/ChallengeActivityHistoryList_challenge.graphql";
import type { ChallengeActivityHistoryListPaginationQuery } from "@/__generated__/ChallengeActivityHistoryListPaginationQuery.graphql";
import type { ChallengeActivityHistoryListQuery } from "@/__generated__/ChallengeActivityHistoryListQuery.graphql";
import { TopResultCard } from "@/challenges/ChallengeRoot/ChallengeActivity/ChallengeActivityStats/TopResultCard/TopResultCard";
import { useNoSuspenseRefetch } from "@/relay";
import { Caption } from "@/universe/atoms/Caption";

export const CHALLENGE_ACTIVITY_HISTORY_LIST_QUERY = graphql`
  query ChallengeActivityHistoryListQuery($challengeId: ID!, $userId: ID!) {
    viewer {
      user {
        id
      }
      challenge(challengeId: $challengeId) {
        id
        ...ChallengeActivityHistoryList_challenge @arguments(userId: $userId)
      }
    }
  }
`;

interface ChallengeActivityHistoryListProps {
  queryRef: PreloadedQuery<ChallengeActivityHistoryListQuery>;
}

export const ChallengeActivityHistoryList = ({
  queryRef,
}: ChallengeActivityHistoryListProps) => {
  const query = usePreloadedQuery<ChallengeActivityHistoryListQuery>(
    CHALLENGE_ACTIVITY_HISTORY_LIST_QUERY,
    queryRef
  );

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    ChallengeActivityHistoryListPaginationQuery,
    ChallengeActivityHistoryList_challenge$key
  >(
    graphql`
      fragment ChallengeActivityHistoryList_challenge on Challenge
      @refetchable(queryName: "ChallengeActivityHistoryListPaginationQuery")
      @argumentDefinitions(
        userId: { type: "ID!" }
        count: { type: "Int", defaultValue: 10 }
        cursor: { type: "String" }
      ) {
        resultsHistory(userId: $userId, first: $count, after: $cursor)
          @connection(
            key: "ChallengeActivityHistoryList_challenge_resultsHistory"
          ) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...TopResultCard_challenge
            }
          }
        }
      }
    `,
    query.viewer?.challenge
  );

  const { refetch: refetchTopResults, isRefetching: isRefetchingTopResults } =
    useNoSuspenseRefetch({
      ancestorQuery: CHALLENGE_ACTIVITY_HISTORY_LIST_QUERY,
      ancestorVariables: {
        challengeId: query.viewer?.challenge?.id,
        userId: query.viewer?.user?.id,
      },
    });

  return (
    <FlatList
      className="px-md min-h-full"
      data={data?.resultsHistory?.edges?.map((edge) => edge.node)}
      renderItem={({ item }) => <TopResultCard result={item} />}
      ListEmptyComponent={
        <View className="gap-md pt-md flex flex-col">
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
