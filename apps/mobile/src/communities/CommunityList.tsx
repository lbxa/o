import { CommunityCard } from "@universe/molecules";
import { useEffect } from "react";
import { Text, View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import { graphql, usePreloadedQuery } from "react-relay";

import type { CommunityListQuery } from "../__generated__/CommunityListQuery.graphql";

export const COMMUNITY_LIST_QUERY = graphql`
  query CommunityListQuery {
    communities {
      ...CommunityFragment
    }
  }
`;

interface Props {
  queryRef: PreloadedQuery<CommunityListQuery>;
}

export const CommunityList = ({ queryRef }: Props) => {
  const data = usePreloadedQuery(COMMUNITY_LIST_QUERY, queryRef);

  useEffect(() => {
    console.log("Data", data);
  }, [data]);

  return (
    <View>
      <Text>Test</Text>
      {data.communities?.map((community, i) => (
        <CommunityCard key={i} community={community} />
      ))}
    </View>
  );
};
