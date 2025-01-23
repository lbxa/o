import { View } from "react-native";

import { Skeleton } from "@/universe/atoms";

export const ChallengeSocialsSkeleton = () => {
  return (
    <View className="flex flex-row items-center">
      <Skeleton className="z-30 size-12 rounded-full border border-white" />
      <Skeleton className="z-20 -ml-4 size-12 rounded-full border border-white" />
      <Skeleton className="z-10 -ml-4 size-12 rounded-full border border-white" />
    </View>
  );
};
