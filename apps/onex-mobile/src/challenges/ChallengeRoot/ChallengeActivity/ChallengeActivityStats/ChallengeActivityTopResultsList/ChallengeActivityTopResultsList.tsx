import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useTransition } from "react";
import { Suspense } from "react";
import { ActivityIndicator } from "react-native";
import { graphql, useLazyLoadQuery } from "react-relay";

import type { ChallengeActivityTopResultsListQuery } from "@/__generated__/ChallengeActivityTopResultsListQuery.graphql";
import { TopResultCard } from "@/challenges/ChallengeRoot/ChallengeActivity/ChallengeActivityStats";
import { ChallengeActivityTopResultsListSkeleton } from "@/challenges/ChallengeRoot/ChallengeActivity/ChallengeActivityStats/ChallengeActivityTopResultsList/ChallengeActivityTopResultsList.skeleton";
import { useChallengeActivityTopResults } from "@/challenges/ChallengeRoot/ChallengeActivity/hooks";
import { useSharedBottomSheetProps } from "@/shared/hooks/useSharedBottomSheetProps";
import { useZustStore } from "@/state";
import { Title } from "@/universe/atoms";

interface ChallengeActivityTopResultsListProps {
  modalRef: React.RefObject<BottomSheetModal>;
}
export const ChallengeActivityTopResultsList = ({
  modalRef,
}: ChallengeActivityTopResultsListProps) => {
  const [isPending, startTransition] = useTransition();
  const selectedChallengeId = useZustStore(
    (state) => state.selectedChallenge?.id
  );
  const sharedBottomSheetProps = useSharedBottomSheetProps();

  if (!selectedChallengeId) {
    throw new Error("No selected challenge id");
  }

  const query = useLazyLoadQuery<ChallengeActivityTopResultsListQuery>(
    graphql`
      query ChallengeActivityTopResultsListQuery(
        $challengeId: ID!
        $count: Int!
      ) {
        viewer {
          challenge(challengeId: $challengeId) {
            ...useChallengeActivityTopResultsFragment_challenge
              @arguments(count: $count)
          }
        }
      }
    `,
    { challengeId: selectedChallengeId, count: 20 }
  );

  const { data, loadNext, hasNext } = useChallengeActivityTopResults(
    query.viewer?.challenge
  );

  const loadMore = (count: number) =>
    startTransition(() => {
      loadNext(count);
    });

  return (
    <BottomSheetModal
      ref={modalRef}
      {...sharedBottomSheetProps}
      snapPoints={["30%"]}
      maxDynamicContentSize={790}
      enableDynamicSizing
    >
      <Suspense fallback={<ChallengeActivityTopResultsListSkeleton />}>
        <BottomSheetFlatList
          data={data?.activityTopResults?.edges?.map((edge) => edge.node) ?? []}
          className="px-md pb-10"
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <TopResultCard result={item} />}
          // onEndReached={() => !isPending && hasNext && loadMore(10)}
          // onEndReachedThreshold={0.01}
          ListHeaderComponent={<Title>View all</Title>}
          ListFooterComponent={
            <>{isPending && <ActivityIndicator size="large" />}</>
          }
        />
      </Suspense>
    </BottomSheetModal>
  );
};
