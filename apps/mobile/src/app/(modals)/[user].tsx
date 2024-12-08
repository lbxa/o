import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";
import { useQueryLoader } from "react-relay";

import { Ozone } from "@/universe/molecules";

import type { UserProfileQuery } from "../../__generated__/UserProfileQuery.graphql";
import { ModalCloseButton } from "../../universe/atoms";
import { USER_PROFILE_QUERY, UserProfile } from "../../users";

export default function UserPage() {
  const { user: userId } = useLocalSearchParams<{
    user: string;
  }>();

  const [queryRef, loadQuery, disposeQuery] =
    useQueryLoader<UserProfileQuery>(USER_PROFILE_QUERY);

  useEffect(() => {
    loadQuery({ userId });

    return () => {
      disposeQuery();
    };
  }, [disposeQuery, loadQuery, userId]);

  return (
    <Ozone>
      <Stack.Screen
        options={{
          headerLeft: () => <Text className="text-xl font-bold">Profile</Text>,
          headerRight: () => <ModalCloseButton />,
        }}
      />
      {queryRef && <UserProfile queryRef={queryRef} />}
    </Ozone>
  );
}
