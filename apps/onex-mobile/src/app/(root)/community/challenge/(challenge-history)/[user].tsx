import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useQueryLoader } from "react-relay";

import type { ChallengeActivityTopResultsHistoryQuery } from "@/__generated__/ChallengeActivityTopResultsHistoryQuery.graphql";
import { CHALLENGE_ACTIVITY_TOP_RESULTS_HISTORY_QUERY } from "@/challenges/ChallengeRoot/ChallengeActivity";
import { ChallengeActivityTopResultsHistory } from "@/challenges/ChallengeRoot/ChallengeActivity/ChallengeActivityStats/ChallengeActivityTopResultsHistory";
import { useZustStore } from "@/state";
import { Ozone } from "@/universe/molecules/Ozone";

export default function ChallengeHistory() {
  const { user: userId } = useLocalSearchParams<{
    user: string;
  }>();

  const [queryRef, loadQuery, disposeQuery] =
    useQueryLoader<ChallengeActivityTopResultsHistoryQuery>(
      CHALLENGE_ACTIVITY_TOP_RESULTS_HISTORY_QUERY
    );

  const { selectedChallenge } = useZustStore();

  if (!selectedChallenge?.id) {
    throw new Error("Challenge ID is required");
  }

  useEffect(() => {
    loadQuery({ challengeId: selectedChallenge.id, userId: userId });

    return () => {
      disposeQuery();
    };
  }, [selectedChallenge.id, userId, loadQuery, disposeQuery]);

  return (
    <Ozone>
      {queryRef && <ChallengeActivityTopResultsHistory queryRef={queryRef} />}
    </Ozone>
  );
}
