import type { PropsWithChildren } from "react";
import React, { useEffect } from "react";
import { graphql, useLazyLoadQuery } from "react-relay";

import type { AppRootQuery } from "@/__generated__/AppRootQuery.graphql";
import { useZustStore } from "@/state";
import { useToken } from "@/utils";

export const APP_ROOT_QUERY = graphql`
  query AppRootQuery {
    viewer {
      ...CommunityList_viewer @arguments(count: 5)
      # ...UserProfile_viewer
      user {
        id
        firstName
        lastName
        email
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
