import Void from "@assets/images/void.svg";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useMemo, useRef } from "react";
import { Text, View } from "react-native";

import type { ChallengeRootQuery$data } from "@/__generated__/ChallengeRootQuery.graphql";
import type { TopMoverCard_challenge$key } from "@/__generated__/TopMoverCard_challenge.graphql";
import type { TopResultCard_challenge$key } from "@/__generated__/TopResultCard_challenge.graphql";
import {
  ChallengeActivityTopMoversList,
  TopMoverCard,
  TopResultCard,
} from "@/challenges/ChallengeRoot/ChallengeActivity";
import {
  useChallengeActivityTop3Movers,
  useChallengeActivityTop3Results,
} from "@/challenges/ChallengeRoot/ChallengeActivity/hooks";
import { Caption, OText, OTouchable } from "@/universe/atoms";

import { ChallengeActivityTopResultsList } from "./ChallengeActivityStats/ChallengeActivityTopResultsList";

const TopResultSection: React.FC<{
  data: TopResultCard_challenge$key[];
  footer: boolean;
}> = ({ data, footer }) => {
  const topResultsModalRef = useRef<BottomSheetModal>(null);

  return (
    <View>
      <ChallengeActivityTopResultsList modalRef={topResultsModalRef} />
      <Text className="text-2xl font-bold text-black dark:text-ivory">
        Top Results
      </Text>
      {data.map((item, index) => (
        <TopResultCard key={index} result={item} />
      ))}
      {footer && (
        <OTouchable onPress={() => topResultsModalRef.current?.present()}>
          <OText className="mt-md underline">View all</OText>
        </OTouchable>
      )}
    </View>
  );
};

const TopMoverSection: React.FC<{
  data: TopMoverCard_challenge$key[];
  footer: boolean;
}> = ({ data, footer }) => {
  const topMoversModalRef = useRef<BottomSheetModal>(null);

  return (
    <View>
      <ChallengeActivityTopMoversList modalRef={topMoversModalRef} />
      <Text className="text-2xl font-bold text-black dark:text-ivory">
        Top Movers
      </Text>
      {data.map((item, index) => (
        <TopMoverCard key={index} mover={item} />
      ))}
      {footer && (
        <OTouchable onPress={() => topMoversModalRef.current?.present()}>
          <OText className="mt-md underline">View all</OText>
        </OTouchable>
      )}
    </View>
  );
};

interface ChallengeActivityResultsProps {
  challengeRoot: ChallengeRootQuery$data;
}
export const ChallengeActivityResults = ({
  challengeRoot,
}: ChallengeActivityResultsProps) => {
  const { data: topResultsData } = useChallengeActivityTop3Results(
    challengeRoot.viewer?.challenge
  );

  const { data: topMoversData } = useChallengeActivityTop3Movers(
    challengeRoot.viewer?.challenge
  );

  const topResultsExist =
    !!topResultsData?.activityTopResults?.edges?.length &&
    topResultsData.activityTopResults.edges.length > 0;

  const topMoversExist =
    !!topMoversData?.activityTopMovers?.edges?.length &&
    topMoversData.activityTopMovers.edges.length > 0;

  const empty = useMemo(
    () => !topResultsExist && !topMoversExist,
    [topResultsExist, topMoversExist]
  );

  if (empty) {
    return (
      <View className="flex flex-col items-center justify-center gap-md">
        <Void width={150} height={150} />
        <Caption>Where are the results? Let's get to get to work!</Caption>
      </View>
    );
  }

  return (
    <View className="flex flex-1 flex-col gap-md pb-10">
      {topResultsExist && (
        <TopResultSection
          data={topResultsData.activityTopResults.edges
            .slice(0, 3)
            .map((edge) => edge.node)}
          footer={
            !!topResultsData.activityTopResults.edges.length &&
            topResultsData.activityTopResults.edges.length > 3
          }
        />
      )}
      {topMoversExist && (
        <TopMoverSection
          data={topMoversData.activityTopMovers.edges
            .slice(0, 3)
            .map((edge) => edge.node)}
          footer={
            !!topMoversData.activityTopMovers.edges.length &&
            topMoversData.activityTopMovers.edges.length > 3
          }
        />
      )}
    </View>
  );
};
