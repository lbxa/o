import { View } from "react-native";

import { Skeleton } from "@/universe/atoms";

export const ChallengeListSkeleton = () => {
  return (
    <View className="gap-md px-sm flex flex-col">
      {Array.from({ length: 5 }, (_, i) => (
        <Skeleton key={i} className="h-40 w-full rounded-3xl" />
      ))}
    </View>
  );
};
