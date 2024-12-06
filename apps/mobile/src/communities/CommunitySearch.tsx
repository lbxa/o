import { View } from "react-native";

import { OSearchBar } from "../universe/molecules";

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
      <OSearchBar
        searchQuery=""
        onSearchChange={() => null}
        placeholder="Community name"
      />
    </View>
  );
};
