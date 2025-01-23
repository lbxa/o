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
