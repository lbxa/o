import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { UserProfileCard_user$key } from "@/__generated__/UserProfileCard_user.graphql";

import { OTouchable } from "../../universe/atoms";
import { UserAvatar } from "../UserAvatar";

interface UserProfileCardProps {
  fragmentRef: UserProfileCard_user$key;
}

export const UserProfileCard = ({ fragmentRef }: UserProfileCardProps) => {
  const router = useRouter();
  const user = useFragment<UserProfileCard_user$key>(
    graphql`
      fragment UserProfileCard_user on User {
        id
        firstName
        lastName
        handle
      }
    `,
    fragmentRef
  );

  return (
    <OTouchable onPress={() => router.push(`/(modals)/${user.id}`)}>
      <View className="mb-sm flex min-h-12 w-full flex-row items-center gap-sm">
        <UserAvatar size="sm" user={user} />
        <View className="flex flex-1 flex-col">
          <Text className="text-black dark:text-ivory">
            {user.firstName} {user.lastName}
          </Text>
          {user.handle && (
            <Text className="text-black dark:text-ivory">{user.handle}</Text>
          )}
        </View>
      </View>
    </OTouchable>
  );
};
