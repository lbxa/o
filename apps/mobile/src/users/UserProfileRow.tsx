import { View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { UserProfileRow_user$key } from "@/__generated__/UserProfileRow_user.graphql";
import { OText } from "@/universe/atoms";
import { UserAvatar } from "@/users/UserAvatar";
import { UserStreak } from "@/users/UserStreak";

export const UserProfileRow = ({
  user,
  rightItems,
}: {
  user: UserProfileRow_user$key;
  rightItems: React.ReactNode;
}) => {
  const userRow = useFragment(
    graphql`
      fragment UserProfileRow_user on User {
        id
        firstName
        lastName
        streak {
          id
          currentStreak
        }
      }
    `,
    user
  );

  return (
    <View className="mt-sm flex-row items-center justify-between">
      <View className="flex-1 flex-row items-center gap-sm">
        <UserAvatar size="sm" user={userRow} />
        <View className="min-w-0 flex-1 flex-col">
          <View className="flex-row items-center gap-sm">
            <OText className="shrink-1 text-xl" numberOfLines={1}>
              {userRow.firstName + " " + userRow.lastName}
            </OText>
            <UserStreak streak={userRow.streak?.currentStreak ?? 0} />
          </View>
          <OText className="text-sm" numberOfLines={1}>
            Friends with{" "}
            <OText className="font-bold">{userRow.firstName}</OText> and{" "}
            <OText className="font-bold">2 others</OText>
          </OText>
        </View>
        {rightItems}
      </View>
    </View>
  );
};
