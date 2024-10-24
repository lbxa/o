import StopwatchIcon from "@assets/icons/stopwatch.svg";
import { Text, View } from "react-native";

import { useZustStore } from "@/state";

import { challengeCadenceToLabel } from "../../ChallengeCadence";

export const ChallengeCreateCadenceSummary = () => {
  const challengeForm = useZustStore((state) => state.challengeForm);

  if (!challengeForm.cadence) {
    return (
      <>
        <StopwatchIcon width={20} />
        <Text className="pl-sm">How often will you post your progress?</Text>
      </>
    );
  }

  return (
    <View className="mx-sm rounded-lg">
      <View className="rounded-xl bg-navy px-md py-sm">
        <Text className="font-bold text-indigo-100">
          {challengeCadenceToLabel(challengeForm.cadence)}
        </Text>
      </View>
    </View>
  );
};
