import type {
  ChallengeActivityMeasurement,
  ChallengeActivityType,
  ChallengeActivityUnits,
} from "@o/api-gql";
import type { ChallengeActivityGoal } from "@o/api-gql";
// import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { graphql, useFragment } from "react-relay";

import { OTouchable, Title } from "@/universe/atoms";

import type { ChallengeCard_challenges$key } from "../__generated__/ChallengeCard_challenges.graphql";
import { useZustStore } from "../state";

interface ChallengeCardProps {
  fragmentKey: ChallengeCard_challenges$key;
}

export const ChallengeCard = ({ fragmentKey }: ChallengeCardProps) => {
  const router = useRouter();
  const { setSelectedChallenge } = useZustStore();

  const challenge = useFragment<ChallengeCard_challenges$key>(
    graphql`
      fragment ChallengeCard_challenges on Challenge {
        id
        name
        description
        startDate
        endDate
        activity {
          id
          type
          measurement
          goal
          unit
          target
        }
      }
    `,
    fragmentKey
  );

  // const endDate = dayjs(challenge.endDate);
  // const today = dayjs();

  // // Calculate the difference in days
  // const daysLeft = endDate.diff(today, "day");

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
    router.push(`/(root)/community/challenge/${challenge.id}`);
  };

  return (
    <OTouchable onPress={handlePress}>
      <View className="mb-md gap-sm bg-ivory p-sm flex flex-col rounded-xl">
        <View className="flex flex-row items-center justify-between">
          <Title>{challenge.name}</Title>
        </View>
        <Text>Socials will go here</Text>
        {/* <View className="inline-flex rounded-xl bg-indigo/30 px-sm">
          <Text className="text-xl font-bold text-indigo">
            {daysLeft + " days"}
          </Text>
        </View> */}
      </View>
    </OTouchable>
  );
};
