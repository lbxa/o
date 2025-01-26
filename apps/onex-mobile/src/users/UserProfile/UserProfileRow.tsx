import { useRouter } from "expo-router";
import { View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { UserProfileRow_user$key } from "@/__generated__/UserProfileRow_user.graphql";
import { OText, OTouchable } from "@/universe/atoms";
import { UserAvatar } from "@/users/UserAvatar";
import { UserStreak } from "@/users/UserStreak";

export const UserProfileRow = ({
  user,
  rightItems,
  onPress,
}: {
  user: UserProfileRow_user$key;
  rightItems?: React.ReactNode;
  onPress?: () => void;
}) => {
  const router = useRouter();
  const userRow = useFragment(
    graphql`
      fragment UserProfileRow_user on User {
        id
        firstName
        lastName
        handle
        streak {
          id
          currentStreak
        }
      }
    `,
    user
  );

  const fullName = [userRow.firstName, userRow.lastName].join(" ");

  return (
    <OTouchable
      className="mt-sm flex-row items-center justify-between"
      onPress={() => {
        onPress ? onPress() : router.push(`/(modals)/${userRow.id}`);
      }}
    >
      <View className="gap-sm flex-1 flex-row items-center">
        <UserAvatar size="sm" user={userRow} />
        <View className="min-w-0 flex-1 flex-col">
          <View className="gap-sm flex-row items-center">
            <OText className="shrink-1 text-xl" numberOfLines={1}>
              {userRow.handle ?? fullName}
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
    </OTouchable>
  );
};
