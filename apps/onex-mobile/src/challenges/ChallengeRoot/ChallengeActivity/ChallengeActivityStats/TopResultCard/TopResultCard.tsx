import { graphql, useFragment } from "react-relay";

import type {
  ChallengeActivityGoal,
  ChallengeActivityUnits,
  TopResultCard_challenge$key,
} from "@/__generated__/TopResultCard_challenge.graphql";
import { OText } from "@/universe/atoms";
import { UserProfileRow } from "@/users";

import { intToTimestamp } from "../../../../ChallengeLogger/utils";

export const TopResultCard = ({
  result,
}: {
  result: TopResultCard_challenge$key;
}) => {
  const userResult = useFragment(
    graphql`
      fragment TopResultCard_challenge on ChallengeActivityResult {
        id
        user {
          ...UserProfileRow_user
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

  const rightItems = (
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
  );

  return (
    <UserProfileRow
      user={userResult.user}
      rightItems={rightItems}
      onPress={() => {}}
    />
  );
};
