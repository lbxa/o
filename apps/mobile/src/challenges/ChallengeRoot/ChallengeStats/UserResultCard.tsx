import { Text, View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type {
  ChallengeActivityGoal,
  UserResultCard_challenge$key,
} from "@/__generated__/UserResultCard_challenge.graphql";

import { intToTimestamp } from "../../ChallengeLogger/utils";

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
        }
        result
        activity {
          id
          goal
        }
      }
    `,
    result
  );

  const displayResult = (result: number, goal: ChallengeActivityGoal) => {
    switch (goal) {
      case "HIGHEST_NUMBER":
      case "LOWEST_NUMBER":
      case "SPECIFIC_TARGET":
        return result.toString();
      case "SHORTEST_TIME":
      case "LONGEST_TIME":
        return intToTimestamp(result).toString();
      case "MOST_IMPROVED":
        return `${result}%`;
    }
  };

  return (
    <View className="mt-sm flex-row items-center justify-between">
      <View className="flex flex-col">
        <Text className="text-xl">
          {userResult.user.firstName + " " + userResult.user.lastName}
        </Text>
        <Text className="text-sm">
          Friends with{" "}
          <Text className="font-bold">{userResult.user.firstName}</Text> and{" "}
          <Text className="font-bold">2 others</Text>
        </Text>
      </View>
      <Text
        className="text-3xl font-bold"
        style={{ fontVariant: ["tabular-nums"] }}
      >
        {displayResult(userResult.result, userResult.activity.goal)}
      </Text>
    </View>
  );
};
