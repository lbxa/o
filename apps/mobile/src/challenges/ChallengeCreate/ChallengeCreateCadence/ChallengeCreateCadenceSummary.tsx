import StopwatchIcon from "@assets/icons/stopwatch.svg";
import React from "react";
import { Text } from "react-native";

import { useZustStore } from "@/state";

import { PillArray } from "../../../universe/molecules";
import { useSvgFill } from "../../../utils";
import { challengeCadenceToLabel } from "../../ChallengeCadence";

const EmptyState = () => {
  const svgFill = useSvgFill();
  return (
    <>
      <StopwatchIcon width={20} fill={svgFill} />
      <Text className="pl-sm dark:text-ivory">Select the frequency</Text>
    </>
  );
};

export const ChallengeCreateCadenceSummary = () => {
  const challengeForm = useZustStore((state) => state.challengeForm);

  if (!challengeForm.cadence) {
    return <EmptyState />;
  }

  return <PillArray pill1={challengeCadenceToLabel(challengeForm.cadence)} />;
};
