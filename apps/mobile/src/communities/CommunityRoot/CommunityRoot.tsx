import { Stack } from "expo-router";
import type { PreloadedQuery } from "react-relay";
import { graphql, usePreloadedQuery } from "react-relay";

import type { CommunityRootQuery } from "@/__generated__/CommunityRootQuery.graphql";
import { MiniNav, Ozone } from "@/universe/molecules";

import { useSharedHeaderOptions } from "../../shared";
import { ChallengeList } from "./ChallengeList";
import { CommunityTitle } from "./CommunityTitle";

export const COMMUNITY_ROOT_QUERY = graphql`
  query CommunityRootQuery($communityId: ID!) {
    viewer {
      ...ChallengeList_viewer @arguments(communityId: $communityId, count: 10)
      community(communityId: $communityId) {
        ...CommunityTitle_community
        ...CommunityDetails_community
        ...CommunityInvitationAcceptList_community @arguments(count: 1)
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
  const sharedHeaderOptions = useSharedHeaderOptions();
  return (
    <Ozone>
      <Stack.Screen
        options={{
          ...sharedHeaderOptions,
          headerLeft: () => (
            <CommunityTitle community={communityRootData.viewer?.community} />
          ),
          headerRight: () => (
            <MiniNav
              items={["manage", "create", "message"]}
              itemConfigs={{
                manage: {
                  href: "/(root)/community/community-manage",
                },
                create: {
                  href: "/(root)/community/challenge/create",
                },
                message: {
                  href: "/(root)/community/community-message",
                },
              }}
            />
          ),
        }}
      />
      {communityRootData.viewer?.community && (
        <ChallengeList
          challengeListFragmentRef={communityRootData.viewer}
          communityDetailsFragmentRef={communityRootData.viewer.community}
          communityInvitationAcceptListFragmentRef={
            communityRootData.viewer.community
          }
        />
      )}
    </Ozone>
  );
};
