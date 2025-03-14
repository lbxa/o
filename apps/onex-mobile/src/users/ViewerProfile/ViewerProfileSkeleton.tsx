import { ScrollView, View } from "react-native";

import { Skeleton } from "@/universe/atoms";
import { Ozone } from "@/universe/molecules";

export const ViewerProfileSkeleton = () => {
  return (
    <Ozone>
      <ScrollView>
        <View className="mb-md gap-lg p-md flex grow flex-col items-center">
          {/* Avatar skeleton */}
          <Skeleton className="mb-md size-[200px] rounded-full" />

          {/* Stats skeleton */}
          <View className="mb-md flex w-full flex-row justify-around">
            <View className="flex items-center">
              <Skeleton className="mb-sm h-5 w-16 rounded-lg" />
              <Skeleton className="h-4 w-12 rounded-lg" />
            </View>
            <View className="flex items-center">
              <Skeleton className="mb-sm h-5 w-16 rounded-lg" />
              <Skeleton className="h-4 w-12 rounded-lg" />
            </View>
            <View className="flex items-center">
              <Skeleton className="mb-sm h-5 w-16 rounded-lg" />
              <Skeleton className="h-4 w-12 rounded-lg" />
            </View>
          </View>

          {/* Name and handle skeleton */}
          <View className="gap-sm flex flex-col items-center">
            <Skeleton className="h-8 w-48 rounded-lg" />
            <Skeleton className="h-5 w-32 rounded-lg" />
          </View>

          {/* Bio skeleton */}
          <Skeleton className="mt-md h-16 w-full rounded-lg" />
        </View>
      </ScrollView>
    </Ozone>
  );
};
