/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import Nature from "@assets/images/nature.svg";
import { useTransition } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import type { PreloadedQuery } from "react-relay";
import { graphql, usePaginationFragment } from "react-relay";
import { usePreloadedQuery } from "react-relay";

import type { HomeFeed_viewer$key } from "@/__generated__/HomeFeed_viewer.graphql";
import type { HomeFeedPaginationQuery } from "@/__generated__/HomeFeedPaginationQuery.graphql";
import type { HomeFeedQuery } from "@/__generated__/HomeFeedQuery.graphql";
import { useNoSuspenseRefetch } from "@/relay";
import { HomeFeedItem } from "@/root/HomeFeedItem";

import { CommunityInvitationList } from "../communities/CommunityInvitation";
import { useCommunityInvitationsPagination } from "../communities/CommunityInvitation/queries";
import { Caption } from "../universe/atoms";

export const HOME_FEED_QUERY = graphql`
  query HomeFeedQuery {
    viewer {
      ...useCommunityInvitationsPagination_viewer @arguments(count: 5)
      ...HomeFeed_viewer @arguments(count: 10)
    }
  }
`;

export const HomeFeed = ({
  queryRef,
}: {
  queryRef: PreloadedQuery<HomeFeedQuery>;
}) => {
  const query = usePreloadedQuery(HOME_FEED_QUERY, queryRef);
  const [isPending, startTransition] = useTransition();

  const { data: invitationData, refetch: refetchInvitations } =
    useCommunityInvitationsPagination(query.viewer);

  const {
    data: homeFeedData,
    loadNext,
    isLoadingNext,
    hasNext,
  } = usePaginationFragment<HomeFeedPaginationQuery, HomeFeed_viewer$key>(
    graphql`
      fragment HomeFeed_viewer on Viewer
      @refetchable(queryName: "HomeFeedPaginationQuery")
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 10 }
        cursor: { type: "String" }
      ) {
        id
        homeFeed(first: $count, after: $cursor)
          @connection(key: "HomeFeed_viewer_homeFeed") {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...HomeFeedItem_item
            }
          }
        }
      }
    `,
    query.viewer
  );

  const { refetch: refetchHomeFeed } = useNoSuspenseRefetch({
    ancestorQuery: HOME_FEED_QUERY,
    ancestorVariables: {},
  });

  const handleRefresh = () => {
    startTransition(() => {
      refetchInvitations({});
      refetchHomeFeed();
    });
  };

  return (
    <FlatList
      className="px-sm"
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <HomeFeedItem fragmentRef={item} />}
      data={homeFeedData?.homeFeed.edges.map((edge) => edge.node)}
      refreshControl={
        <RefreshControl onRefresh={handleRefresh} refreshing={isPending} />
      }
      ListHeaderComponent={
        <View>
          {invitationData && (
            <CommunityInvitationList communityInvitationData={invitationData} />
          )}
        </View>
      }
      ListFooterComponent={
        isLoadingNext ? <ActivityIndicator size="large" /> : null
      }
      onEndReachedThreshold={0.5}
      onEndReached={() => !isLoadingNext && hasNext && loadNext(10)}
      ListEmptyComponent={
        <View className="gap-md pt-md flex flex-col">
          <View className="mx-auto">
            <Nature width={150} height={150} />
          </View>
          <Caption>It's time to get outside</Caption>
        </View>
      }
    />
  );
};
