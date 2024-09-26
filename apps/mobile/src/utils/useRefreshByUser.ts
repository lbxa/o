import { useState } from "react";
import type { Disposable } from "relay-runtime";

export function useRefreshByUser(refetch: () => Disposable) {
  const [isRefetchingByUser, setIsRefetchingByUser] = useState(false);

  function refetchByUser() {
    setIsRefetchingByUser(true);

    try {
      refetch();
    } finally {
      setIsRefetchingByUser(false);
    }
  }

  return {
    isRefetchingByUser,
    refetchByUser,
  };
}
