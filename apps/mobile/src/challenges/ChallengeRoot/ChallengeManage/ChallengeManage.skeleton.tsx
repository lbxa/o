import { View } from "react-native";

import { Skeleton } from "@/universe/atoms";
import { Ozone } from "@/universe/molecules/Ozone";

export const ChallengeManageSkeleton = () => {
  return (
    <Ozone>
      <View className="p-md">
        <View className="mb-lg flex flex-col gap-sm">
          {/* Title row skeleton */}
          <View className="flex-row items-center justify-between border-b border-gray-100 py-sm dark:border-gray-800">
            <Skeleton className="h-5 w-16 rounded-lg" />
            <Skeleton className="h-5 w-32 rounded-lg" />
          </View>

          {/* Description row skeleton */}
          <View className="flex-row items-center justify-between border-b border-gray-100 py-sm dark:border-gray-800">
            <Skeleton className="h-5 w-16 rounded-lg" />
            <Skeleton className="h-5 w-40 rounded-lg" />
          </View>

          {/* Duration row skeleton */}
          <View className="flex-row items-center justify-between border-b border-gray-100 py-sm dark:border-gray-800">
            <Skeleton className="h-5 w-16 rounded-lg" />
            <Skeleton className="h-5 w-24 rounded-lg" />
          </View>
        </View>

        {/* Action button skeleton */}
        <Skeleton className="h-10 w-full rounded-xl" />
      </View>
    </Ozone>
  );
};
