import "../global.css";
import "expo-dev-client";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { verifyInstallation } from "nativewind";
import { Suspense, useEffect, useMemo } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import type { PreloadedQuery } from "react-relay";
import {
  loadQuery,
  RelayEnvironmentProvider,
  useFragment,
  usePreloadedQuery,
} from "react-relay";

import type { CommunityListQuery } from "@/__generated__/CommunityListQuery.graphql";
import type { UserProfileQuery } from "@/__generated__/UserProfileQuery.graphql";
import { COMMUNITY_LIST_QUERY } from "@/communities";
import { useRelayEnvironment } from "@/relay";
import { useZustStore } from "@/state";
import { USER_PROFILE_FRAGMENT, USER_PROFILE_QUERY } from "@/users";

import type { UserProfileFragment$key } from "../__generated__/UserProfileFragment.graphql";

export default function RootLayout() {
  if (__DEV__) {
    verifyInstallation();
  }

  const { createEnvironment } = useRelayEnvironment();
  const environment = useMemo(() => createEnvironment(), [createEnvironment]);
  const { setPreloadedProfileQuery, setPreloadedCommunityListQuery } =
    useZustStore();

  const preloadedUserProfileQuery = loadQuery<UserProfileQuery>(
    environment,
    USER_PROFILE_QUERY,
    {}
  );

  const preloadedCommunityListQuery = loadQuery<CommunityListQuery>(
    environment,
    COMMUNITY_LIST_QUERY,
    {}
  );

  useEffect(() => {
    void SplashScreen.preventAutoHideAsync();
    setPreloadedProfileQuery(preloadedUserProfileQuery);
    setPreloadedCommunityListQuery(preloadedCommunityListQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <GestureHandlerRootView>
        <ThemeProvider value={DefaultTheme}>
          <SafeAreaProvider>
            <BottomSheetModalProvider>
              <RootContent preloadedProfileQuery={preloadedUserProfileQuery} />
            </BottomSheetModalProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </RelayEnvironmentProvider>
  );
}

interface RootContentProps {
  preloadedProfileQuery: PreloadedQuery<UserProfileQuery>;
}

const RootContent = ({ preloadedProfileQuery }: RootContentProps) => {
  const { setActiveUser } = useZustStore();
  const user = usePreloadedQuery<UserProfileQuery>(
    USER_PROFILE_QUERY,
    preloadedProfileQuery
  );

  const activeUser = useFragment<UserProfileFragment$key>(
    USER_PROFILE_FRAGMENT,
    user.viewer?.user
  );

  useEffect(() => {
    if (activeUser) {
      setActiveUser(activeUser);
    }
    void SplashScreen.hideAsync();
  }, []);

  return (
    <Suspense fallback={null}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(app)" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </Suspense>
  );
};
