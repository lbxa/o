import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useTransition } from "react";
import { RefreshControl, SectionList, Text, View } from "react-native";
import { graphql, useRefetchableFragment } from "react-relay";

import type { ChallengeActivityTopResultsFragment_challenge$key } from "@/__generated__/ChallengeActivityTopResultsFragment_challenge.graphql";
import type { ChallengeActivityTopResultsRefetchQuery } from "@/__generated__/ChallengeActivityTopResultsRefetchQuery.graphql";
import type { ChallengeRootQuery$data } from "@/__generated__/ChallengeRootQuery.graphql";
import { OTouchable } from "@/universe/atoms";

import { ChallengeDetails } from "./ChallengeDetails";
import { UserResultCard } from "./ChallengeStats";
import { ChallengeTopResultsList } from "./ChallengeStats/ChallengeTopResultsList";

export const CHALLENGE_ACTIVITY_TOP_RESULTS_FRAGMENT = graphql`
  fragment ChallengeActivityTopResultsFragment_challenge on Challenge
  @refetchable(queryName: "ChallengeActivityTopResultsRefetchQuery")
  @argumentDefinitions(challengeId: { type: "ID", defaultValue: null }) {
    id
    activityTopResults(challengeId: $challengeId) {
      id
      user {
        id
        firstName
        lastName
      }
      result
      activity {
        id
        measurement
      }
    }
  }
`;

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
    ChallengeActivityTopResultsRefetchQuery,
    ChallengeActivityTopResultsFragment_challenge$key
  >(CHALLENGE_ACTIVITY_TOP_RESULTS_FRAGMENT, challengeRoot.viewer?.challenge);

  const topResultsModalRef = useRef<BottomSheetModal>(null);
  const topMoversModalRef = useRef<BottomSheetModal>(null);

  const handleRefresh = useCallback(() => {
    startTransition(() => {
      refetch({ challengeId });
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
        data: data?.activityTopResults?.slice(0, 3) ?? [],
      },
      { title: "Top Movers", data: [] },
    ],
    [data]
  );

  return (
    <>
      <ChallengeTopResultsList
        modalRef={topResultsModalRef}
        results={data?.activityTopResults?.slice(3)}
      />

      <SectionList
        className="min-h-full px-md"
        sections={sections}
        keyExtractor={(item, index) => [item.id, index].join("-")}
        renderItem={({ item }) => (
          <UserResultCard
            user={item.user}
            result={item.result}
            measurement={item.activity.measurement}
          />
        )}
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
