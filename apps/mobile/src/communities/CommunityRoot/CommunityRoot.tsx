import { Stack } from "expo-router";
import { View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import { graphql, useLazyLoadQuery, usePreloadedQuery } from "react-relay";

import { MiniNav, Ozone } from "@/universe/molecules";

import type { CommunityDetailsQuery } from "../../__generated__/CommunityDetailsQuery.graphql";
import type { CommunityRootQuery } from "../../__generated__/CommunityRootQuery.graphql";
import { CommunityChallenges } from "./CommunityChallenges";
import { COMMUNITY_DETAILS_QUERY } from "./CommunityDetails";
import { CommunityTitle } from "./CommunityTitle";

export const COMMUNITY_ROOT_QUERY = graphql`
  query CommunityRootQuery($communityId: ID!) {
    community(id: $communityId) {
      ...CommunityChallenges_community
    }
  }
`;

interface CommunityRootProps {
  communityId: string;
  communityRootQueryRef: PreloadedQuery<CommunityRootQuery>;
}
export const CommunityRoot = ({
  communityId,
  communityRootQueryRef,
}: CommunityRootProps) => {
  const communityRootData = usePreloadedQuery<CommunityRootQuery>(
    COMMUNITY_ROOT_QUERY,
    communityRootQueryRef
  );

  const query = useLazyLoadQuery<CommunityDetailsQuery>(
    COMMUNITY_DETAILS_QUERY,
    { id: communityId },
    { fetchPolicy: "store-and-network" }
  );

  return (
    <Ozone>
      <Stack.Screen
        options={{
          headerLeft: () => <CommunityTitle community={query.community} />,
          headerRight: () => (
            <MiniNav
              items={["create"]}
              itemConfigs={{
                create: {
                  href: "/(app)/community/challenge/create",
                },
              }}
            />
          ),
        }}
      />
      <View>
        {communityRootData.community && (
          <CommunityChallenges fragmentRef={communityRootData.community} />
        )}
      </View>
    </Ozone>
  );
};
