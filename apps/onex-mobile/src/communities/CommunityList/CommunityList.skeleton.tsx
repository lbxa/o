import { ScrollView, View } from "react-native";

import { Skeleton } from "@/universe/atoms";

export const CommunityListSkeleton = () => {
  return (
    <ScrollView>
      <View className="flex flex-col gap-md px-sm">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-3xl" />
        ))}
      </View>
    </ScrollView>
  );
};
