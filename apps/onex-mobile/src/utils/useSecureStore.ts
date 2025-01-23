import * as SecureStore from "expo-secure-store";
import { useCallback, useMemo } from "react";

type StoreItem = "ACCESS_TOKEN" | "REFRESH_TOKEN";

export const useSecureStore = (): {
  getStoreItem: (key: StoreItem) => string | null;
  setStoreItem: (key: StoreItem, value: string) => void;
  deleteStoreItem: (key: StoreItem) => Promise<void>;
} => {
  const isValidStoreItem = (item: string): item is StoreItem =>
    ["ACCESS_TOKEN", "REFRESH_TOKEN"].includes(item);

  const getStoreItem = useCallback(
    (item: StoreItem): string | null => SecureStore.getItem(item),
    []
  );

  const setStoreItem = useCallback(
    (item: StoreItem, value: string): void => SecureStore.setItem(item, value),
    []
  );

  const deleteStoreItem = useCallback(
    async (item: StoreItem): Promise<void> =>
      await SecureStore.deleteItemAsync(item),
    []
  );

  return useMemo(
    () => ({ getStoreItem, deleteStoreItem, setStoreItem, isValidStoreItem }),
    [deleteStoreItem, getStoreItem, setStoreItem]
  );
};
