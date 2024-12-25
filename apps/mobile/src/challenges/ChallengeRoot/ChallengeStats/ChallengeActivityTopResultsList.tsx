import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Suspense } from "react";
import { View } from "react-native";
import { graphql, useLazyLoadQuery } from "react-relay";

import type { ChallengeActivityTopResultsListQuery } from "@/__generated__/ChallengeActivityTopResultsListQuery.graphql";
import { useChallengeActivityTopResults } from "@/challenges/ChallengeRoot/ChallengeActivity/hooks";
import { UserResultCardSkeleton } from "@/challenges/ChallengeRoot/ChallengeStats";
import { useSharedBottomSheetProps } from "@/shared/hooks/useSharedBottomSheetProps";
import { useZustStore } from "@/state";
import { Title } from "@/universe/atoms";

import { UserResultCard } from "./UserResultCard/UserResultCard";

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

  const { data } = useChallengeActivityTopResults(query.viewer?.challenge);

  return (
    <BottomSheetModal
      ref={modalRef}
      {...sharedBottomSheetProps}
      snapPoints={["30%"]}
      maxDynamicContentSize={700}
      enableDynamicSizing
    >
      <BottomSheetView>
        <Suspense
          fallback={
            <View className="flex flex-col gap-md pb-10">
              {Array.from({ length: 4 }, (_, i) => (
                <UserResultCardSkeleton key={i} />
              ))}
            </View>
          }
        >
          <BottomSheetFlatList
            data={data?.activityTopResults?.edges?.map((edge) => edge.node)}
            className="px-md"
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => <UserResultCard result={item} />}
            // onEndReached={() => !isLoadingNext && hasNext && loadNext(10)}
            ListHeaderComponent={<Title>View all</Title>}
            ListFooterComponent={<View className="pb-10" />}
          />
        </Suspense>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
