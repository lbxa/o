import { useRouter } from "expo-router";
import { View } from "react-native";
import { graphql } from "react-relay";

import { OButton } from "@/universe/atoms";

export const COMMUNITY_DETAILS_QUERY = graphql`
  query CommunityDetailsQuery($id: ID!) {
    community(id: $id) {
      name
      ...CommunityFragment
    }
  }
`;

// interface Props {
//   queryRef: PreloadedQuery<CommunityDetailsQuery>;
// }

export const CommunityDetails = () => {
  const router = useRouter();
  // const query = usePreloadedQuery<CommunityDetailsQuery>(
  //   COMMUNITY_DETAILS_QUERY,
  //   queryRef
  // );

  return (
    <View className="mb-md flex flex-row gap-md pt-sm">
      <OButton title="Share" variant="indigo" className="rounded-xl" />
      <OButton
        title="Invite"
        variant="indigo"
        className="rounded-xl"
        onPress={() => router.push("/(app)/community/invite")}
      />
    </View>
  );
};
