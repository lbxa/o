/* eslint-disable @stylistic/js/max-len */
import { router } from "expo-router";
import { View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { ChallengeActivityHistoryCard_challenge$key } from "@/__generated__/ChallengeActivityHistoryCard_challenge.graphql";
import { OText, Timestamp } from "@/universe/atoms";
import { OTouchable } from "@/universe/atoms";
import { UserAvatar } from "@/users/UserAvatar";

export const ChallengeActivityHistoryCard = ({
  result,
}: {
  result: ChallengeActivityHistoryCard_challenge$key;
}) => {
  const userResult = useFragment(
    graphql`
      fragment ChallengeActivityHistoryCard_challenge on ChallengeActivityResult {
        id
        user {
          id
          firstName
          lastName
          handle
        }
        createdAt
        formattedResult
      }
    `,
    result
  );

  const rightItems = (
    <OText
      className="text-3xl font-bold"
      style={{ fontVariant: ["tabular-nums"] }}
    >
      {userResult.formattedResult}
    </OText>
  );

  const fullName = [userResult.user.firstName, userResult.user.lastName].join(
    " "
  );

  return (
    <OTouchable
      className="mt-sm flex-row items-center justify-between"
      onPress={() => {
        router.push(
          `/community/challenge/(challenge-history)/${userResult.user.id}`
        );
      }}
    >
      <View className="flex-1 flex-row items-center gap-sm">
        <UserAvatar size="sm" user={userResult.user} />
        <View className="min-w-0 flex-1 flex-col">
          <View className="flex-row items-center gap-sm">
            <OText className="shrink-1 text-xl" numberOfLines={1}>
              {userResult.user.handle ?? fullName}
            </OText>
          </View>
          {userResult.createdAt && (
            <Timestamp timestamp={userResult.createdAt} size="sm" />
          )}
        </View>
        {rightItems}
      </View>
    </OTouchable>
  );
  // return <UserProfileRow user={userResult.user} rightItems={rightItems} />;
};
