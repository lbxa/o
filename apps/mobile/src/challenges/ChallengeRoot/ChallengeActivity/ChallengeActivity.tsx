import Void from "@assets/images/void.svg";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { Suspense, useMemo, useRef } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { graphql, useRefetchableFragment } from "react-relay";

import type { ChallengeActivityTopResultsFragment_challenge$key } from "@/__generated__/ChallengeActivityTopResultsFragment_challenge.graphql";
import type { ChallengeRootQuery$data } from "@/__generated__/ChallengeRootQuery.graphql";
import { useNoSuspenseRefetch } from "@/relay/hooks/useNoSuspenseRefetch";
import { Caption, OTouchable } from "@/universe/atoms";

import type { ChallengeActivityTopResultsPaginationQuery } from "../../../__generated__/ChallengeActivityTopResultsPaginationQuery.graphql";
import type { UserResultCard_challenge$key } from "../../../__generated__/UserResultCard_challenge.graphql";
import { ChallengeDetails } from "../ChallengeDetails/ChallengeDetails";
import { CHALLENGE_ROOT_QUERY } from "../ChallengeRoot";
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
  const [data, _] = useRefetchableFragment<
    ChallengeActivityTopResultsPaginationQuery,
    ChallengeActivityTopResultsFragment_challenge$key
  >(
    graphql`
      fragment ChallengeActivityTopResultsFragment_challenge on Challenge
      @refetchable(queryName: "ChallengeActivityTopResultsPaginationQuery")
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 3 }
        cursor: { type: "String" }
      ) {
        id
        activityTopResults(first: $count, after: $cursor)
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

  const { refetch: refetchTopResults, isRefetching: isRefetchingTopResults } =
    useNoSuspenseRefetch({
      ancestorQuery: CHALLENGE_ROOT_QUERY,
      ancestorVariables: { challengeId },
      // TODO dig into relay cache to find out why refetch with
      // store-only isn't working as expected
      // refetchFunc: refetch,
      // refetchFuncVariables: { count: 3 },
    });

  const topResultsModalRef = useRef<BottomSheetModal>(null);
  const topMoversModalRef = useRef<BottomSheetModal>(null);

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
      <Suspense fallback={null}>
        <FlatList
          className="px-md min-h-full"
          data={sectionList}
          keyExtractor={(item, index) => ["X", index].join("-")}
          renderItem={({ item }) => {
            switch (item.key) {
              case "HEADER":
                return (
                  <Text className="dark:text-ivory text-2xl font-bold text-black">
                    {item.data}
                  </Text>
                );
              case "DATA":
                return <UserResultCard result={item.data} />;
              case "FOOTER":
                return <>{item.data}</>;
              default:
                return null;
            }
          }}
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
            <View className="gap-md flex flex-col items-center justify-center">
              <Void width={150} height={150} />
              <Caption>
                Where are the results? It's time to get to work!
              </Caption>
            </View>
          }
          refreshControl={
            <RefreshControl
              refreshing={isRefetchingTopResults}
              onRefresh={refetchTopResults}
            />
          }
        />
      </Suspense>
    </View>
  );
};
