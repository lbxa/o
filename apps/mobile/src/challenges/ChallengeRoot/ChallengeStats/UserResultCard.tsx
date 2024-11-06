import type { User } from "@ocorp/api";
import { Text, View } from "react-native";

import type { ChallengeActivityMeasurement } from "@/__generated__/ChallengeActivityTopResultsFragment_challenge.graphql";

import { intToTimestamp } from "../../ChallengeLogger/utils";

export const UserResultCard = ({
  user,
  result,
  measurement,
}: {
  user: User;
  result: number;
  measurement: ChallengeActivityMeasurement;
}) => {
  const displayResult = (result: number) => {
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
        <Text className="text-xl">{user.firstName + " " + user.lastName}</Text>
        <Text className="text-sm">
          Friends with <Text className="font-bold">{user.firstName}</Text> and{" "}
          <Text className="font-bold">2 others</Text>
        </Text>
      </View>
      <Text
        className="text-3xl font-bold"
        style={{ fontVariant: ["tabular-nums"] }}
      >
        {displayResult(result)}
      </Text>
    </View>
  );
};
