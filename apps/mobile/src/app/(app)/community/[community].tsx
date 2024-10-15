import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { useQueryLoader } from "react-relay";

import { COMMUNITY_ROOT_QUERY, CommunityRoot } from "@/communities";

import type { CommunityRootQuery } from "../../../__generated__/CommunityRootQuery.graphql";

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
  }, [communityId]);

  return (
    <View>
      {communityRootQueryRef && (
        <CommunityRoot
          communityId={communityId}
          communityRootQueryRef={communityRootQueryRef}
        />
      )}
    </View>
  );
}
