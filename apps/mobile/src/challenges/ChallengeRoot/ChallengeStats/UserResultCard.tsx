import { Text, View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type {
  ChallengeActivityMeasurement,
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
          measurement
        }
      }
    `,
    result
  );

  const displayResult = (
    result: number,
    measurement: ChallengeActivityMeasurement
  ) => {
    switch (measurement) {
      case "COUNTING":
        return result.toString();
      case "DURATION":
        return intToTimestamp(result).toString();
      case "IMPROVEMENT":
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
        {displayResult(userResult.result, userResult.activity.measurement)}
      </Text>
    </View>
  );
};
