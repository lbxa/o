import CrossIcon from "@assets/icons/cross.svg";
import OnexIcon from "@assets/icons/onex.svg";
import RecordIcon from "@assets/icons/record.svg";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import { graphql, useFragment, usePreloadedQuery } from "react-relay";

import type { ChallengeDetailsQuery } from "@/__generated__/ChallengeDetailsQuery.graphql";
import type { ChallengeFragment$key } from "@/__generated__/ChallengeFragment.graphql";
import { useZustStore } from "@/state";
import { Button, Touchable } from "@/universe/atoms";

import { CHALLENGE_FRAGMENT } from "../ChallengeFragment";

export const CHALLENGE_DETAILS_QUERY = graphql`
  query ChallengeDetailsQuery($id: ID!) {
    challenge(id: $id) {
      name
      ...ChallengeFragment
    }
  }
`;

interface Props {
  queryRef: PreloadedQuery<ChallengeDetailsQuery>;
}

export const ChallengeDetails = ({ queryRef }: Props) => {
  const router = useRouter();
  const { setRecordedChallenge } = useZustStore();
  const query = usePreloadedQuery<ChallengeDetailsQuery>(
    CHALLENGE_DETAILS_QUERY,
    queryRef
  );

  const [showDescription, setShowDescription] = useState(true);

  const challenge = useFragment<ChallengeFragment$key>(
    CHALLENGE_FRAGMENT,
    query.challenge
  );

  return (
    <View className="relative mb-md flex flex-col gap-md pt-sm">
      {showDescription && (
        <View className="rounded-xl bg-ivory p-md">
          <Touchable
            className="absolute right-sm top-sm"
            onPress={() => setShowDescription(false)}
          >
            <CrossIcon width={15} height={15} />
          </Touchable>
          <View className="mx-auto mb-md">
            <OnexIcon />
          </View>
          <Text className="text-center">{challenge?.description}</Text>
        </View>
      )}
      <View className="flex flex-row gap-md">
        <Button title="Share" variant="indigo" className="rounded-xl" />
        <Button
          title="Invite"
          variant="indigo"
          className="rounded-xl"
          onPress={() => router.push("/(app)/community/challenge/invite")}
        />
        <Button
          title="Record"
          type="secondary"
          variant="navy"
          icon={<RecordIcon width={20} fill="ivory" />}
          className="ml-auto flex flex-row items-center gap-sm rounded-xl"
          onPress={() => challenge && setRecordedChallenge(challenge)}
        />
      </View>
    </View>
  );
};
