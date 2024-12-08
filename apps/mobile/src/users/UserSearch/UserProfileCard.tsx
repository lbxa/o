import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { UserProfileCard_user$key } from "@/__generated__/UserProfileCard_user.graphql";

import { OTouchable } from "../../universe/atoms";

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
      <View className="mb-sm flex min-h-12 w-full flex-row items-center">
        <View className="mr-sm size-10 rounded-full bg-gray-300" />
        <View className="flex flex-1 flex-col">
          <Text>
            {user.firstName} {user.lastName}
          </Text>
          {user.handle && <Text>{user.handle}</Text>}
        </View>
      </View>
    </OTouchable>
  );
};
