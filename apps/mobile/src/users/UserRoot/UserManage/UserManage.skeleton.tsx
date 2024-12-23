import { View } from "react-native";

import { Skeleton } from "@/universe/atoms";
import { Ozone } from "@/universe/molecules/Ozone";

export const UserManageSkeleton = () => {
  return (
    <Ozone>
      <View className="p-md">
        <View className="mb-lg flex flex-col gap-sm">
          {/* Name row skeleton */}
          <View className="flex-row items-center justify-between border-b border-gray-100 py-sm dark:border-gray-800">
            <Skeleton className="h-5 w-16 rounded-lg" />
            <Skeleton className="h-5 w-32 rounded-lg" />
          </View>

          {/* Handle row skeleton */}
          <View className="flex-row items-center justify-between rounded-xl border-b border-gray-100 py-sm dark:border-gray-800">
            <Skeleton className="h-5 w-16 rounded-lg" />
            <Skeleton className="h-5 w-24 rounded-lg" />
          </View>

          {/* Email row skeleton */}
          <View className="flex-row items-center justify-between border-b border-gray-100 py-sm dark:border-gray-800">
            <Skeleton className="h-5 w-16 rounded-lg" />
            <Skeleton className="h-5 w-40 rounded-lg" />
          </View>
        </View>

        {/* Logout button skeleton */}
        <Skeleton className="h-10 w-full rounded-xl" />
      </View>
    </Ozone>
  );
};
