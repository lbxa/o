import { Stack, useLocalSearchParams } from "expo-router";
import { Suspense, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useQueryLoader } from "react-relay";

import type { CommunityRootQuery } from "@/__generated__/CommunityRootQuery.graphql";
import {
  COMMUNITY_ROOT_QUERY,
  CommunityDetailsSkeleton,
  CommunityRoot,
} from "@/communities";
import { ChallengeListSkeleton } from "@/communities";
import { Skeleton } from "@/universe/atoms";
import { Ozone } from "@/universe/molecules";

export default function CommunityDetailsRoute() {
  const { community: communityId } = useLocalSearchParams<{
    community: string;
  }>();

  const [
    communityRootQueryRef,
    loadCommunityRootQuery,
    disposeCommunityRootQuery,
  ] = useQueryLoader<CommunityRootQuery>(COMMUNITY_ROOT_QUERY);

  useEffect(() => {
    loadCommunityRootQuery({ communityId: communityId });

    return () => disposeCommunityRootQuery();
  }, [communityId, disposeCommunityRootQuery, loadCommunityRootQuery]);

  return (
    <Suspense
      fallback={
        <Ozone>
          <Stack.Screen
            options={{
              // headerLeft: () => (
              //   <Skeleton className="mr-auto h-8 w-10/12 rounded-xl" />
              // ),
              headerRight: () => (
                <View className="flex flex-row items-center">
                  <Skeleton className="size-8 rounded-full" />
                  <Skeleton className="ml-sm size-8 rounded-full" />
                </View>
              ),
            }}
          />
          <ScrollView>
            <View className="my-md px-md">
              <CommunityDetailsSkeleton />
            </View>
            <ChallengeListSkeleton />
          </ScrollView>
        </Ozone>
      }
    >
      {communityRootQueryRef && (
        <CommunityRoot queryRef={communityRootQueryRef} />
      )}
    </Suspense>
  );
}
