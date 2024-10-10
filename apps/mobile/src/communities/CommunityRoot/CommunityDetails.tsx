import { Button } from "@universe/atoms";
import { useRouter } from "expo-router";
import { View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import { graphql, usePreloadedQuery } from "react-relay";

import type { CommunityDetailsQuery } from "../../__generated__/CommunityDetailsQuery.graphql";

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
      <Button title="Share" variant="indigo" className="rounded-xl" />
      <Button
        title="Invite"
        variant="indigo"
        className="rounded-xl"
        onPress={() => router.push("/(app)/community/invite")}
      />
    </View>
  );
};
