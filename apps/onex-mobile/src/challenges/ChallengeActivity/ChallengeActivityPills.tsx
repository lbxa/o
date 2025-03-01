/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import type {
  ChallengeActivityGoal,
  ChallengeActivityType,
} from "@o/onex-api-gql";
import type { ChallengeActivityUnits } from "@o/onex-api-gql";
import { graphql, useFragment } from "react-relay";

import type { ChallengeActivityPills_challenge$key } from "@/__generated__/ChallengeActivityPills_challenge.graphql";
import { PillArray } from "@/universe/molecules";

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
    <PillArray
      pill1={
        challenge?.activity?.type &&
        challengeActivityTypeToLabel(
          challenge.activity.type as ChallengeActivityType
        )
      }
      pill2={
        challenge?.activity?.goal &&
        challengeActivityGoalToLabel(
          challenge.activity.goal as ChallengeActivityGoal
        )
      }
      pill3={
        challenge?.activity?.target
          ? `${challenge.activity.target}${
              challenge.activity.unit
                ? " " +
                  challengeActivityUnitToLabel(
                    challenge.activity.unit as ChallengeActivityUnits
                  )
                : ""
            }`
          : undefined
      }
    />
  );
};
