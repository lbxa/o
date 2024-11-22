import { Stack } from "expo-router";
import type { PreloadedQuery } from "react-relay";
import { graphql, useLazyLoadQuery, usePreloadedQuery } from "react-relay";

import { MiniNav, Ozone } from "@/universe/molecules";

import type { CommunityDetailsQuery } from "../../__generated__/CommunityDetailsQuery.graphql";
import type { CommunityRootQuery } from "../../__generated__/CommunityRootQuery.graphql";
import { ChallengeList } from "./ChallengeList";
import { COMMUNITY_DETAILS_QUERY } from "./CommunityDetails";
import { CommunityTitle } from "./CommunityTitle";

export const COMMUNITY_ROOT_QUERY = graphql`
  query CommunityRootQuery($communityId: ID!) {
    viewer {
      ...ChallengeList_viewer @arguments(communityId: $communityId, count: 10)
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
    { id: communityId }
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
                  href: "/(root)/community/challenge/create",
                },
              }}
            />
          ),
        }}
      />
      {communityRootData.viewer && (
        <ChallengeList fragmentRef={communityRootData.viewer} />
      )}
    </Ozone>
  );
};
