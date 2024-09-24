import { Ozone } from "@universe/molecules";
import { useEffect } from "react";
import { View } from "react-native";
import { useQueryLoader } from "react-relay";

import type { CommunityListQuery } from "../../../__generated__/CommunityListQuery.graphql";
import { COMMUNITY_LIST_QUERY, CommunityList } from "../../../communities";

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
