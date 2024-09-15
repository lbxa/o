import type { User } from "@o/api";
import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect } from "react";
import type { PreloadedQuery } from "react-relay";
import { graphql, usePreloadedQuery, useQueryLoader } from "react-relay";

import type { ActiveUserQuery } from "../__generated__/ActiveUserQuery.graphql";

export const ACTIVE_USER_QUERY = graphql`
  query ActiveUserQuery {
    activeUser {
      id
      firstName
      lastName
      email
    }
  }
`;

const ActiveUserContext = createContext<User | undefined | null>(undefined);

export const ActiveUserProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [queryRef, loadQuery, disposeQuery] =
    useQueryLoader<ActiveUserQuery>(ACTIVE_USER_QUERY);

  useEffect(() => {
    loadQuery({}, { fetchPolicy: "store-or-network" });

    return () => disposeQuery();
  }, [loadQuery]);

  if (!queryRef) {
    return null; // this will most likely need to be removed
  }

  return (
    <ActiveUserContainer queryRef={queryRef}>{children}</ActiveUserContainer>
  );
};

const ActiveUserContainer: React.FC<
  PropsWithChildren<{ queryRef: PreloadedQuery<ActiveUserQuery> }>
> = ({ queryRef, children }) => {
  const data = usePreloadedQuery(ACTIVE_USER_QUERY, queryRef);

  return (
    <ActiveUserContext.Provider value={data.activeUser}>
      {children}
    </ActiveUserContext.Provider>
  );
};

export const useActiveUser = () => useContext(ActiveUserContext);
