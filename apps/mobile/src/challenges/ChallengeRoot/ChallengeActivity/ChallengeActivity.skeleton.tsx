import { View } from "react-native";

import { Skeleton } from "@/universe/atoms";

export const ChallengeActivitySkeleton = () => {
  return (
    <View className="flex flex-col gap-md px-md">
      {Array.from({ length: 10 }, (_, i) => (
        <Skeleton key={i} className="h-16 w-full rounded-3xl" />
      ))}
    </View>
  );
};
