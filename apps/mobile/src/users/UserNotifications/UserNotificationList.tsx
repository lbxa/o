import Mailbox from "@assets/images/mailbox.svg";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import type { PreloadedQuery } from "react-relay";
import { graphql, usePaginationFragment, usePreloadedQuery } from "react-relay";

import type { UserNotificationList_user$key } from "@/__generated__/UserNotificationList_user.graphql";
import type { UserNotificationListPaginationQuery } from "@/__generated__/UserNotificationListPaginationQuery.graphql";
import type { UserNotificationListQuery } from "@/__generated__/UserNotificationListQuery.graphql";

import { useNoSuspenseRefetch } from "../../relay";
import { Caption } from "../../universe/atoms";
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
      className="min-h-full px-md"
      data={data?.followerRequests?.edges.map((edge) => edge.node)}
      renderItem={({ item }) => <UserNotificationCard fragmentRef={item} />}
      ListEmptyComponent={
        <View className="flex flex-col gap-md pt-md">
          <View className="mx-auto">
            <Mailbox width={150} height={150} />
          </View>
          <Caption>You've caught up with everything!</Caption>
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
