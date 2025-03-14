import type { PropsWithChildren } from "react";
import React, { useEffect } from "react";
import { graphql, useLazyLoadQuery } from "react-relay";

import type { AppRootQuery } from "@/__generated__/AppRootQuery.graphql";
import { useZustStore } from "@/state";
import { useToken } from "@/utils";

export const APP_ROOT_QUERY = graphql`
  query AppRootQuery {
    viewer {
      id
      ...CommunityList_viewer @arguments(count: 10)
      ...useCommunityInvitationsPagination_viewer @arguments(count: 5)
      user {
        id
        firstName
        lastName
        email
        handle
        bio
        avatarUrl(size: LARGE)
        ...UserProfileStats_user
        ...UserNotificationList_user @arguments(count: 10)
      }
    }
  }
`;

export const AppRoot: React.FC<PropsWithChildren> = ({ children }) => {
  const data = useLazyLoadQuery<AppRootQuery>(APP_ROOT_QUERY, {});
  const { setActiveUser } = useZustStore();

  const { token } = useToken();

  useEffect(() => {
    if (token && data.viewer?.user) {
      setActiveUser(data.viewer.user);
    }
  }, [token, data, setActiveUser]);

  return <>{children}</>;
};
