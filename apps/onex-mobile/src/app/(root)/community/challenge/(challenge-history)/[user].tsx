import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useQueryLoader } from "react-relay";

import type { ChallengeActivityHistoryListQuery } from "@/__generated__/ChallengeActivityHistoryListQuery.graphql";
import { CHALLENGE_ACTIVITY_HISTORY_LIST_QUERY } from "@/challenges/ChallengeRoot/ChallengeActivity";
import { ChallengeActivityHistoryList } from "@/challenges/ChallengeRoot/ChallengeActivity/ChallengeActivityHistory";
import { useZustStore } from "@/state";
import { Ozone } from "@/universe/molecules/Ozone";

export default function ChallengeHistory() {
  const { user: userId } = useLocalSearchParams<{
    user: string;
  }>();

  const [queryRef, loadQuery, disposeQuery] =
    useQueryLoader<ChallengeActivityHistoryListQuery>(
      CHALLENGE_ACTIVITY_HISTORY_LIST_QUERY
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
      {queryRef && <ChallengeActivityHistoryList queryRef={queryRef} />}
    </Ozone>
  );
}
