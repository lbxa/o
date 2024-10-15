import { useLocalSearchParams } from "expo-router";

import { ChallengeRoot } from "@/challenges/ChallengeRoot";

export default function ChallengeDetailsRoute() {
  const { challenge: challengeId } = useLocalSearchParams<{
    challenge: string;
  }>();

  return <ChallengeRoot challengeId={challengeId} />;
}
