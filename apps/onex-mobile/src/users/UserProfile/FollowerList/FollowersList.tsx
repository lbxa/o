import Void from "@assets/images/void.svg";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import type { PreloadedQuery } from "react-relay";
import { usePaginationFragment } from "react-relay";
import { usePreloadedQuery } from "react-relay";
import { graphql } from "react-relay";

import type { FollowersList_user$key } from "@/__generated__/FollowersList_user.graphql";
import type { FollowersListPaginationQuery } from "@/__generated__/FollowersListPaginationQuery.graphql";
import type { FollowersListQuery } from "@/__generated__/FollowersListQuery.graphql";
import { useNoSuspenseRefetch } from "@/relay";
import { Caption } from "@/universe/atoms";
import { UserProfileRow } from "@/users/UserProfile";

export const FOLLOWERS_LIST_QUERY = graphql`
  query FollowersListQuery {
    viewer {
      id
      user {
        ...FollowersList_user @arguments(count: 10)
      }
    }
  }
`;

interface FollowersListProps {
  queryRef: PreloadedQuery<FollowersListQuery>;
}

export const FollowersList = ({ queryRef }: FollowersListProps) => {
  const query = usePreloadedQuery<FollowersListQuery>(
    FOLLOWERS_LIST_QUERY,
    queryRef
  );

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    FollowersListPaginationQuery,
    FollowersList_user$key
  >(
    graphql`
      fragment FollowersList_user on User
      @refetchable(queryName: "FollowersListPaginationQuery")
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 10 }
        cursor: { type: "String" }
      ) {
        id
        followers(first: $count, after: $cursor)
          @connection(key: "FollowersList_user_followers") {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...UserProfileRow_user
            }
          }
        }
      }
    `,
    query.viewer?.user
  );

  const { refetch: refetchTopResults, isRefetching: isRefetchingTopResults } =
    useNoSuspenseRefetch({
      ancestorQuery: FOLLOWERS_LIST_QUERY,
      ancestorVariables: {},
    });

  return (
    <FlatList
      className="px-md min-h-full"
      data={data?.followers?.edges?.map((edge) => edge.node)}
      renderItem={({ item }) => <UserProfileRow user={item} />}
      ListEmptyComponent={
        <View className="gap-md pt-md flex flex-col">
          <View className="mx-auto">
            <Void width={150} height={150} />
          </View>
          <Caption>You have no followers yet.</Caption>
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
