import { ScrollView, View } from "react-native";

import { Skeleton } from "@/universe/atoms";

export function FollowersListSkeleton() {
  return (
    <ScrollView>
      <View className="flex flex-col gap-sm p-sm">
        {Array.from({ length: 22 }, (_, i) => (
          <View key={i} className="h-10 w-full flex-row items-center gap-sm">
            <Skeleton className="size-10 rounded-full" />
            <Skeleton className="h-full w-1/3 flex-1 rounded-xl" />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
