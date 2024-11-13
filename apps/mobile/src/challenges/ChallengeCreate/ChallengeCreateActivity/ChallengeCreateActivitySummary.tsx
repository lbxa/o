import CrissCrossIcon from "@assets/icons/criss-cross.svg";
import { ScrollView, Text, View } from "react-native";

import { useZustStore } from "@/state";

import {
  challengeActivityGoalToLabel,
  challengeActivityMeasurementToLabel,
  challengeActivityTypeToLabel,
  challengeActivityUnitToLabel,
} from "../../ChallengeActivity/domain";

export const ChallengeCreateActivitySummary = () => {
  const challengeForm = useZustStore((state) => state.challengeForm);

  const fields = [
    challengeForm.activity?.type &&
      challengeActivityTypeToLabel(challengeForm.activity.type),
    challengeForm.activity?.measurement &&
      challengeActivityMeasurementToLabel(challengeForm.activity.measurement),
    challengeForm.activity?.goal &&
      challengeActivityGoalToLabel(challengeForm.activity.goal),
    challengeForm.activity?.unit &&
      challengeActivityUnitToLabel(challengeForm.activity.unit),
  ];

  const [first, second, third, fourth] = fields;

  if (!first && !second && !third && !fourth) {
    return (
      <>
        <CrissCrossIcon width={25} />
        <Text className="pl-sm">Choose from a blend of options</Text>
      </>
    );
  }

  return (
    <ScrollView
      className="mx-sm rounded-lg"
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <View className="flex flex-row">
        {first && (
          <View className="z-50 rounded-xl bg-navy px-md py-sm">
            <Text className="font-bold text-indigo-100">{first}</Text>
          </View>
        )}
        {second && (
          <View className="z-40 -ml-md rounded-xl bg-indigo py-sm pl-lg pr-md">
            <Text className="font-bold text-indigo-100">{second}</Text>
          </View>
        )}
        {third && (
          <View className="z-30 -ml-md rounded-xl bg-violet py-sm pl-lg pr-md">
            <Text className="font-bold text-indigo-100">{third}</Text>
          </View>
        )}
        {fourth && (
          <View className="z-20 -ml-md rounded-xl bg-indigo/20 py-sm pl-lg pr-md">
            <Text className="font-bold text-indigo-100">{fourth}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};
