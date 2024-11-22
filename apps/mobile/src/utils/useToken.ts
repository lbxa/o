import { useCallback, useMemo } from "react";

import { useSecureStore } from "./useSecureStore";

interface F {
  token: boolean;
  deleteTokens: () => Promise<void>;
}

export const useToken = (): F => {
  const { getStoreItem, deleteStoreItem } = useSecureStore();

  const token = !!getStoreItem("ACCESS_TOKEN");

  const deleteTokens = useCallback(async () => {
    await deleteStoreItem("ACCESS_TOKEN");
    await deleteStoreItem("REFRESH_TOKEN");
  }, [deleteStoreItem]);

  return useMemo(() => ({ token, deleteTokens }), [deleteTokens, token]);
};
