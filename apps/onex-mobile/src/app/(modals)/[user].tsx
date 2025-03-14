import { Stack, useLocalSearchParams } from "expo-router";
import { Suspense, useEffect } from "react";
import { Text } from "react-native";
import { useQueryLoader } from "react-relay";

import { Ozone } from "@/universe/molecules";

import type { UserProfileQuery } from "../../__generated__/UserProfileQuery.graphql";
import { ModalCloseButton } from "../../universe/atoms";
import {
  USER_PROFILE_QUERY,
  UserProfile,
  ViewerProfileSkeleton,
} from "../../users";
import { useActiveUserId } from "../../users/hooks";

export default function UserPage() {
  const { user: userId } = useLocalSearchParams<{
    user: string;
  }>();

  const activeUserId = useActiveUserId();

  const [queryRef, loadQuery, disposeQuery] =
    useQueryLoader<UserProfileQuery>(USER_PROFILE_QUERY);

  useEffect(() => {
    loadQuery(
      { userId: userId, viewerId: activeUserId },
      { fetchPolicy: "store-and-network" }
    );

    return () => {
      disposeQuery();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Text className="text-xl font-bold text-black dark:text-ivory">
              Profile
            </Text>
          ),
          headerRight: () => <ModalCloseButton />,
        }}
      />
      <Suspense fallback={<ViewerProfileSkeleton />}>
        <Ozone>{queryRef && <UserProfile queryRef={queryRef} />}</Ozone>
      </Suspense>
    </>
  );
}
