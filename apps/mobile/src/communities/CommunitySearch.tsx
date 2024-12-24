import tailwind from "@o/tailwind/base";
import { Stack } from "expo-router";
import { View } from "react-native";

import { useSharedHeaderOptions } from "../shared";
import { useOTheme } from "../utils";

const COLORS = tailwind.theme.extend.colors;

// export const COMMUNITY_SEARCH_QUERY = graphql`
//   query CommunitySearchQuery($id: ID!) {
//     community(id: $id) {
//       id
//       name
//     }
//   }
// `;

export const CommunitySearch = () => {
  const { isDark } = useOTheme();
  const { builtInTitleOptions } = useSharedHeaderOptions();
  return (
    <View className="mb-md flex flex-row items-center gap-sm">
      <Stack.Screen
        options={{
          ...builtInTitleOptions,
          headerSearchBarOptions: {
            autoFocus: true,
            placeholder: "My gym, etc.",
            headerIconColor: isDark ? COLORS.ivory.DEFAULT : "black",
            inputType: "text",
          },
        }}
      />
      {/* <OSearchBar
        searchQuery=""
        onSearchChange={() => null}
        placeholder="Community name"
      /> */}
    </View>
  );
};
