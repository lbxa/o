import { useEffect } from "react";
import { View } from "react-native";
import { useQueryLoader } from "react-relay";

import { COMMUNITY_LIST_QUERY, CommunityList } from "@/communities";
import { Ozone } from "@/universe/molecules";

import type { CommunityListQuery } from "../../../__generated__/CommunityListQuery.graphql";

export default function CommunityHomeRoute() {
  const [communityListQueryRef, loadCommunityList, disposeCommunityList] =
    useQueryLoader<CommunityListQuery>(COMMUNITY_LIST_QUERY);

  useEffect(() => {
    loadCommunityList({});

    return () => disposeCommunityList();
  }, []);

  return (
    <Ozone>
      <View>
        {communityListQueryRef && (
          <CommunityList queryRef={communityListQueryRef} />
        )}
      </View>
    </Ozone>
  );
}
