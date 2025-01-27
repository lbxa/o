import React from "react";
import { View } from "react-native";

import { TopResultCardSkeleton } from "@/challenges/ChallengeRoot/ChallengeActivity/ChallengeActivityStats/TopResultCard";

export const ChallengeActivityTopResultsListSkeleton = () => {
  return (
    <View className="flex flex-col gap-md pb-10">
      {Array.from({ length: 4 }, (_, i) => (
        <TopResultCardSkeleton key={i} />
      ))}
    </View>
  );
};
