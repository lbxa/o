import CrossIcon from "@assets/icons/cross.svg";
import RecordIcon from "@assets/icons/record.svg";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ChallengeActivityType } from "@o/api-gql";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Text, View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { ChallengeFragment$key } from "@/__generated__/ChallengeFragment.graphql";
import { useZustStore } from "@/state";
import { OButton, OTouchable } from "@/universe/atoms";

import { CHALLENGE_FRAGMENT } from "../ChallengeFragment";
import {
  RepetitionLogger,
  StopwatchLogger,
  WeightLogger,
} from "../ChallengeLogger";

export const CHALLENGE_DETAILS_QUERY = graphql`
  query ChallengeDetailsQuery($id: ID!) {
    challenge(id: $id) {
      name
      ...ChallengeFragment
    }
  }
`;

interface Props {
  // queryRef: PreloadedQuery<ChallengeDetailsQuery>;
  fragmentRef: ChallengeFragment$key;
}

export const ChallengeDetails = ({ fragmentRef }: Props) => {
  const router = useRouter();
  const { setRecordedChallenge } = useZustStore();

  const weightModalRef = useRef<BottomSheetModal>(null);
  const stopwatchModalRef = useRef<BottomSheetModal>(null);
  const repetitionModalRef = useRef<BottomSheetModal>(null);

  const [showDescription, setShowDescription] = useState(true);

  const challenge = useFragment<ChallengeFragment$key>(
    CHALLENGE_FRAGMENT,
    fragmentRef
  );

  const handleRecord = () => {
    setRecordedChallenge(challenge);
    switch (challenge.activity.type) {
      case ChallengeActivityType.Weightlifting:
        weightModalRef.current?.present();
        break;
      case ChallengeActivityType.Repetitions:
        repetitionModalRef.current?.present();
        break;
      case ChallengeActivityType.TimeBased:
        stopwatchModalRef.current?.present();
        break;
      case ChallengeActivityType.Social:
      case ChallengeActivityType.Distance:
      default:
        // TODO what should we do with distance?
        return;
    }
  };

  return (
    <View className="mb-md flex flex-col gap-md pt-sm">
      {showDescription && (
        <View className="flex-row  items-center gap-sm rounded-xl bg-ivory px-md py-sm">
          <Text className="flex-1 text-lg">{challenge.description}</Text>
          <OTouchable
            className="mt-sm"
            onPress={() => setShowDescription(false)}
          >
            <CrossIcon width={15} height={15} />
          </OTouchable>
        </View>
      )}
      <StopwatchLogger modalRef={stopwatchModalRef} />
      <RepetitionLogger modalRef={repetitionModalRef} />
      <WeightLogger modalRef={weightModalRef} />
      <View className="flex flex-row gap-md">
        <OButton title="Share" variant="indigo" className="rounded-xl" />
        <OButton
          title="Invite"
          variant="indigo"
          className="rounded-xl"
          onPress={() => router.push("/(root)/community/challenge/invite")}
        />
        <OButton
          title="Record"
          type="secondary"
          variant="navy"
          icon={<RecordIcon width={20} fill="ivory" />}
          className="ml-auto flex flex-row items-center gap-sm rounded-xl"
          onPress={handleRecord}
        />
      </View>
    </View>
  );
};
