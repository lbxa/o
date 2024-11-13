import { useCallback, useTransition } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { graphql, useRefetchableFragment } from "react-relay";

import type { ChallengeList_challenges$key } from "@/__generated__/ChallengeList_challenges.graphql";
import type { ChallengeListRefreshQuery } from "@/__generated__/ChallengeListRefreshQuery.graphql";
import { ChallengeCard } from "@/challenges";
import { useZustStore } from "@/state";
import { OButton } from "@/universe/atoms";

import { CommunityDetails } from "./CommunityDetails";

export const CHALLENGE_LIST_FRAGMENT = graphql`
  fragment ChallengeList_challenges on Viewer
  @refetchable(queryName: "ChallengeListRefreshQuery")
  @argumentDefinitions(communityId: { type: "ID!" }) {
    challenges(communityId: $communityId) {
      ...ChallengeFragment
    }
  }
`;

interface Props {
  fragmentRef: ChallengeList_challenges$key;
}

export const ChallengeList = ({ fragmentRef }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { selectedCommunity } = useZustStore();

  const [data, refetch] = useRefetchableFragment<
    ChallengeListRefreshQuery,
    ChallengeList_challenges$key
  >(CHALLENGE_LIST_FRAGMENT, fragmentRef);

  const handleRefresh = useCallback(() => {
    startTransition(() => {
      refetch({ communityId: selectedCommunity?.id });
    });
  }, [refetch, selectedCommunity?.id]);

  return (
    <FlatList
      className="min-h-full px-md"
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
      ListFooterComponent={<OButton title="See Past Challenges"></OButton>}
      renderItem={({ item }) => <ChallengeCard challengeFragment={item} />}
      refreshControl={
        <RefreshControl refreshing={isPending} onRefresh={handleRefresh} />
      }
    />
  );
};
