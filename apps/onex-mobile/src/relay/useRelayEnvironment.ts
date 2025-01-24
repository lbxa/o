import type { Tokens } from "@o/api-gql";
import { useNavigationContainerRef, useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import type {
  FetchFunction,
  GraphQLResponseWithData,
  IEnvironment,
} from "relay-runtime";
import { Environment, Network, RecordSource, Store } from "relay-runtime";

import { useSecureStore } from "../utils/useSecureStore";

const createEnvironment = (fetchFn: FetchFunction): IEnvironment => {
  const network = Network.create(fetchFn);
  const store = new Store(new RecordSource());
  return new Environment({ store, network });
};

/**
 * Relay environment has been setup to work authTokens that can
 * be replenished with a refreshToken until that has expired.
 * Then the user has no choice but to log back in.
 *
 * The expiry values of authToken and refreshToken have been
 * chosen specifically to strike a balance between user
 * experience and sound security practices.
 */
export const useRelayEnvironment = (): {
  fetchFn: FetchFunction;
  environment: IEnvironment;
} => {
  const router = useRouter();
  const { getStoreItem, deleteStoreItem, setStoreItem } = useSecureStore();
  /**
   * There is an edge case when the user's token has expired
   * however the root navigation is not mounted yet. Avoid
   * calling router.* without certainty the root navigation
   * is mounted.
   */
  const rootNavigationRef = useNavigationContainerRef();
  const rootNavigationKey = useMemo(
    () => rootNavigationRef.current,
    [rootNavigationRef]
  );

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
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error("API URL is not configured");
      }

      const makeRequest = async (
        token: string | null
      ): Promise<GraphQLResponseWithData> => {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: formatRequestHeader(token),
          body: JSON.stringify({
            query: request.text,
            variables,
          }),
        });

        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }

        return (await response.json()) as GraphQLResponseWithData;
      };

      let data = await makeRequest(accessToken);

      const authErrors = data.errors?.filter(
        (e) => e.message === "Unauthorized" || e.message === "Token expired"
      ).length;

      if (authErrors && authErrors > 0) {
        const refreshToken = getStoreItem("REFRESH_TOKEN");

        if (refreshToken) {
          const refreshResponse = await fetch(apiUrl, {
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

            if (rootNavigationKey) {
              router.replace("auth/login");
            }
          }
        } else {
          await deleteStoreItem("ACCESS_TOKEN");
          await deleteStoreItem("REFRESH_TOKEN");

          if (rootNavigationKey) {
            router.replace("auth/login");
          }
        }
      }

      return data;
    },
    [
      deleteStoreItem,
      formatRequestHeader,
      getStoreItem,
      rootNavigationKey,
      router,
      setStoreItem,
    ]
  );

  const environment = useMemo(() => createEnvironment(fetchFn), [fetchFn]);

  return { fetchFn, environment };
};