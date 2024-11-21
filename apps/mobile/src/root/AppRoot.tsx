import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import { graphql, useQueryLoader } from "react-relay";

import type { AppRootQuery } from "@/__generated__/AppRootQuery.graphql";

import { useToken } from "../utils";

const APP_ROOT_QUERY = graphql`
  query AppRootQuery {
    viewer {
      ...CommunityList_viewer @arguments(count: 5)
      ...UserProfile_viewer
    }
  }
`;

export const AppRoot: React.FC<PropsWithChildren> = ({ children }) => {
  const [_, loadQuery, disposeQuery] =
    useQueryLoader<AppRootQuery>(APP_ROOT_QUERY);

  const { token } = useToken();

  useEffect(() => {
    if (token) {
      loadQuery({});
    }

    return () => disposeQuery();
  }, [token, loadQuery, disposeQuery]);

  return <>{children}</>;
};
