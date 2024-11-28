/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import type { ChallengeActivityGoal, ChallengeActivityType } from "@o/api-gql";
import { ChallengeActivityUnits } from "@o/api-gql";
import { Text, View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { ChallengeActivityPills_challenge$key } from "@/__generated__/ChallengeActivityPills_challenge.graphql";

import {
  challengeActivityGoalToLabel,
  challengeActivityTypeToLabel,
  challengeActivityUnitToLabel,
} from "./domain";

export const ChallengeActivityPills = ({
  fragmentRef,
}: {
  fragmentRef: ChallengeActivityPills_challenge$key;
}) => {
  const challenge = useFragment<ChallengeActivityPills_challenge$key>(
    graphql`
      fragment ChallengeActivityPills_challenge on Challenge {
        id
        activity {
          id
          type
          goal
          target
          unit
        }
      }
    `,
    fragmentRef
  );

  return (
    <View className="flex flex-row gap-sm">
      <Text className="z-30 rounded-xl bg-navy px-md py-sm font-bold text-ivory">
        {challenge?.activity?.type &&
          challengeActivityTypeToLabel(
            challenge.activity.type as ChallengeActivityType
          )}
      </Text>
      <Text className="z-20 -ml-lg rounded-r-xl bg-indigo px-md py-sm pl-lg font-bold text-ivory">
        {challenge?.activity?.goal &&
          challengeActivityGoalToLabel(
            challenge.activity.goal as ChallengeActivityGoal
          )}
      </Text>
      {challenge?.activity?.target && (
        <Text className="z-10 -ml-lg rounded-r-xl bg-violet px-md py-sm pl-lg font-bold text-ivory">
          {[
            challenge.activity.target,
            challengeActivityUnitToLabel(
              challenge.activity.unit as ChallengeActivityUnits
            ),
          ]
            .filter(
              (str) =>
                str !==
                challengeActivityUnitToLabel(ChallengeActivityUnits.None)
            )
            .join(" ")}
        </Text>
      )}
    </View>
  );
};
