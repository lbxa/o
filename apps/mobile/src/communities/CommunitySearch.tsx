import { View } from "react-native";
import { graphql } from "react-relay";

import { OButton, PrimaryTextInput } from "@/universe/atoms";

export const COMMUNITY_SEARCH_QUERY = graphql`
  query CommunitySearchQuery($id: ID!) {
    community(id: $id) {
      ...CommunityFragment
    }
  }
`;

export const CommunitySearch = () => {
  return (
    <View className="mb-md">
      <PrimaryTextInput className="mb-md" placeholder="Community name" />
      <OButton title="Search" />
    </View>
  );
};
