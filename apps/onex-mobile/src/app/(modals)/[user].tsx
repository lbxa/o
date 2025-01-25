import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";
import { useQueryLoader } from "react-relay";

import { Ozone } from "@/universe/molecules";

import type { UserProfileQuery } from "../../__generated__/UserProfileQuery.graphql";
import { ModalCloseButton } from "../../universe/atoms";
import { USER_PROFILE_QUERY, UserProfile } from "../../users";
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
    <Ozone>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Text className="dark:text-ivory text-xl font-bold text-black">
              Profile
            </Text>
          ),
          headerRight: () => <ModalCloseButton />,
        }}
      />
      {queryRef && <UserProfile queryRef={queryRef} />}
    </Ozone>
  );
}
