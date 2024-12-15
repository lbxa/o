import CrissCrossIcon from "@assets/icons/criss-cross.svg";
import React from "react";
import { Text } from "react-native";

import { useZustStore } from "@/state";

import { PillArray } from "../../../universe/molecules";
import { useSvgFill } from "../../../utils";
import {
  challengeActivityGoalToLabel,
  challengeActivityTypeToLabel,
  challengeActivityUnitToLabel,
} from "../../ChallengeActivity/domain";

const EmptyState = () => {
  const svgFill = useSvgFill();
  return (
    <>
      <CrissCrossIcon width={25} fill={svgFill} />
      <Text className="pl-sm dark:text-ivory text-black">
        Choose from a blend of options
      </Text>
    </>
  );
};

export const ChallengeCreateActivitySummary = () => {
  const challengeForm = useZustStore((state) => state.challengeForm);

  const fields = {
    type: challengeForm.type
      ? challengeActivityTypeToLabel(challengeForm.type)
      : null,
    goal: challengeForm.goal
      ? challengeActivityGoalToLabel(challengeForm.goal)
      : null,
    target: challengeForm.target?.toString() ?? null,
    unit: challengeForm.unit
      ? challengeActivityUnitToLabel(challengeForm.unit)
      : null,
  };

  const hasAnyField = Object.values(fields).some(Boolean);
  if (!hasAnyField) {
    return <EmptyState />;
  }

  return (
    <PillArray
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      pill1={fields.type!}
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      pill2={fields.goal!}
      pill3={
        fields.target
          ? [fields.target, fields.unit !== "None" ? fields.unit : ""]
              .filter(Boolean)
              .join(" ")
          : undefined
      }
    />
  );
};
