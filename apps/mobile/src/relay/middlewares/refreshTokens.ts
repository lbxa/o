// TODO: Fix typing on this file
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import * as SecureStore from "expo-secure-store";

export const refreshTokens = async () => {
  try {
    const refreshToken = await SecureStore.getItemAsync("REFRESH_TOKEN");
    const response = await fetch(
      process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:6969/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
        body: JSON.stringify({
          query: `
          mutation {
            authCreateNewTokens {
              accessToken
              refreshToken
            }
          }
        `,
        }),
      }
    );

    const { data } = await response.json();

    if (data?.authCreateNewTokens) {
      SecureStore.setItem("ACCESS_TOKEN", data.authCreateNewTokens.accessToken);

      SecureStore.setItem(
        "REFRESH_TOKEN",
        data.authCreateNewTokens.refreshToken
      );

      return data.authCreateNewTokens.accessToken;
    } else {
      throw new Error("Failed to refresh tokens");
    }
  } catch (error) {
    console.error("Error refreshing tokens:", error);
    // Handle error (e.g., redirect to login page)
    throw error;
  }
};
