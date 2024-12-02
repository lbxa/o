import { View } from "react-native";

import { ChallengeSocialsSkeleton } from "@/challenges/ChallengeSocials";
import { Skeleton } from "@/universe/atoms";

export const CommunityDetailsSkeleton = () => {
  return (
    <View className="flex flex-col gap-md">
      <View className="flex flex-row items-center gap-sm">
        <ChallengeSocialsSkeleton />
        <View className="flex flex-col gap-sm">
          <Skeleton className="h-4 w-[100px] rounded-2xl" />
          <Skeleton className="h-4 w-[200px] rounded-2xl" />
        </View>
      </View>
      <View className="flex flex-row gap-sm">
        <Skeleton className="h-10 w-[100px] rounded-xl" />
        <Skeleton className="h-10 w-[100px] rounded-xl" />
      </View>
    </View>
  );
};
