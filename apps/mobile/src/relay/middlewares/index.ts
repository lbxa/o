import * as SecureStore from "expo-secure-store";
import type {
  AuthMiddlewareOpts,
  BatchMiddlewareOpts,
  CacheMiddlewareOpts,
  Middleware,
  RetryMiddlewareOpts,
  UrlMiddlewareOpts,
} from "react-relay-network-modern";
import {
  authMiddleware,
  batchMiddleware,
  cacheMiddleware,
  errorMiddleware,
  loggerMiddleware,
  perfMiddleware,
  progressMiddleware,
  retryMiddleware,
  urlMiddleware,
} from "react-relay-network-modern";

import { refreshTokens } from "./refreshTokens";

const devMiddlewares: Middleware[] = [
  loggerMiddleware(),
  errorMiddleware(),
  perfMiddleware(),
];

const productionMiddlewares: Middleware[] = [
  cacheMiddleware({
    size: 100, // max 100 requests
    ttl: 900000, // 15 minutes
  } as CacheMiddlewareOpts),
  urlMiddleware({
    url: () => Promise.resolve(process.env.EXPO_PUBLIC_API_URL),
    headers: () => {
      const token = SecureStore.getItem("ACCESS_TOKEN");
      return {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };
    },
  } as UrlMiddlewareOpts),
  batchMiddleware({
    batchUrl: (_) =>
      Promise.resolve(process.env.EXPO_PUBLIC_API_URL + "/batch"),
    batchTimeout: 10,
  } as BatchMiddlewareOpts),
  retryMiddleware({
    fetchTimeout: 15000,
    retryDelays: (attempt) => Math.pow(2, attempt + 4) * 100,
    statusCodes: [500, 503, 504],
    beforeRetry: ({ attempt, abort }) => {
      if (attempt > 3) abort();
    },
  } as RetryMiddlewareOpts),
  authMiddleware({
    token: () => {
      const token = SecureStore.getItem("ACCESS_TOKEN");
      return token ? `Bearer ${token}` : null;
    },
    tokenRefreshPromise: refreshTokens,
  } as AuthMiddlewareOpts),
  progressMiddleware({
    onProgress: (current, total) => {
      console.log("Downloaded: " + current + " B, total: " + total + " B");
    },
  }),
];

export const middlewares = __DEV__
  ? [...devMiddlewares, ...productionMiddlewares]
  : productionMiddlewares;
