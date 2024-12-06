import StopwatchIcon from "@assets/icons/stopwatch.svg";
import React from "react";
import { Text } from "react-native";

import { useZustStore } from "@/state";

import { PillArray } from "../../../universe/molecules";
import { challengeCadenceToLabel } from "../../ChallengeCadence";

const EmptyState = () => (
  <>
    <StopwatchIcon width={20} />
    <Text className="pl-sm">Select the frequency</Text>
  </>
);

export const ChallengeCreateCadenceSummary = () => {
  const challengeForm = useZustStore((state) => state.challengeForm);

  if (!challengeForm.cadence) {
    return <EmptyState />;
  }

  return <PillArray pill1={challengeCadenceToLabel(challengeForm.cadence)} />;
};
