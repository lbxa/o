import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import { graphql, useQueryLoader } from "react-relay";

import type { AppRootQuery } from "@/__generated__/AppRootQuery.graphql";

const APP_ROOT_QUERY = graphql`
  query AppRootQuery {
    viewer {
      ...CommunityList_viewer @arguments(count: 10)
      ...UserProfile_viewer
    }
  }
`;

export const AppRoot: React.FC<PropsWithChildren> = ({ children }) => {
  const [_, loadQuery, disposeQuery] =
    useQueryLoader<AppRootQuery>(APP_ROOT_QUERY);

  useEffect(() => {
    loadQuery({});

    return () => disposeQuery();
  }, [loadQuery, disposeQuery]);

  return <>{children}</>;
};
