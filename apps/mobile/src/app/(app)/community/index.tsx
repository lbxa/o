import { Ozone } from "@universe/molecules";
import { useFocusEffect } from "expo-router";
import { Suspense, useCallback } from "react";
import { Text, View } from "react-native";
import { useQueryLoader } from "react-relay";

import type { CommunityListQuery } from "../../../__generated__/CommunityListQuery.graphql";
import { COMMUNITY_LIST_QUERY, CommunityList } from "../../../communities";

export default function CommunityHomeRoute() {
  const [communityListQueryRef, loadCommunityList, disposeCommunityList] =
    useQueryLoader<CommunityListQuery>(COMMUNITY_LIST_QUERY);

  useFocusEffect(
    useCallback(() => {
      if (!communityListQueryRef) {
        loadCommunityList({});
        console.log("communityListQueryRef", communityListQueryRef);
      }

      return () => disposeCommunityList();
    }, [])
  );

  return (
    <Ozone>
      <View className="px-md">
        <Suspense fallback={<Text>Loading...</Text>}>
          {communityListQueryRef && (
            <CommunityList queryRef={communityListQueryRef} />
          )}
        </Suspense>
      </View>
    </Ozone>
  );
}
