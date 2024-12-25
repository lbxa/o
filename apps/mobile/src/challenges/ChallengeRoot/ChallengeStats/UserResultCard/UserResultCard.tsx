import { View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type {
  ChallengeActivityGoal,
  ChallengeActivityUnits,
  UserResultCard_challenge$key,
} from "@/__generated__/UserResultCard_challenge.graphql";
import { OText } from "@/universe/atoms";
import { UserAvatar } from "@/users/UserAvatar";
import { UserStreak } from "@/users/UserStreak";

import { intToTimestamp } from "../../../ChallengeLogger/utils";

export const UserResultCard = ({
  result,
}: {
  result: UserResultCard_challenge$key;
}) => {
  const userResult = useFragment(
    graphql`
      fragment UserResultCard_challenge on ChallengeActivityResult {
        id
        user {
          id
          firstName
          lastName
          streak {
            id
            currentStreak
          }
        }
        result
        activity {
          id
          goal
          unit
        }
      }
    `,
    result
  );

  // TODO move this to the backend with formattedResult field
  const displayResult = (
    result: number,
    goal: ChallengeActivityGoal,
    unit: ChallengeActivityUnits
  ) => {
    switch (goal) {
      case "HIGHEST_NUMBER":
      case "LOWEST_NUMBER":
      case "SPECIFIC_TARGET":
        switch (unit) {
          case "KILOGRAMS":
          case "POUNDS":
            return `${result} kg`;
          case "SECONDS":
          case "MINUTES":
          case "HOURS":
            return intToTimestamp(result).toString();
          default:
            return result.toString();
        }
      case "SHORTEST_TIME":
      case "LONGEST_TIME":
        return intToTimestamp(result).toString();
      case "MOST_IMPROVED":
        return `${result}%`;
    }
  };

  return (
    <View className="mt-sm flex-row items-center justify-between">
      <View className="flex-row items-center gap-sm">
        <UserAvatar size="sm" user={userResult.user} />
        <View className="flex flex-col">
          <View className="flex-row items-center gap-sm">
            <OText className="text-xl">
              {userResult.user.firstName + " " + userResult.user.lastName}
            </OText>
            <UserStreak streak={userResult.user.streak?.currentStreak ?? 0} />
          </View>
          <OText className="text-sm">
            Friends with{" "}
            <OText className="font-bold">{userResult.user.firstName}</OText> and{" "}
            <OText className="font-bold">2 others</OText>
          </OText>
        </View>
      </View>
      <OText
        className="text-3xl font-bold"
        style={{ fontVariant: ["tabular-nums"] }}
      >
        {displayResult(
          userResult.result,
          userResult.activity.goal,
          userResult.activity.unit
        )}
      </OText>
    </View>
  );
};
