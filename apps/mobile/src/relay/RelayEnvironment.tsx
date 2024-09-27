import type { PropsWithChildren } from "react";
import React from "react";
import { RelayEnvironmentProvider } from "react-relay";

import { useRelayEnvironment } from "./useRelayEnvironment";

export const RelayEnvironment: React.FC<PropsWithChildren> = ({
  children,
}): React.ReactElement => {
  const { createEnvironment } = useRelayEnvironment();
  const environment = createEnvironment();

  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  );
};
