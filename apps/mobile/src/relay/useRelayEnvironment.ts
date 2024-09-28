import type { Tokens } from "@o/api";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import type {
  FetchFunction,
  GraphQLResponseWithData,
  IEnvironment,
} from "relay-runtime";
import { Environment, Network, RecordSource, Store } from "relay-runtime";

import { useSecureStore } from "../utils/useSecureStore";

export const useRelayEnvironment = (): {
  fetchFn: FetchFunction;
  createEnvironment: () => IEnvironment;
} => {
  const router = useRouter();
  const { getStoreItem, deleteStoreItem, setStoreItem } = useSecureStore();

  const formatRequestHeader = useCallback((token: string | null) => {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }, []);

  const fetchFn: FetchFunction = useCallback(
    async (request, variables) => {
      const accessToken = getStoreItem("ACCESS_TOKEN");
      const refreshToken = getStoreItem("REFRESH_TOKEN");
      console.log("CachedAccessToken", accessToken);
      console.log("CachedRefreshToken", refreshToken);

      const makeRequest = async (
        token: string | null
      ): Promise<GraphQLResponseWithData> => {
        const response = await fetch("http://localhost:6969/graphql", {
          method: "POST",
          headers: formatRequestHeader(token),
          body: JSON.stringify({
            query: request.text,
            variables,
          }),
        });

        return (await response.json()) as GraphQLResponseWithData;
      };

      let data = await makeRequest(accessToken);

      const authErrors = data.errors?.filter(
        (e) => e.message === "Unauthorized" || e.message === "Token expired"
      ).length;

      if (authErrors && authErrors > 0) {
        const refreshToken = getStoreItem("REFRESH_TOKEN");

        if (refreshToken) {
          const refreshResponse = await fetch("http://localhost:6969/graphql", {
            method: "POST",
            headers: formatRequestHeader(refreshToken),
            body: JSON.stringify({
              query: `
              mutation RefreshTokens {
                authRefreshTokens {
                  accessToken
                  refreshToken
                }
              }
            `,
              variables: {},
            }),
          });

          const refreshResult =
            (await refreshResponse.json()) as GraphQLResponseWithData;

          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          if (refreshResult?.data?.authRefreshTokens) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const {
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            }: Tokens = refreshResult.data.authRefreshTokens;

            setStoreItem("ACCESS_TOKEN", newAccessToken);
            setStoreItem("REFRESH_TOKEN", newRefreshToken);

            data = await makeRequest(newAccessToken);
          } else {
            /**
             * token refresh failed, either:
             *   - the token was tampered with
             *   - or it has expired
             * TODO alert user they have been logged out and need
             * to log back in
             */
            await deleteStoreItem("ACCESS_TOKEN");
            await deleteStoreItem("REFRESH_TOKEN");

            router.replace("(auth)/login");
          }
        } else {
          await deleteStoreItem("ACCESS_TOKEN");
          await deleteStoreItem("REFRESH_TOKEN");

          router.replace("(auth)/login");
        }
      }

      return data;
    },
    [deleteStoreItem, formatRequestHeader, getStoreItem, router, setStoreItem]
  );

  const createEnvironment = useCallback((): IEnvironment => {
    const network = Network.create(fetchFn);
    const store = new Store(new RecordSource());
    return new Environment({ store, network });
    // keep the deps empty: tearing down the environment on every fetchFn
    // invocation will catastrophically destroy the in memory cache
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(
    () => ({ fetchFn, createEnvironment }),
    [createEnvironment, fetchFn]
  );
};
