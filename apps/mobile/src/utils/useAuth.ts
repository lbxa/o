import * as SecureStore from "expo-secure-store";
import { useMemo } from "react";

interface F {
  tok: string | null;
  session: boolean;
  logout: () => void;
}

export const useAuth = (): F => {
  const tok = SecureStore.getItem("ACCESS_TOKEN");
  const session = !!tok;
  const logout = () => SecureStore.deleteItemAsync("ACCESS_TOKEN");
  return useMemo(() => ({ tok, session, logout }), [tok]);
};
