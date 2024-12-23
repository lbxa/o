import { View } from "react-native";

import { Skeleton } from "@/universe/atoms";
import { Ozone } from "@/universe/molecules/Ozone";

export const CommunityManageSkeleton = () => {
  return (
    <Ozone>
      <View className="flex flex-col gap-md p-md">
        <Skeleton className="mx-auto mb-md size-[200px] rounded-full" />
        <View className="mb-lg flex flex-col gap-sm">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </View>
      </View>
    </Ozone>
  );
};
