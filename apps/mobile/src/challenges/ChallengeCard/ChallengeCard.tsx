import type { ChallengeActivityGoal, ChallengeActivityType } from "@o/api-gql";
import type { ChallengeActivityUnits } from "@o/api-gql";
import { useRouter } from "expo-router";
import { Suspense } from "react";
import { View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { ChallengeCard_challenge$key } from "@/__generated__/ChallengeCard_challenge.graphql";
import { ChallengeActivityPills } from "@/challenges/ChallengeActivity";
import { ChallengeSocials } from "@/challenges/ChallengeSocials";
import { useZustStore } from "@/state";
import { OText, OTouchable } from "@/universe/atoms";

interface ChallengeCardProps {
  fragmentRef: ChallengeCard_challenge$key;
}

export const ChallengeCard = ({ fragmentRef }: ChallengeCardProps) => {
  const router = useRouter();
  const { setSelectedChallenge } = useZustStore();

  const challenge = useFragment<ChallengeCard_challenge$key>(
    graphql`
      fragment ChallengeCard_challenge on Challenge {
        id
        name
        description
        startDate
        endDate
        memberCount
        activity {
          id
          type
          goal
          unit
          target
        }
        ...ChallengeActivityPills_challenge
      }
    `,
    fragmentRef
  );

  // const endDate = dayjs(challenge.endDate);
  // const today = dayjs();
  // const endDate = dayjs(challenge.endDate);
  // const today = dayjs();

  // // Calculate the difference in days
  // const daysLeft = endDate.diff(today, "day");
  // // Calculate the difference in days
  // const daysLeft = endDate.diff(today, "day");

  const handlePress = () => {
    setSelectedChallenge({
      ...challenge,
      activity: {
        id: challenge.activity.id,
        goal: challenge.activity.goal as unknown as ChallengeActivityGoal,
        type: challenge.activity.type as unknown as ChallengeActivityType,
        unit: challenge.activity.unit as unknown as ChallengeActivityUnits,
        target: challenge.activity.target,
      },
    });
    router.push(`/community/challenge/${challenge.id}`);
  };

  return (
    <OTouchable onPress={handlePress}>
      <View className="mb-md flex flex-col gap-sm rounded-3xl bg-ivory p-sm px-3 dark:bg-surface-dark">
        <OText className=" text-3xl font-bold ">{challenge.name}</OText>
        <Suspense fallback={<OText>Loading...</OText>}>
          <ChallengeActivityPills fragmentRef={challenge} />
        </Suspense>
        <ChallengeSocials memberCount={challenge.memberCount ?? 0} />
        {/* <View className="inline-flex rounded-xl bg-indigo/30 px-sm">
          <Text className="text-xl font-bold text-indigo">
            {daysLeft + " days"}
          </Text>
        </View> */}
        {/* <View className="inline-flex rounded-xl bg-indigo/30 px-sm">
          <Text className="text-xl font-bold text-indigo">
            {daysLeft + " days"}
          </Text>
        </View> */}
      </View>
    </OTouchable>
  );
};
