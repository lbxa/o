import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import React from "react";
import { Suspense } from "react";
import { ActivityIndicator, View } from "react-native";
import { graphql, useLazyLoadQuery } from "react-relay";

import type { ChallengeActivityTopResultsListQuery } from "@/__generated__/ChallengeActivityTopResultsListQuery.graphql";
import { useChallengeActivityTopResults } from "@/challenges/ChallengeRoot/ChallengeActivity/hooks";
import {
  TopResultCard,
  TopResultCardSkeleton,
} from "@/challenges/ChallengeRoot/ChallengeStats";
import { useSharedBottomSheetProps } from "@/shared/hooks/useSharedBottomSheetProps";
import { useZustStore } from "@/state";
import { Title } from "@/universe/atoms";

interface ChallengeActivityTopResultsListProps {
  modalRef: React.RefObject<BottomSheetModal>;
}
export const ChallengeActivityTopResultsList = ({
  modalRef,
}: ChallengeActivityTopResultsListProps) => {
  const selectedChallengeId = useZustStore(
    (state) => state.selectedChallenge?.id
  );
  const sharedBottomSheetProps = useSharedBottomSheetProps();

  if (!selectedChallengeId) {
    throw new Error("No selected challenge id");
  }

  // const query = useLazyLoadQuery<ChallengeActivityTopResultsListQuery>(
  //   graphql`
  //     query ChallengeActivityTopResultsListQuery(
  //       $challengeId: ID!
  //       $count: Int!
  //     ) {
  //       challengeActivityTopResults(challengeId: $challengeId, first: $count) {
  //         edges {
  //           node {
  //             ...TopResultCard_challenge
  //           }
  //         }
  //       }
  //     }
  //   `,
  //   { challengeId: selectedChallengeId, count: 20 }
  // );

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

  const { data, loadNext, isLoadingNext, hasNext } =
    useChallengeActivityTopResults(query.viewer?.challenge);

  return (
    <BottomSheetModal
      ref={modalRef}
      {...sharedBottomSheetProps}
      snapPoints={["30%"]}
      maxDynamicContentSize={790}
      enableDynamicSizing
    >
      <>
        <Suspense
          fallback={
            <View className="gap-md flex flex-col pb-10">
              {Array.from({ length: 4 }, (_, i) => (
                <TopResultCardSkeleton key={i} />
              ))}
            </View>
          }
        >
          <BottomSheetFlatList
            data={
              data?.activityTopResults?.edges?.map((edge) => edge.node) ?? []
            }
            className="px-md"
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => <TopResultCard result={item} />}
            onEndReached={() => !isLoadingNext && hasNext && loadNext(10)}
            onEndReachedThreshold={0.8}
            ListHeaderComponent={<Title>View all</Title>}
            ListFooterComponent={
              isLoadingNext ? (
                <ActivityIndicator size="large" />
              ) : (
                <View className="pb-10" />
              )
            }
          />
        </Suspense>
      </>
    </BottomSheetModal>
  );
};
