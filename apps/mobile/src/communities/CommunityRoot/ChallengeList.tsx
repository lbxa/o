import Gym from "@assets/images/gym.svg";
import { useCallback, useTransition } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { graphql, usePaginationFragment } from "react-relay";

import type { ChallengeList_viewer$key } from "@/__generated__/ChallengeList_viewer.graphql";
import type { ChallengeListPaginationQuery } from "@/__generated__/ChallengeListPaginationQuery.graphql";
import type { CommunityInvitationAcceptList_community$key } from "@/__generated__/CommunityInvitationAcceptList_community.graphql";
import { ChallengeCard } from "@/challenges";
import { useZustStore } from "@/state";
import { OButton } from "@/universe/atoms";

import { CommunityInvitationAcceptList } from "../CommunityInvitation";
import { CommunityDetails } from "./CommunityDetails";

interface Props {
  challengeListFragmentRef: ChallengeList_viewer$key;
  communityFragmentRef: CommunityInvitationAcceptList_community$key;
}

export const ChallengeList = ({
  challengeListFragmentRef,
  communityFragmentRef,
}: Props) => {
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
        <View>
          <CommunityInvitationAcceptList fragmentRef={communityFragmentRef} />
          <View className="px-sm">
            <CommunityDetails />
            <Text className="mb-md text-2xl font-bold">Challenges</Text>
          </View>
        </View>
      }
      ListEmptyComponent={
        <View className="flex flex-col items-center justify-center">
          <Gym width={200} height={200} />
          <Text className="mb-md">Create your first challenge</Text>
        </View>
      }
      renderItem={({ item }) => <ChallengeCard fragmentRef={item} />}
      ListFooterComponent={
        <View className="flex flex-col gap-md pb-md">
          {hasNext && (
            <OButton
              title="Load more"
              loading={isLoadingNext}
              disabled={!hasNext}
              onPress={() => loadNext(10)}
            />
          )}
          {/* <OButton title="See Past Challenges" /> */}
        </View>
      }
      refreshControl={
        <RefreshControl refreshing={isPending} onRefresh={handleRefresh} />
      }
    />
  );
};
