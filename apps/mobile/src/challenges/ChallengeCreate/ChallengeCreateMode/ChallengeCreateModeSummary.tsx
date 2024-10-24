import VerifiedBadgeIcon from "@assets/icons/verified-badge.svg";
import { Text, View } from "react-native";

import { useZustStore } from "@/state";

import { challengeModeToLabel } from "../../ChallengeMode";

export const ChallengeCreateModeSummary = () => {
  const challengeForm = useZustStore((state) => state.challengeForm);

  if (!challengeForm.mode) {
    return (
      <>
        <VerifiedBadgeIcon width={20} height={20} fill="black" />
        <Text className="pl-sm">What proof is needed?</Text>
      </>
    );
  }

  return (
    <View className="mx-sm rounded-lg">
      <View className="rounded-xl bg-navy px-md py-sm">
        <Text className="font-bold text-indigo-100">
          {challengeModeToLabel(challengeForm.mode)}
        </Text>
      </View>
    </View>
  );
};
