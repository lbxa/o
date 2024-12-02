import Void from "@assets/images/void.svg";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, {
  Suspense,
  useCallback,
  useMemo,
  useRef,
  useTransition,
} from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { graphql, useRefetchableFragment } from "react-relay";

import type { ChallengeActivityTopResultsFragment_challenge$key } from "@/__generated__/ChallengeActivityTopResultsFragment_challenge.graphql";
import type { ChallengeRootQuery$data } from "@/__generated__/ChallengeRootQuery.graphql";
import { OTouchable } from "@/universe/atoms";

import type { ChallengeActivityTopResultsPaginationQuery } from "../../../__generated__/ChallengeActivityTopResultsPaginationQuery.graphql";
import type { UserResultCard_challenge$key } from "../../../__generated__/UserResultCard_challenge.graphql";
import { ChallengeDetails } from "../ChallengeDetails/ChallengeDetails";
import { UserResultCard } from "../ChallengeStats";
import { ChallengeTopResultsList } from "../ChallengeStats/ChallengeTopResultsList";

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
      refetch(
        { challengeId },
        {
          fetchPolicy: "store-and-network",
          UNSTABLE_renderPolicy: "partial",
        }
      );
    });
  }, [refetch, challengeId]);

  const sectionModalLookup: Record<
    "Top Results" | "Top Movers",
    React.RefObject<BottomSheetModal>
  > = useMemo(
    () => ({
      "Top Results": topResultsModalRef,
      "Top Movers": topMoversModalRef,
    }),
    [topResultsModalRef, topMoversModalRef]
  );

  const sectionList = useMemo(() => {
    type Section =
      | {
          key: "HEADER";
          data: string;
        }
      | {
          key: "DATA";
          data: UserResultCard_challenge$key;
        }
      | {
          key: "FOOTER";
          data: React.ReactNode;
        };

    const sections: Section[] = [];

    if (
      data?.activityTopResults?.edges &&
      data.activityTopResults.edges.length > 0
    ) {
      sections.push({
        key: "HEADER" as const,
        data: "Top Results",
      });

      sections.push(
        ...data.activityTopResults.edges.slice(0, 3).map((edge) => ({
          key: "DATA" as const,
          data: edge.node,
        }))
      );

      if (data.activityTopResults.edges.length > 3) {
        sections.push({
          key: "FOOTER" as const,
          data: (
            <OTouchable
              onPress={() =>
                sectionModalLookup["Top Results"].current?.present()
              }
            >
              <Text className="my-md underline">View all</Text>
            </OTouchable>
          ),
        });
      }
    }
    return sections;
  }, [data?.activityTopResults?.edges, sectionModalLookup]);

  return (
    <View className="flex-1">
      <ChallengeTopResultsList
        modalRef={topResultsModalRef}
        results={
          data?.activityTopResults?.edges?.slice(3).map((edge) => edge.node) ??
          []
        }
      />
      {/* <ForceSuspend /> */}
      <Suspense fallback={null}>
        <FlatList
          className="min-h-full px-md"
          data={sectionList}
          // estimatedItemSize={100}
          keyExtractor={(item, index) => ["X", index].join("-")}
          // getItemType={(item) =>
          //   item.key === "HEADER" ? "sectionHeader" : "row"
          // }
          renderItem={({ item }) => {
            switch (item.key) {
              case "HEADER":
                return <Text className="text-2xl font-bold">{item.data}</Text>;
              case "DATA":
                return <UserResultCard result={item.data} />;
              case "FOOTER":
                return <>{item.data}</>;
              default:
                return null;
            }
          }}
          // renderSectionHeader={({ section }) => (
          //   <Text className="text-2xl font-bold">{section.title}</Text>
          // )}
          // renderSectionFooter={({ section }) => (
          //   <View className="mb-md">
          //     {section.data.length > 3 && (
          //       <OTouchable
          //         onPress={() =>
          //           sectionModalLookup[section.title].current?.present()
          //         }
          //       >
          //         <Text className="my-md underline">View all</Text>
          //       </OTouchable>
          //     )}
          //   </View>
          // )}
          ListHeaderComponent={
            <View>
              {challengeRoot.viewer?.challenge && (
                <ChallengeDetails
                  challengeFragmentRef={challengeRoot.viewer.challenge}
                  challengeActivityPillsFragmentRef={
                    challengeRoot.viewer.challenge
                  }
                />
              )}
            </View>
          }
          ListEmptyComponent={
            <View className="flex flex-col items-center justify-center gap-md">
              <Void width={150} height={150} />
              <Text>Where are the results? It's time to get to work!</Text>
            </View>
          }
          refreshControl={
            <RefreshControl refreshing={isPending} onRefresh={handleRefresh} />
          }
        />
      </Suspense>
    </View>
  );
};
