import type {
  ChallengeActivityMeasurement,
  ChallengeActivityType,
  ChallengeActivityUnits,
} from "@ocorp/api";
import type { ChallengeActivityGoal } from "@ocorp/api";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { useFragment } from "react-relay";

import { OTouchable, Title } from "@/universe/atoms";

import type { ChallengeFragment$key } from "../__generated__/ChallengeFragment.graphql";
import { useZustStore } from "../state";
import { CHALLENGE_FRAGMENT } from "./ChallengeFragment";

interface ChallengeCardProps {
  challengeFragment: ChallengeFragment$key;
}

export const ChallengeCard = ({ challengeFragment }: ChallengeCardProps) => {
  const router = useRouter();
  const { setSelectedChallenge } = useZustStore();

  const challenge = useFragment<ChallengeFragment$key>(
    CHALLENGE_FRAGMENT,
    challengeFragment
  );

  const endDate = dayjs(challenge.endDate);
  const today = dayjs();

  // Calculate the difference in days
  const daysLeft = endDate.diff(today, "day");

  const handlePress = () => {
    setSelectedChallenge({
      ...challenge,
      activity: {
        id: challenge.activity.id,
        goal: challenge.activity.goal as unknown as ChallengeActivityGoal,
        type: challenge.activity.type as unknown as ChallengeActivityType,
        measurement: challenge.activity
          .measurement as unknown as ChallengeActivityMeasurement,
        unit: challenge.activity.unit as unknown as ChallengeActivityUnits,
        target: challenge.activity.target,
      },
    });
    router.push(`/(app)/community/challenge/${challenge.id}`);
  };

  return (
    <OTouchable onPress={handlePress}>
      <View className="relative mb-md rounded-xl bg-ivory p-sm">
        <View className="mb-md flex flex-row items-center justify-between">
          <Title>{challenge.name}</Title>
          <View className="absolute right-0 top-0 rounded-xl bg-indigo/30 px-sm">
            <Text className="text-xl font-bold text-indigo">
              {daysLeft + " days"}
            </Text>
          </View>
        </View>
        <Text>Socials will go here</Text>
      </View>
    </OTouchable>
  );
};
