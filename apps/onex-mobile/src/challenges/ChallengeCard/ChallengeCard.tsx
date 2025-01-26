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
        ...ChallengeSocials_challenge
      }
    `,
    fragmentRef
  );

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
      <View className="mb-md gap-sm bg-ivory p-sm dark:bg-surface-dark flex flex-col rounded-3xl px-3">
        <OText className=" text-3xl font-bold ">{challenge.name}</OText>
        <View className="py-md">
          <Suspense fallback={<OText>Loading...</OText>}>
            <ChallengeActivityPills fragmentRef={challenge} />
          </Suspense>
        </View>
        <ChallengeSocials fragmentRef={challenge} />
      </View>
    </OTouchable>
  );
};
