import { Suspense, useEffect } from "react";
import { View } from "react-native";
import { useQueryLoader } from "react-relay";

import type { CommunityListQuery } from "@/__generated__/CommunityListQuery.graphql";
import {
  COMMUNITY_LIST_QUERY,
  CommunityList,
  CommunityListSkeleton,
} from "@/communities";
import { Ozone } from "@/universe/molecules";

export default function CommunityHomeRoute() {
  const [communityListQueryRef, loadCommunityList, disposeCommunityList] =
    useQueryLoader<CommunityListQuery>(COMMUNITY_LIST_QUERY);

  useEffect(() => {
    loadCommunityList({}, { fetchPolicy: "store-and-network" });

    return () => disposeCommunityList();
  }, [disposeCommunityList, loadCommunityList]);

  return (
    <Suspense
      fallback={
        <Ozone>
          {/* <Stack.Screen
            options={{
              headerLeft: () => (
                <Skeleton className="mr-auto h-8 w-10/12 rounded-xl" />
              ),
              headerRight: () => (
                <View className="flex flex-row items-center gap-sm">
                  <Skeleton className="size-8 rounded-full" />
                  <Skeleton className="size-8 rounded-full" />
                  <Skeleton className="size-8 rounded-full" />
                </View>
              ),
            }}
          /> */}
          <View className="pt-sm">
            <CommunityListSkeleton />
          </View>
        </Ozone>
      }
    >
      <Ozone>
        {communityListQueryRef && (
          <CommunityList queryRef={communityListQueryRef} />
        )}
      </Ozone>
    </Suspense>
  );
}
