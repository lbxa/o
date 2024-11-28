import CrossIcon from "@assets/icons/cross.svg";
import RecordIcon from "@assets/icons/record.svg";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ChallengeActivityGoal, ChallengeActivityType } from "@o/api-gql";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Text, View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { ChallengeDetails_challenge$key } from "@/__generated__/ChallengeDetails_challenge.graphql";
import { useZustStore } from "@/state";
import { OButton, OTouchable } from "@/universe/atoms";

import type { ChallengeActivityPills_challenge$key } from "../../__generated__/ChallengeActivityPills_challenge.graphql";
import { ChallengeActivityPills } from "../ChallengeActivity";
import {
  RepetitionLogger,
  StopwatchLogger,
  WeightLogger,
} from "../ChallengeLogger";
import { ChallengeSocials } from "../ChallengeSocials";

interface Props {
  challengeFragmentRef: ChallengeDetails_challenge$key;
  challengeActivityPillsFragmentRef: ChallengeActivityPills_challenge$key;
}

export const ChallengeDetails = ({
  challengeFragmentRef,
  challengeActivityPillsFragmentRef,
}: Props) => {
  const router = useRouter();
  const { setRecordedChallenge } = useZustStore();

  const weightModalRef = useRef<BottomSheetModal>(null);
  const stopwatchModalRef = useRef<BottomSheetModal>(null);
  const repetitionModalRef = useRef<BottomSheetModal>(null);

  const [showDescription, setShowDescription] = useState(true);

  const challenge = useFragment<ChallengeDetails_challenge$key>(
    graphql`
      fragment ChallengeDetails_challenge on Challenge {
        id
        name
        description
        activity {
          id
          type
          goal
        }
      }
    `,
    challengeFragmentRef
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
      case ChallengeActivityType.Distance:
        switch (challenge.activity.goal) {
          case ChallengeActivityGoal.ShortestTime:
          case ChallengeActivityGoal.LongestTime:
            stopwatchModalRef.current?.present();
            break;
        }
        break;
      case ChallengeActivityType.Social:
      default:
        // TODO what should we do with distance?
        return;
    }
  };

  return (
    <View className="mb-md flex flex-col gap-md">
      {showDescription && (
        <View className="flex-row items-center gap-sm rounded-xl bg-ivory px-md py-sm">
          <Text className="flex-1 text-lg">{challenge.description}</Text>
          <OTouchable onPress={() => setShowDescription(false)}>
            <CrossIcon width={15} height={15} />
          </OTouchable>
        </View>
      )}
      <ChallengeActivityPills fragmentRef={challengeActivityPillsFragmentRef} />
      <ChallengeSocials />
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
