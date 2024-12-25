import { View } from "react-native";

import { Skeleton } from "@/universe/atoms";

export const UserResultCardSkeleton = () => {
  return (
    <View className="flex-row items-center justify-between px-md">
      <View className="flex-row items-center gap-sm">
        {/* Avatar skeleton */}
        <Skeleton className="size-12 rounded-full" />

        <View className="flex flex-col gap-sm">
          <View className="flex-row items-center gap-sm">
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
