import { FlatList, Text, View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import { graphql, useFragment, usePreloadedQuery } from "react-relay";

import type { CommunityChallengesListQuery } from "../../__generated__/CommunityChallengesListQuery.graphql";
import type { CommunityFragment$key } from "../../__generated__/CommunityFragment.graphql";
import { ChallengeCard } from "../../challenges";
import { COMMUNITY_FRAGMENT } from "../CommunityFragment";

export const COMMUNITY_CHALLENGES_LIST_QUERY = graphql`
  query CommunityChallengesListQuery($communityId: ID!) {
    communityChallenges(communityId: $communityId) {
      ...ChallengeFragment
    }
  }
`;

interface Props {
  communityFrag: CommunityFragment$key | undefined | null;
  challengesQueryRef: PreloadedQuery<CommunityChallengesListQuery>;
}

export const CommunityChallengesList = ({
  communityFrag,
  challengesQueryRef,
}: Props) => {
  const query = usePreloadedQuery<CommunityChallengesListQuery>(
    COMMUNITY_CHALLENGES_LIST_QUERY,
    challengesQueryRef
  );
  const data = useFragment(COMMUNITY_FRAGMENT, communityFrag);

  if (!data) {
    return <Text>Challenge not found</Text>;
  }

  return (
    <View>
      <Text className="mb-md text-2xl font-bold">Challenges</Text>
      <FlatList
        data={query.communityChallenges}
        ListHeaderComponent={<></>}
        renderItem={({ item }) => <ChallengeCard challengeFragment={item} />}
      />
    </View>
  );
};
