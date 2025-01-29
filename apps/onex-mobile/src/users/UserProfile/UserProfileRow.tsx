import { useRouter } from "expo-router";
import { View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { UserProfileRow_user$key } from "@/__generated__/UserProfileRow_user.graphql";
import { OText, OTouchable } from "@/universe/atoms";
import { UserAvatar } from "@/users/UserAvatar";
import { UserStreak } from "@/users/UserStreak";

const And = () => <OText className="font-normal">and</OText>;

export const UserProfileRow = ({
  user,
  rightItems,
  profileOutline,
  onPress,
}: {
  user: UserProfileRow_user$key;
  rightItems?: React.ReactNode;
  profileOutline?: "green";
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
        mutualCount
        firstMutualFriend {
          id
          firstName
          lastName
          handle
        }
      }
    `,
    user
  );

  const fullName = [userRow.firstName, userRow.lastName].join(" ");
  const mutualCount = userRow.firstMutualFriend
    ? (userRow.mutualCount ?? 0) - 1
    : (userRow.mutualCount ?? 0);

  return (
    <OTouchable
      className="mt-sm flex-row items-center justify-between"
      onPress={() => {
        onPress ? onPress() : router.push(`/(modals)/${userRow.id}`);
      }}
    >
      <View className="flex-1 flex-row items-center gap-sm">
        <UserAvatar size="sm" user={userRow} outline={profileOutline} />
        <View className="min-w-0 flex-1 flex-col">
          <View className="flex-row items-center gap-sm">
            <OText className="shrink-1 text-xl" numberOfLines={1}>
              {userRow.handle ?? fullName}
            </OText>
            <UserStreak streak={userRow.streak?.currentStreak ?? 0} />
          </View>
          {mutualCount > 0 && (
            <OText className="text-sm" numberOfLines={1}>
              Friends with{" "}
              <OText
                className="font-bold"
                onPress={() =>
                  router.push(`/(modals)/${userRow.firstMutualFriend?.id}`)
                }
              >
                {userRow.firstMutualFriend?.firstName}
              </OText>
              <OText className="font-bold">
                {mutualCount === 2 && (
                  <>
                    {" "}
                    <And /> {mutualCount - 1} other
                  </>
                )}
                {mutualCount > 2 && (
                  <>
                    {" "}
                    <And /> {mutualCount - 1} others
                  </>
                )}
              </OText>
            </OText>
          )}
        </View>
        {rightItems}
      </View>
    </OTouchable>
  );
};
