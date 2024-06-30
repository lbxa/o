import { ContentCard } from "@universe/molecules";
import { router } from "expo-router";
import { View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import { graphql, usePreloadedQuery } from "react-relay";

import type { CommunityListQuery } from "../__generated__/CommunityListQuery.graphql";

export const COMMUNITY_LIST_QUERY = graphql`
  query CommunityListQuery {
    communities {
      _id: id
      name
    }
  }
`;

interface Props {
  queryRef: PreloadedQuery<CommunityListQuery>;
}

export const CommunityList = ({ queryRef }: Props) => {
  const data = usePreloadedQuery(COMMUNITY_LIST_QUERY, queryRef);

  return (
    <View>
      {data.communities?.map((community) => {
        return (
          <ContentCard
            key={community._id}
            title={community.name}
            body="Sample text"
            onPress={() => router.navigate("/(app)/community/" + community._id)}
          />
        );
      })}
    </View>
  );
};
