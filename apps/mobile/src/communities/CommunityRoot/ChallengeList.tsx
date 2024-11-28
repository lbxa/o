import { useCallback, useTransition } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { graphql, usePaginationFragment } from "react-relay";

import { ChallengeCard } from "@/challenges";
import { useZustStore } from "@/state";
import { OButton } from "@/universe/atoms";

import type { ChallengeList_viewer$key } from "../../__generated__/ChallengeList_viewer.graphql";
import type { ChallengeListPaginationQuery } from "../../__generated__/ChallengeListPaginationQuery.graphql";
import { CommunityDetails } from "./CommunityDetails";

interface Props {
  challengeListFragmentRef: ChallengeList_viewer$key;
}

export const ChallengeList = ({ challengeListFragmentRef }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { selectedCommunity } = useZustStore();

  const { data, loadNext, hasNext, isLoadingNext, refetch } =
    usePaginationFragment<
      ChallengeListPaginationQuery,
      ChallengeList_viewer$key
    >(
      graphql`
        fragment ChallengeList_viewer on Viewer
        @refetchable(queryName: "ChallengeListPaginationQuery")
        @argumentDefinitions(
          communityId: { type: "ID!" }
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String" }
        ) {
          challenges(communityId: $communityId, first: $count, after: $cursor)
            @connection(key: "ChallengeList_viewer_challenges") {
            edges {
              cursor
              node {
                ...ChallengeCard_challenge
              }
            }
            pageInfo {
              startCursor
              endCursor
              hasNextPage
            }
          }
        }
      `,
      challengeListFragmentRef
    );

  const handleRefresh = useCallback(() => {
    startTransition(() => {
      refetch(
        { communityId: selectedCommunity?.id },
        { fetchPolicy: "store-and-network" }
      );
    });
  }, [refetch, selectedCommunity?.id]);

  return (
    <FlatList
      className="min-h-full px-sm pb-md"
      data={data.challenges.edges?.map((edge) => edge.node)}
      ListHeaderComponent={
        <View className="px-sm">
          <CommunityDetails />
          <Text className="mb-md text-2xl font-bold">Challenges</Text>
        </View>
      }
      ListEmptyComponent={
        <Text className="mb-md">
          No challenges yet. Be the first to create one.
        </Text>
      }
      renderItem={({ item }) => <ChallengeCard fragmentRef={item} />}
      ListFooterComponent={
        <View className="flex flex-col gap-md pb-md">
          {hasNext && (
            <OButton
              title={isLoadingNext ? "Loading..." : "Load more"}
              disabled={!hasNext}
              onPress={() => loadNext(10)}
            />
          )}
          <OButton title="See Past Challenges" />
        </View>
      }
      refreshControl={
        <RefreshControl refreshing={isPending} onRefresh={handleRefresh} />
      }
    />
  );
};
