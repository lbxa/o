import CrissCrossIcon from "@assets/icons/criss-cross.svg";
import React from "react";
import { ScrollView, Text, View } from "react-native";

import { useZustStore } from "@/state";

import {
  challengeActivityGoalToLabel,
  challengeActivityTypeToLabel,
  challengeActivityUnitToLabel,
} from "../../ChallengeActivity/domain";

export const ChallengeCreateActivitySummary = () => {
  const challengeForm = useZustStore((state) => state.challengeForm);

  const fields = [
    challengeForm.type && challengeActivityTypeToLabel(challengeForm.type),
    challengeForm.goal && challengeActivityGoalToLabel(challengeForm.goal),
    challengeForm.target?.toString(),
    challengeForm.unit && challengeActivityUnitToLabel(challengeForm.unit),
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
          <View className="bg-navy px-md py-sm z-50 rounded-xl">
            <Text className="font-bold text-indigo-100">{first}</Text>
          </View>
        )}
        {second && (
          <View className="-ml-md bg-indigo py-sm pl-lg pr-md z-40 rounded-xl">
            <Text className="font-bold text-indigo-100">{second}</Text>
          </View>
        )}
        {third && (
          <View className="-ml-md bg-violet py-sm pl-lg pr-md z-30 rounded-xl">
            <Text className="font-bold text-indigo-100">
              {third + " " + (fourth === "None" || !fourth ? "" : fourth)}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};
