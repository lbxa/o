import { useRouter } from "expo-router";
import { useCallback } from "react";
import type { UseMutationConfig } from "react-relay";
import { useMutation } from "react-relay";
import type { Disposable } from "relay-runtime";
import { graphql } from "relay-runtime";

import type { useLogoutMutation } from "@/__generated__/useLogoutMutation.graphql";
import { useZustStore } from "@/state/zust-store";
import { useToken } from "@/utils/useToken";

export const useLogout = (): {
  logoutMutation: (config: UseMutationConfig<useLogoutMutation>) => Disposable;
  logout: () => Promise<void>;
  isMutationInFlight: boolean;
} => {
  const router = useRouter();
  const { deleteTokens } = useToken();
  const { removeActiveUser } = useZustStore();

  const [commitMutation, isMutationInFlight] = useMutation<useLogoutMutation>(
    graphql`
      mutation useLogoutMutation {
        authLogout
      }
    `
  );

  const logout = useCallback(async () => {
    await deleteTokens();
    removeActiveUser();
    commitMutation({
      variables: {},
      updater: (proxyStore) => {
        proxyStore.invalidateStore();
      },
    });
    router.replace("/auth/login");
  }, [deleteTokens, removeActiveUser, commitMutation, router]);

  return { logoutMutation: commitMutation, logout, isMutationInFlight };
};
