/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Tokens } from "@o/onex-api-gql";
import { useNavigationContainerRef, useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import type {
  FetchFunction,
  GraphQLResponseWithData,
  IEnvironment,
} from "relay-runtime";
import { Environment, Network, RecordSource, Store } from "relay-runtime";

import { useApiEndpoint } from "@/utils";

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
  const { GQL_API_URL } = useApiEndpoint();
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

  const formatAuthRequestHeader = useCallback((token: string | null) => {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }, []);

  const fetchFn: FetchFunction = useCallback(
    async (operation, variables, _, uploadables) => {
      const accessToken = getStoreItem("ACCESS_TOKEN");

      const makeRequest = async (
        token: string | null
      ): Promise<GraphQLResponseWithData> => {
        let request: RequestInit;
        if (uploadables) {
          const formData = new FormData();
          formData.append("query", operation.text!);
          formData.append("variables", JSON.stringify(variables));

          Object.keys(uploadables).forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(uploadables, key)) {
              formData.append(key, uploadables[key]);
            }
          });

          request = {
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          };
        } else {
          request = {
            method: "POST",
            headers: formatAuthRequestHeader(token),
            body: JSON.stringify({
              query: operation.text,
              variables,
            }),
          };
        }

        const response = await fetch(GQL_API_URL, request);

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
          const refreshResponse = await fetch(GQL_API_URL, {
            method: "POST",
            headers: formatAuthRequestHeader(refreshToken),
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
      GQL_API_URL,
      deleteStoreItem,
      formatAuthRequestHeader,
      getStoreItem,
      rootNavigationKey,
      router,
      setStoreItem,
    ]
  );

  const environment = useMemo(() => createEnvironment(fetchFn), [fetchFn]);

  return { fetchFn, environment };
};
