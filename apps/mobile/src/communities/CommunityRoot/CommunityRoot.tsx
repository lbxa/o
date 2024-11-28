import { Stack } from "expo-router";
import type { PreloadedQuery } from "react-relay";
import { graphql, usePreloadedQuery } from "react-relay";

import { MiniNav, Ozone } from "@/universe/molecules";

import type { CommunityRootQuery } from "../../__generated__/CommunityRootQuery.graphql";
import { ChallengeList } from "./ChallengeList";
import { CommunityTitle } from "./CommunityTitle";

export const COMMUNITY_ROOT_QUERY = graphql`
  query CommunityRootQuery($communityId: ID!) {
    viewer {
      ...ChallengeList_viewer @arguments(communityId: $communityId, count: 10)
      community(communityId: $communityId) {
        ...CommunityTitle_community
      }
    }
  }
`;

interface CommunityRootProps {
  queryRef: PreloadedQuery<CommunityRootQuery>;
}
export const CommunityRoot = ({ queryRef }: CommunityRootProps) => {
  const communityRootData = usePreloadedQuery<CommunityRootQuery>(
    COMMUNITY_ROOT_QUERY,
    queryRef
  );

  return (
    <Ozone>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <CommunityTitle community={communityRootData.viewer?.community} />
          ),
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
        <ChallengeList challengeListFragmentRef={communityRootData.viewer} />
      )}
    </Ozone>
  );
};
