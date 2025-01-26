import { ScrollView, View } from "react-native";

import { Skeleton } from "@/universe/atoms";

export function FollowersListSkeleton() {
  return (
    <ScrollView>
      <View className="gap-sm px-sm py-sm flex flex-col">
        {Array.from({ length: 22 }, (_, i) => (
          <View key={i} className="gap-sm h-10 w-full flex-row items-center">
            <Skeleton className="size-10 rounded-full" />
            <Skeleton className="h-full w-1/3 flex-1 rounded-xl" />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
