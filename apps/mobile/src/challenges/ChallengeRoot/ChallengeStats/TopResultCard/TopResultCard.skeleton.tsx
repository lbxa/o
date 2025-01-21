import { View } from "react-native";

import { Skeleton } from "@/universe/atoms";

export const TopResultCardSkeleton = () => {
  return (
    <View className="px-md flex-row items-center justify-between">
      <View className="gap-sm flex-row items-center">
        {/* Avatar skeleton */}
        <Skeleton className="size-12 rounded-full" />

        <View className="gap-sm flex flex-col">
          <View className="gap-sm flex-row items-center">
            {/* Name skeleton */}
            <Skeleton className="h-6 w-32 rounded" />
          </View>
          {/* Friends text skeleton */}
          <Skeleton className="h-4 w-40 rounded" />
        </View>
      </View>

      {/* Result number skeleton */}
      <Skeleton className="h-8 w-16 rounded" />
    </View>
  );
};
