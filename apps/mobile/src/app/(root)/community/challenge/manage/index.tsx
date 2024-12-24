import { Suspense, useEffect } from "react";
import { useQueryLoader } from "react-relay";

import type { ChallengeManageQuery } from "@/__generated__/ChallengeManageQuery.graphql";
import {
  CHALLENGE_MANAGE_QUERY,
  ChallengeManage,
  ChallengeManageSkeleton,
} from "@/challenges";
import { useZustStore } from "@/state";

export default function CommunityManageRoute() {
  const selectedChallengeId = useZustStore(
    (state) => state.selectedChallenge?.id
  );

  if (!selectedChallengeId) {
    throw new Error("No challenge selected");
  }

  const [queryRef, loadQuery, disposeQuery] =
    useQueryLoader<ChallengeManageQuery>(CHALLENGE_MANAGE_QUERY);

  useEffect(() => {
    loadQuery({ challengeId: selectedChallengeId });
    return () => disposeQuery();
  }, [selectedChallengeId, disposeQuery, loadQuery]);

  return (
    <Suspense fallback={<ChallengeManageSkeleton />}>
      {queryRef && <ChallengeManage queryRef={queryRef} />}
    </Suspense>
  );
}
