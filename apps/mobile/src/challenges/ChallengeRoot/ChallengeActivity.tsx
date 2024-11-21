import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useTransition } from "react";
import { RefreshControl, SectionList, Text, View } from "react-native";
import { graphql, useRefetchableFragment } from "react-relay";

import type { ChallengeActivityTopResultsFragment_challenge$key } from "@/__generated__/ChallengeActivityTopResultsFragment_challenge.graphql";
import type { ChallengeRootQuery$data } from "@/__generated__/ChallengeRootQuery.graphql";
import { OTouchable } from "@/universe/atoms";

import type { ChallengeActivityTopResultsPaginationQuery } from "../../__generated__/ChallengeActivityTopResultsPaginationQuery.graphql";
import { ChallengeDetails } from "./ChallengeDetails";
import { UserResultCard } from "./ChallengeStats";
import { ChallengeTopResultsList } from "./ChallengeStats/ChallengeTopResultsList";

interface ChallengeActivityProps {
  challengeId: string;
  challengeRoot: ChallengeRootQuery$data;
}
export const ChallengeActivity = ({
  challengeId,
  challengeRoot,
}: ChallengeActivityProps) => {
  const [isPending, startTransition] = useTransition();
  const [data, refetch] = useRefetchableFragment<
    ChallengeActivityTopResultsPaginationQuery,
    ChallengeActivityTopResultsFragment_challenge$key
  >(
    graphql`
      fragment ChallengeActivityTopResultsFragment_challenge on Challenge
      @refetchable(queryName: "ChallengeActivityTopResultsPaginationQuery")
      @argumentDefinitions(
        challengeId: { type: "ID", defaultValue: null }
        count: { type: "Int", defaultValue: 10 }
        cursor: { type: "String" }
      ) {
        activityTopResults(
          challengeId: $challengeId
          first: $count
          after: $cursor
        )
          @connection(
            key: "ChallengeActivityTopResultsFragment_activityTopResults"
          ) {
          edges {
            cursor
            node {
              id
              ...UserResultCard_challenge
            }
          }
          pageInfo {
            hasNextPage
            startCursor
            endCursor
          }
        }
      }
    `,
    challengeRoot.viewer?.challenge
  );

  const topResultsModalRef = useRef<BottomSheetModal>(null);
  const topMoversModalRef = useRef<BottomSheetModal>(null);

  const handleRefresh = useCallback(() => {
    startTransition(() => {
      refetch({ challengeId }, { fetchPolicy: "store-and-network" });
    });
  }, [refetch, challengeId]);

  const sectionModalLookup: Record<
    string,
    React.RefObject<BottomSheetModal>
  > = {
    "Top Results": topResultsModalRef,
    "Top Movers": topMoversModalRef,
  };

  const sections = useMemo(
    () => [
      {
        title: "Top Results",
        data:
          data?.activityTopResults.edges
            ?.slice(0, 3)
            .map((edge) => edge.node) ?? [],
      },
      { title: "Top Movers", data: [] },
    ],
    [data]
  );

  return (
    <>
      <ChallengeTopResultsList
        modalRef={topResultsModalRef}
        results={data?.activityTopResults.edges?.slice(3) ?? []}
      />

      <SectionList
        className="min-h-full px-md"
        sections={sections}
        keyExtractor={(item, index) => [item.id, index].join("-")}
        renderItem={({ item }) => <UserResultCard result={item} />}
        renderSectionHeader={({ section }) => (
          <Text className="text-2xl font-bold">{section.title}</Text>
        )}
        renderSectionFooter={({ section }) => (
          <OTouchable
            onPress={() => sectionModalLookup[section.title].current?.present()}
          >
            <Text className="my-md underline">View all</Text>
          </OTouchable>
        )}
        ListHeaderComponent={
          <View>
            {challengeRoot.viewer?.challenge && (
              <ChallengeDetails fragmentRef={challengeRoot.viewer.challenge} />
            )}
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={isPending} onRefresh={handleRefresh} />
        }
      />
    </>
  );
};
