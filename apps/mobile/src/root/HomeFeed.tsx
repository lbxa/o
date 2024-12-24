import Nature from "@assets/images/nature.svg";
import { useTransition } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import { graphql } from "react-relay";
import { usePreloadedQuery } from "react-relay";

import type { HomeFeedQuery } from "@/__generated__/HomeFeedQuery.graphql";

import { CommunityCard } from "../communities/CommunityCard";
import { CommunityInvitationList } from "../communities/CommunityInvitation";
import { useCommunityInvitationsPagination } from "../communities/CommunityInvitation/queries";
import { Caption } from "../universe/atoms";

export const HOME_FEED_QUERY = graphql`
  query HomeFeedQuery {
    viewer {
      ...useCommunityInvitationsPagination_viewer @arguments(count: 5)
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

  const handleRefresh = () => {
    startTransition(() => {
      refetchInvitations({});
    });
  };

  return (
    <FlatList
      className="px-sm"
      showsVerticalScrollIndicator={false}
      data={[]}
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
      ListEmptyComponent={
        <View className="gap-md pt-md flex flex-col">
          <View className="mx-auto">
            <Nature width={150} height={150} />
          </View>
          <Caption>It's time to get outside</Caption>
        </View>
      }
      renderItem={({ item }) => <CommunityCard community={item} />}
    />
  );
};
