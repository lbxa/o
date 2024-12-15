import Mailbox from "@assets/images/mailbox.svg";
import { FlatList, RefreshControl, View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import { graphql, usePaginationFragment, usePreloadedQuery } from "react-relay";

import type { UserNotificationList_user$key } from "@/__generated__/UserNotificationList_user.graphql";
import type { UserNotificationListPaginationQuery } from "@/__generated__/UserNotificationListPaginationQuery.graphql";
import type { UserNotificationListQuery } from "@/__generated__/UserNotificationListQuery.graphql";

import { useNoSuspenseRefetch } from "../../relay";
import { Caption, OButton } from "../../universe/atoms";
import { UserNotificationCard } from "./UserNotificationCard";

export const USER_NOTIFICATION_LIST_QUERY = graphql`
  query UserNotificationListQuery {
    viewer {
      id
      user {
        ...UserNotificationList_user @arguments(count: 10)
      }
    }
  }
`;

interface UserNotificationListProps {
  queryRef: PreloadedQuery<UserNotificationListQuery>;
}

export const UserNotificationList = ({
  queryRef,
}: UserNotificationListProps) => {
  const query = usePreloadedQuery<UserNotificationListQuery>(
    USER_NOTIFICATION_LIST_QUERY,
    queryRef
  );

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    UserNotificationListPaginationQuery,
    UserNotificationList_user$key
  >(
    graphql`
      fragment UserNotificationList_user on User
      @refetchable(queryName: "UserNotificationListPaginationQuery")
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 10 }
        cursor: { type: "String" }
      ) {
        id
        followerRequests(first: $count, after: $cursor)
          @connection(key: "UserNotificationList_viewer_followerRequests") {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...UserNotificationCard_notification
            }
          }
        }
      }
    `,
    query.viewer?.user
  );

  const { refetch: refetchTopResults, isRefetching: isRefetchingTopResults } =
    useNoSuspenseRefetch({
      ancestorQuery: USER_NOTIFICATION_LIST_QUERY,
      ancestorVariables: {},
    });

  return (
    <FlatList
      className="px-md mt-md min-h-full"
      data={data?.followerRequests?.edges.map((edge) => edge.node)}
      renderItem={({ item }) => <UserNotificationCard fragmentRef={item} />}
      ListEmptyComponent={
        <View className="gap-md pt-md flex flex-col">
          <View className="mx-auto">
            <Mailbox width={150} height={150} />
          </View>
          <Caption>You've caught up with everything!</Caption>
        </View>
      }
      ListFooterComponent={
        <View className="pb-md">
          {hasNext && (
            <OButton
              title="Load more"
              loading={isLoadingNext}
              disabled={!hasNext}
              onPress={() => loadNext(10)}
            />
          )}
        </View>
      }
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingTopResults}
          onRefresh={refetchTopResults}
        />
      }
    />
  );
};
