/* eslint-disable @stylistic/js/max-len */
import { View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { ChallengeActivityHistoryCard_challenge$key } from "@/__generated__/ChallengeActivityHistoryCard_challenge.graphql";
import { OText, Timestamp } from "@/universe/atoms";
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
        targetReached
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
    <View className="mt-sm flex-row items-center justify-between">
      <View className="gap-sm flex-1 flex-row items-center">
        <UserAvatar
          size="sm"
          user={userResult.user}
          outline={userResult.targetReached ? "green" : undefined}
        />
        <View className="min-w-0 flex-1 flex-col">
          <View className="gap-sm flex-row items-center">
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
    </View>
  );
  // return <UserProfileRow user={userResult.user} rightItems={rightItems} />;
};
