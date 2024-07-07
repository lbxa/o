import { PrimaryButton, PrimaryTextInput, Title } from "@universe/atoms";
import { View } from "react-native";
import { graphql } from "react-relay";

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
      <Title title="Search" />
      <PrimaryTextInput className="mb-md" placeholder="Community name" />
      <PrimaryButton title="Search" />
    </View>
  );
};
