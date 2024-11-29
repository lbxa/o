import Beach from "@assets/images/beach.svg";
import React, { useCallback, useTransition } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import { graphql, usePaginationFragment, usePreloadedQuery } from "react-relay";

import type { CommunityList_viewer$key } from "@/__generated__/CommunityList_viewer.graphql";
import type { CommunityListPaginationQuery } from "@/__generated__/CommunityListPaginationQuery.graphql";
import type { CommunityListQuery } from "@/__generated__/CommunityListQuery.graphql";
import { OButton } from "@/universe/atoms";
import { CommunityCard } from "@/universe/molecules";

import { ViewerCommunityInvitationList } from "./CommunityInvitation";

export const COMMUNITY_LIST_QUERY = graphql`
  query CommunityListQuery {
    viewer {
      id
      ...CommunityList_viewer @arguments(count: 10)
      ...ViewerCommunityInvitationList_viewer @arguments(count: 5)
    }
  }
`;

interface CommunityListProps {
  queryRef: PreloadedQuery<CommunityListQuery>;
}

export const CommunityList = ({ queryRef }: CommunityListProps) => {
  const query = usePreloadedQuery(COMMUNITY_LIST_QUERY, queryRef);

  const [isPending, startTransition] = useTransition();

  const { data, loadNext, hasNext, isLoadingNext, refetch } =
    usePaginationFragment<
      CommunityListPaginationQuery,
      CommunityList_viewer$key
    >(
      graphql`
        fragment CommunityList_viewer on Viewer
        @refetchable(queryName: "CommunityListPaginationQuery")
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String" }
        ) {
          id
          communities(first: $count, after: $cursor)
            @connection(key: "CommunityList_viewer_communities") {
            pageInfo {
              startCursor
              endCursor
              hasNextPage
            }
            edges {
              cursor
              node {
                ...CommunityCard_community
              }
            }
          }
        }
      `,
      query.viewer
    );

  const handleRefresh = useCallback(() => {
    startTransition(() => {
      refetch({}, { fetchPolicy: "store-and-network" });
    });
  }, [refetch]);

  return (
    <FlatList
      className="px-sm min-h-full"
      data={data?.communities.edges?.map((edge) => edge.node)}
      renderItem={({ item }) => <CommunityCard community={item} />}
      ListHeaderComponent={
        <View>
          {query.viewer && (
            <ViewerCommunityInvitationList fragmentRef={query.viewer} />
          )}
        </View>
      }
      ListEmptyComponent={
        <View className="gap-md pt-md flex flex-col">
          <View className="mx-auto">
            <Beach width={150} height={150} />
          </View>
          <Text className="text-center">Looking a little quiet here</Text>
        </View>
      }
      ListFooterComponent={
        <View className="pb-md">
          {hasNext && (
            <OButton
              title={isLoadingNext ? "Loading..." : "Load more"}
              disabled={!hasNext}
              onPress={() => loadNext(10)}
            />
          )}
        </View>
      }
      refreshControl={
        <RefreshControl refreshing={isPending} onRefresh={handleRefresh} />
      }
    />
  );
};
