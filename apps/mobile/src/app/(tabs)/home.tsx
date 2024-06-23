import { Title } from "@universe/atoms";
import { Ozone } from "@universe/molecules";
import React, { useEffect } from "react";
import { View } from "react-native";
import { useQueryLoader } from "react-relay";

import type { CommunityListQuery } from "../../__generated__/CommunityListQuery.graphql";
import {
  COMMUNITY_LIST_QUERY,
  CommunityCreate,
  CommunityList,
} from "../../communities";

export default function Home() {
  const [communityListQueryRef, loadCommunityList] =
    useQueryLoader<CommunityListQuery>(COMMUNITY_LIST_QUERY);

  useEffect(() => {
    loadCommunityList({});
  }, []);

  return (
    <Ozone>
      <View className="px-md">
        <Title title="Create a community" />
        <CommunityCreate />
        <Title title="Communities" />
        {communityListQueryRef && (
          <CommunityList queryRef={communityListQueryRef} />
        )}
      </View>
    </Ozone>
  );
}
