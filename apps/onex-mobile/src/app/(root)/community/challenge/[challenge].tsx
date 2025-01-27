import { useLocalSearchParams } from "expo-router";
import { Suspense, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useQueryLoader } from "react-relay";

import type { ChallengeRootQuery } from "@/__generated__/ChallengeRootQuery.graphql";
import {
  ChallengeActivitySkeleton,
  ChallengeDetailsSkeleton,
} from "@/challenges";
import {
  CHALLENGE_ROOT_QUERY,
  ChallengeRoot,
} from "@/challenges/ChallengeRoot";
import { Skeleton } from "@/universe/atoms/Skeleton";
import { Ozone } from "@/universe/molecules";

export default function ChallengeDetailsRoute() {
  const { challenge: challengeId } = useLocalSearchParams<{
    challenge: string;
  }>();
  const [queryRef, loadQuery, disposeQuery] =
    useQueryLoader<ChallengeRootQuery>(CHALLENGE_ROOT_QUERY);

  useEffect(() => {
    loadQuery({ challengeId });

    return () => disposeQuery();
  }, [challengeId, disposeQuery, loadQuery]);

  return (
    <Suspense
      fallback={
        <Ozone>
          <ScrollView>
            <View className="mb-md flex flex-col gap-md px-md">
              <Skeleton className="mt-md h-10 w-full rounded-xl" />
              <Skeleton className="h-10 w-1/2 rounded-xl" />
              <ChallengeDetailsSkeleton />
            </View>
            <ChallengeActivitySkeleton />
          </ScrollView>
        </Ozone>
      }
    >
      {queryRef && (
        <ChallengeRoot challengeId={challengeId} queryRef={queryRef} />
      )}
    </Suspense>
  );
}
