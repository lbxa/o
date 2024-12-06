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

import type { ChallengeActivityPills_challenge$key } from "../../../__generated__/ChallengeActivityPills_challenge.graphql";
import { ChallengeActivityPills } from "../../ChallengeActivity";
import {
  DistanceLogger,
  RepetitionLogger,
  StopwatchLogger,
  WeightLogger,
} from "../../ChallengeLogger";
import { ChallengeSocials } from "../../ChallengeSocials";

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
  const distanceModalRef = useRef<BottomSheetModal>(null);

  const [showDescription, setShowDescription] = useState(true);

  const challenge = useFragment<ChallengeDetails_challenge$key>(
    graphql`
      fragment ChallengeDetails_challenge on Challenge {
        id
        name
        description
        memberCount
        activity {
          id
          type
          goal
        }
      }
    `,
    challengeFragmentRef
  );

  const ModalMap: Record<
    ChallengeActivityType,
    | React.RefObject<BottomSheetModal>
    | Partial<Record<ChallengeActivityGoal, React.RefObject<BottomSheetModal>>>
    | null
  > = {
    [ChallengeActivityType.Weightlifting]: weightModalRef,
    [ChallengeActivityType.Repetitions]: repetitionModalRef,
    [ChallengeActivityType.TimeBased]: stopwatchModalRef,
    [ChallengeActivityType.Distance]: {
      [ChallengeActivityGoal.ShortestTime]: stopwatchModalRef,
      [ChallengeActivityGoal.LongestTime]: stopwatchModalRef,
      [ChallengeActivityGoal.ShortestDistance]: distanceModalRef,
      [ChallengeActivityGoal.LongestDistance]: distanceModalRef,
    },
    [ChallengeActivityType.Social]: null,
  };

  const handleRecord = () => {
    setRecordedChallenge(challenge);

    const modalRef = (
      challenge.activity.type === ChallengeActivityType.Distance
        ? ModalMap[challenge.activity.type as ChallengeActivityType]?.[
            challenge.activity.goal as ChallengeActivityGoal
          ]
        : ModalMap[challenge.activity.type as ChallengeActivityType]
    ) as React.RefObject<BottomSheetModal> | null;

    if (modalRef?.current) {
      modalRef.current.present();
    }
  };

  return (
    <View className="mb-md flex flex-col gap-md pt-sm">
      {showDescription && (
        <View className="flex-row items-center gap-sm rounded-xl bg-ivory px-md py-sm">
          <Text className="flex-1 text-lg">{challenge.description}</Text>
          <OTouchable onPress={() => setShowDescription(false)}>
            <CrossIcon width={15} height={15} />
          </OTouchable>
        </View>
      )}
      <ChallengeActivityPills fragmentRef={challengeActivityPillsFragmentRef} />
      <ChallengeSocials memberCount={challenge.memberCount ?? 0} />
      <StopwatchLogger modalRef={stopwatchModalRef} />
      <DistanceLogger modalRef={distanceModalRef} />
      <RepetitionLogger modalRef={repetitionModalRef} />
      <WeightLogger modalRef={weightModalRef} />
      <View className="flex flex-row gap-md">
        <OButton title="Share" variant="indigo" />
        <OButton
          title="Invite"
          variant="indigo"
          onPress={() => router.push("/(root)/community/challenge/invite")}
        />
        <OButton
          title="Record"
          type="secondary"
          variant="navy"
          icon={<RecordIcon width={20} fill="ivory" />}
          className="ml-auto"
          onPress={handleRecord}
        />
      </View>
    </View>
  );
};
