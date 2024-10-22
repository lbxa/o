import { useCallback, useTransition } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { graphql, useRefetchableFragment } from "react-relay";

import type { CommunityChallenges_challenges$key } from "@/__generated__/CommunityChallenges_challenges.graphql";
import type { CommunityChallengesRefreshQuery } from "@/__generated__/CommunityChallengesRefreshQuery.graphql";
import { ChallengeCard } from "@/challenges";
import { useZustStore } from "@/state";
import { Button } from "@/universe/atoms";

import { CommunityDetails } from "./CommunityDetails";

export const COMMUNITY_CHALLENGES_FRAGMENT = graphql`
  fragment CommunityChallenges_challenges on Viewer
  @refetchable(queryName: "CommunityChallengesRefreshQuery")
  @argumentDefinitions(communityId: { type: "ID!" }) {
    challenges(communityId: $communityId) {
      ...ChallengeFragment
    }
  }
`;

interface Props {
  fragmentRef: CommunityChallenges_challenges$key;
}

export const CommunityChallenges = ({ fragmentRef }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { selectedCommunity } = useZustStore();

  const [data, refetch] = useRefetchableFragment<
    CommunityChallengesRefreshQuery,
    CommunityChallenges_challenges$key
  >(COMMUNITY_CHALLENGES_FRAGMENT, fragmentRef);

  const handleRefresh = useCallback(() => {
    startTransition(() => {
      refetch(
        { communityId: selectedCommunity?.id },
        { fetchPolicy: "store-and-network" }
      );
    });
  }, [refetch, selectedCommunity?.id]);

  console.log("data.id", data.challenges?.length);

  return (
    <View>
      <FlatList
        className="px-md min-h-full"
        data={data.challenges}
        ListHeaderComponent={
          <View>
            <CommunityDetails />
            <Text className="mb-md text-2xl font-bold">Challenges</Text>
          </View>
        }
        ListEmptyComponent={
          <Text className="mb-md">
            No challenges yet. Be the first to create one.
          </Text>
        }
        ListFooterComponent={<Button title="See Past Challenges"></Button>}
        renderItem={({ item }) => <ChallengeCard challengeFragment={item} />}
        refreshControl={
          <RefreshControl refreshing={isPending} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};
