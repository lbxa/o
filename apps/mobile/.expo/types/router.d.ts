/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(app)` | `/(app)/community` | `/(app)/community/` | `/(app)/community/challenge` | `/(app)/community/challenge/create` | `/(app)/community/challenge/invite` | `/(app)/community/create` | `/(app)/community/invite` | `/(app)/community/search` | `/(app)/home` | `/(app)/home/` | `/(app)/profile` | `/(app)/profile/` | `/(auth)` | `/(auth)/login` | `/(auth)/sign-up` | `/_sitemap` | `/community` | `/community/` | `/community/challenge` | `/community/challenge/create` | `/community/challenge/invite` | `/community/create` | `/community/invite` | `/community/search` | `/home` | `/home/` | `/login` | `/profile` | `/profile/` | `/sign-up`;
      DynamicRoutes: `/(app)/community/${Router.SingleRoutePart<T>}` | `/(app)/community/challenge/${Router.SingleRoutePart<T>}` | `/community/${Router.SingleRoutePart<T>}` | `/community/challenge/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/(app)/community/[community]` | `/(app)/community/challenge/[challenge]` | `/community/[community]` | `/community/challenge/[challenge]`;
    }
  }
}
