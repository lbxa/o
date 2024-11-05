import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useQueryLoader } from "react-relay";

import type { ChallengeRootQuery } from "@/__generated__/ChallengeRootQuery.graphql";
import {
  CHALLENGE_ROOT_QUERY,
  ChallengeRoot,
} from "@/challenges/ChallengeRoot";

export default function ChallengeDetailsRoute() {
  const { challenge: challengeId } = useLocalSearchParams<{
    challenge: string;
  }>();

  const [queryRef, loadQuery, disposeQuery] =
    useQueryLoader<ChallengeRootQuery>(CHALLENGE_ROOT_QUERY);

  useEffect(() => {
    loadQuery({ challengeId });
    return () => disposeQuery();
  }, [challengeId, disposeQuery, loadQuery]);

  return (
    queryRef && <ChallengeRoot challengeId={challengeId} queryRef={queryRef} />
  );
}
