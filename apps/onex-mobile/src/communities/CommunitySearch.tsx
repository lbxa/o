import { Stack } from "expo-router";
import { View } from "react-native";

import { useSharedHeaderOptions } from "../shared";
import { useOTheme } from "../utils";

// export const COMMUNITY_SEARCH_QUERY = graphql`
//   query CommunitySearchQuery($id: ID!) {
//     community(id: $id) {
//       id
//       name
//     }
//   }
// `;

export const CommunitySearch = () => {
  const { isDark, colors } = useOTheme();
  const { builtInTitleOptions } = useSharedHeaderOptions();
  return (
    <View className="h-full flex-1 px-md">
      <Stack.Screen
        options={{
          ...builtInTitleOptions,
          headerSearchBarOptions: {
            autoFocus: true,
            placeholder: "My gym, etc.",
            headerIconColor: isDark ? colors.ivory.DEFAULT : "black",
            inputType: "text",
          },
        }}
      />
    </View>
  );
};
