import { View } from "react-native";

import { OButton, PrimaryTextInput } from "@/universe/atoms";

// export const COMMUNITY_SEARCH_QUERY = graphql`
//   query CommunitySearchQuery($id: ID!) {
//     community(id: $id) {
//       id
//       name
//     }
//   }
// `;

export const CommunitySearch = () => {
  return (
    <View className="mb-md">
      <PrimaryTextInput className="mb-md" placeholder="Community name" />
      <OButton title="Search" />
    </View>
  );
};
