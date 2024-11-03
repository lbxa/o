import type { User } from "@o/api";
import type { PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useEffect } from "react";
import {
  graphql,
  useFragment,
  useLazyLoadQuery,
  useRefetchableFragment,
} from "react-relay";

import type { UserFragment$key } from "@/__generated__/UserFragment.graphql";
import type { ViewerFragment$key } from "@/__generated__/ViewerFragment.graphql";
import type { ViewerQuery } from "@/__generated__/ViewerQuery.graphql";
import type { ViewerRefetchQuery } from "@/__generated__/ViewerRefetchQuery.graphql";
import { useZustStore } from "@/state";

import { USER_FRAGMENT } from "./UserFragment";

const ViewerContext = createContext<{
  viewer: User | null | undefined;
  refetch: () => void;
}>({
  viewer: null,
  refetch: () => null,
});

export const useViewer = () => useContext(ViewerContext);

const VIEWER_QUERY = graphql`
  query ViewerQuery {
    viewer {
      ...ViewerFragment
    }
  }
`;

const VIEWER_FRAGMENT = graphql`
  fragment ViewerFragment on Viewer
  @refetchable(queryName: "ViewerRefetchQuery") {
    user {
      ...UserFragment
    }
  }
`;

export const ViewerProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { setActiveUser } = useZustStore();

  const data = useLazyLoadQuery<ViewerQuery>(
    VIEWER_QUERY,
    {},
    { fetchPolicy: "store-or-network" }
  );

  const [viewerData, refetchUser] = useRefetchableFragment<
    ViewerRefetchQuery,
    ViewerFragment$key
  >(VIEWER_FRAGMENT, data.viewer);

  const refetch = useCallback(() => {
    refetchUser({}, { fetchPolicy: "network-only" });
  }, [refetchUser]);

  const userFragment = useFragment<UserFragment$key>(
    USER_FRAGMENT,
    viewerData?.user
  );

  useEffect(() => {
    if (userFragment) {
      setActiveUser(userFragment);
    }
  }, [setActiveUser, userFragment]);

  return (
    <ViewerContext.Provider value={{ viewer: userFragment, refetch }}>
      {children}
    </ViewerContext.Provider>
  );
};
