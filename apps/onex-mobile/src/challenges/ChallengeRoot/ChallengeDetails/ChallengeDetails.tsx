import CrossIcon from "@assets/icons/cross.svg";
import RecordIcon from "@assets/icons/record.svg";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ChallengeActivityGoal, ChallengeActivityType } from "@o/onex-api-gql";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { ChallengeActivityPills_challenge$key } from "@/__generated__/ChallengeActivityPills_challenge.graphql";
import type { ChallengeDetails_challenge$key } from "@/__generated__/ChallengeDetails_challenge.graphql";
import { SocialGallery } from "@/shared";
import { useZustStore } from "@/state";
import { OButton, OText, OTouchable } from "@/universe/atoms";
import { useSvgFill } from "@/utils";

import { ChallengeActivityPills } from "../../ChallengeActivity";
import {
  DistanceLogger,
  RepetitionLogger,
  StopwatchLogger,
  WeightLogger,
} from "../../ChallengeLogger";

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
  const svgFill = useSvgFill();
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
        ...SocialGallery
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
        <View className="flex-row items-center gap-sm rounded-xl bg-ivory px-md py-sm dark:bg-surface-dark">
          <View className="flex flex-1 flex-col">
            <OText className=" text-lg font-bold">{challenge.name}</OText>
            <OText className="text-lg">{challenge.description}</OText>
          </View>

          <OTouchable onPress={() => setShowDescription(false)}>
            <CrossIcon width={15} height={15} fill={svgFill} />
          </OTouchable>
        </View>
      )}
      <ChallengeActivityPills fragmentRef={challengeActivityPillsFragmentRef} />
      <SocialGallery fragmentRef={challenge} type="challenge" />
      <StopwatchLogger modalRef={stopwatchModalRef} />
      <DistanceLogger modalRef={distanceModalRef} />
      <RepetitionLogger modalRef={repetitionModalRef} />
      <WeightLogger modalRef={weightModalRef} />
      <View className="flex flex-row gap-md">
        <OButton title="Share" variant="indigo" />
        <OButton
          title="Invite"
          variant="indigo"
          onPress={() => router.push("/community/challenge/challenge-invite")}
        />
        <OButton
          title="Record"
          type="primary"
          variant="navy"
          icon={<RecordIcon width={20} fill="ivory" />}
          className="ml-auto"
          onPress={handleRecord}
        />
      </View>
    </View>
  );
};
