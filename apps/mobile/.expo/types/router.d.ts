/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(app)` | `/(app)/community` | `/(app)/community/create` | `/(app)/community/search` | `/(app)/home` | `/(app)/home/` | `/(app)/profile` | `/(auth)` | `/(auth)/login` | `/(auth)/sign-up` | `/_sitemap` | `/community` | `/community/create` | `/community/search` | `/home` | `/home/` | `/login` | `/profile` | `/sign-up`;
      DynamicRoutes: `/(app)/community/${Router.SingleRoutePart<T>}` | `/community/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/(app)/community/[community]` | `/community/[community]`;
    }
  }
}
