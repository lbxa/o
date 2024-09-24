import type { User } from "@o/api";
import type { PropsWithChildren } from "react";
import { createContext, Suspense, useContext } from "react";
import { graphql, useLazyLoadQuery } from "react-relay";

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
  return (
    <Suspense fallback={null}>
      <ActiveUserLoader>{children}</ActiveUserLoader>
    </Suspense>
  );
};

const ActiveUserLoader: React.FC<PropsWithChildren> = ({ children }) => {
  const data = useLazyLoadQuery<ActiveUserQuery>(
    ACTIVE_USER_QUERY,
    {},
    { fetchPolicy: "store-or-network" }
  );

  console.log("ACT", data.activeUser);

  return (
    <ActiveUserContext.Provider value={data.activeUser}>
      {children}
    </ActiveUserContext.Provider>
  );
};

export const useActiveUser = () => useContext(ActiveUserContext);
