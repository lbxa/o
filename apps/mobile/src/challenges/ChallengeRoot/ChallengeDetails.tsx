import RecordIcon from "@assets/icons/record.svg";
import { Button } from "@universe/atoms";
import { useRouter } from "expo-router";
import { View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import { graphql, useLazyLoadQuery } from "react-relay";

import type { ChallengeDetailsQuery } from "../../__generated__/ChallengeDetailsQuery.graphql";

export const CHALLENGE_DETAILS_QUERY = graphql`
  query ChallengeDetailsQuery($id: ID!) {
    challenge(id: $id) {
      name
      ...ChallengeFragment
    }
  }
`;

interface Props {
  challengeId: string;
  // queryRef: PreloadedQuery<ChallengeDetailsQuery>;
}

export const ChallengeDetails = ({ challengeId }: Props) => {
  const router = useRouter();
  // const query = usePreloadedQuery<ChallengeDetailsQuery>(
  //   CHALLENGE_DETAILS_QUERY,
  //   queryRef
  // );

  const query = useLazyLoadQuery<ChallengeDetailsQuery>(
    CHALLENGE_DETAILS_QUERY,
    { id: challengeId },
    { fetchPolicy: "store-and-network" }
  );

  return (
    <View className="mb-md flex flex-row gap-md pt-sm">
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
      />
    </View>
  );
};
