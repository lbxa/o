import Beach from "@assets/images/beach.svg";
import React, { useCallback, useTransition } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import type { PreloadedQuery } from "react-relay";
import { graphql, usePaginationFragment, usePreloadedQuery } from "react-relay";

import type { CommunityList_viewer$key } from "@/__generated__/CommunityList_viewer.graphql";
import type { CommunityListPaginationQuery } from "@/__generated__/CommunityListPaginationQuery.graphql";
import type { CommunityListQuery } from "@/__generated__/CommunityListQuery.graphql";
import { CommunityCard } from "@/communities/CommunityCard";
import { Caption } from "@/universe/atoms";

import { CommunityInvitationList } from "../CommunityInvitation";
import { useCommunityInvitationsPagination } from "../CommunityInvitation/queries";

export const COMMUNITY_LIST_QUERY = graphql`
  query CommunityListQuery {
    viewer {
      id
      ...CommunityList_viewer @arguments(count: 10)
      ...useCommunityInvitationsPagination_viewer @arguments(count: 5)
    }
  }
`;

interface CommunityListProps {
  queryRef: PreloadedQuery<CommunityListQuery>;
}

export const CommunityList = ({ queryRef }: CommunityListProps) => {
  const query = usePreloadedQuery(COMMUNITY_LIST_QUERY, queryRef);
  const [isPending, startTransition] = useTransition();

  const {
    data: communityData,
    loadNext,
    isLoadingNext,
    hasNext,
    refetch: refetchCommunity,
  } = usePaginationFragment<
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

  const { data: invitationData, refetch: refetchInvitations } =
    useCommunityInvitationsPagination(query.viewer);

  const handleRefresh = useCallback(() => {
    startTransition(() => {
      refetchCommunity({}, { fetchPolicy: "store-and-network" });
      refetchInvitations({}, { fetchPolicy: "store-and-network" });
    });
  }, [refetchCommunity, refetchInvitations]);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      className="px-sm min-h-full"
      data={communityData?.communities.edges?.map((edge) => edge.node)}
      renderItem={({ item }) => <CommunityCard community={item} />}
      ListHeaderComponent={
        <View>
          {invitationData && (
            <CommunityInvitationList communityInvitationData={invitationData} />
          )}
        </View>
      }
      ListEmptyComponent={
        <View className="gap-md pt-md flex flex-col">
          <View className="mx-auto">
            <Beach width={150} height={150} />
          </View>
          <Caption>Looking a little quiet here</Caption>
        </View>
      }
      ListFooterComponent={
        isLoadingNext ? <ActivityIndicator size="large" /> : null
      }
      onEndReachedThreshold={0.5}
      onEndReached={() => !isLoadingNext && hasNext && loadNext(10)}
      refreshControl={
        <RefreshControl refreshing={isPending} onRefresh={handleRefresh} />
      }
    />
  );
};
