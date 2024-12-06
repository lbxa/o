import VerifiedBadgeIcon from "@assets/icons/verified-badge.svg";
import React from "react";
import { Text } from "react-native";

import { useZustStore } from "@/state";

import { PillArray } from "../../../universe/molecules";
import { challengeModeToLabel } from "../../ChallengeMode";

const EmptyState = () => (
  <>
    <VerifiedBadgeIcon width={20} height={20} fill="black" />
    <Text className="pl-sm">Select a mode</Text>
  </>
);

export const ChallengeCreateModeSummary = () => {
  const challengeForm = useZustStore((state) => state.challengeForm);

  if (!challengeForm.mode) {
    return <EmptyState />;
  }

  return <PillArray pill1={challengeModeToLabel(challengeForm.mode)} />;
};
