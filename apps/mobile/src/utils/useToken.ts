import { useCallback, useMemo } from "react";

import { useSecureStore } from "./useSecureStore";

interface F {
  token: boolean;
  deleteToken: () => Promise<void>;
}

export const useToken = (): F => {
  const { getStoreItem, deleteStoreItem } = useSecureStore();

  const token = !!getStoreItem("ACCESS_TOKEN");

  const deleteToken = useCallback(
    async () => await deleteStoreItem("ACCESS_TOKEN"),
    [deleteStoreItem]
  );

  return useMemo(() => ({ token, deleteToken }), [deleteToken, token]);
};
