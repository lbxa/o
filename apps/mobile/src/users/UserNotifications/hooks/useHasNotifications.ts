import { useLazyLoadQuery } from "react-relay";
import { graphql } from "relay-runtime";

import type { useHasNotificationsQuery } from "@/__generated__/useHasNotificationsQuery.graphql";

export const useHasNotifications = () => {
  const notifications = useLazyLoadQuery<useHasNotificationsQuery>(
    graphql`
      query useHasNotificationsQuery {
        viewer {
          id
          user {
            id
            followerRequests(first: 10)
              @connection(key: "UserNotificationList_viewer_followerRequests") {
              edges {
                cursor
                node {
                  id
                }
              }
            }
          }
        }
      }
    `,
    {}
  );

  const edges = notifications.viewer?.user?.followerRequests?.edges ?? [];

  return edges.length > 0;
};
