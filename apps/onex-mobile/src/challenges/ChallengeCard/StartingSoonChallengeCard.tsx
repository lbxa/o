import type { ChallengeActivityGoal, ChallengeActivityType } from "@o/api-gql";
import type { ChallengeActivityUnits } from "@o/api-gql";
import { useRouter } from "expo-router";
import { Suspense } from "react";
import { View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { StartingSoonChallengeCard_challenge$key } from "@/__generated__/StartingSoonChallengeCard_challenge.graphql";
import { ChallengeActivityPills } from "@/challenges/ChallengeActivity";
import { ChallengeSocials } from "@/challenges/ChallengeSocials";
import { useZustStore } from "@/state";
import { OText, OTouchable } from "@/universe/atoms";

interface StartingSoonChallengeCardProps {
  fragmentRef: StartingSoonChallengeCard_challenge$key;
}

export const StartingSoonChallengeCard = ({
  fragmentRef,
}: StartingSoonChallengeCardProps) => {
  const router = useRouter();
  const { setSelectedChallenge } = useZustStore();

  const frag = useFragment<StartingSoonChallengeCard_challenge$key>(
    graphql`
      fragment StartingSoonChallengeCard_challenge on StartingSoonChallenge {
        id
        daysUntilStart
        challenge {
          id
          name
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
      }
    `,
    fragmentRef
  );

  const handlePress = () => {
    setSelectedChallenge({
      ...frag.challenge,
      activity: {
        id: frag.challenge.activity.id,
        goal: frag.challenge.activity.goal as unknown as ChallengeActivityGoal,
        type: frag.challenge.activity.type as unknown as ChallengeActivityType,
        unit: frag.challenge.activity.unit as unknown as ChallengeActivityUnits,
        target: frag.challenge.activity.target,
      },
    });
    router.push(`/community/challenge/${frag.challenge.id}`);
  };

  const daysUntilStartLabel: string =
    frag.daysUntilStart === 1
      ? "day"
      : frag.daysUntilStart === 0
        ? "today"
        : frag.daysUntilStart + " days";

  return (
    <OTouchable onPress={handlePress}>
      <View className="mb-md gap-sm bg-ivory p-sm dark:bg-surface-dark flex flex-col rounded-3xl px-3">
        <OText className=" text-3xl font-bold ">
          Challenge starting in {daysUntilStartLabel}
        </OText>
        <OText className=" text-2xl">{frag.challenge.name}</OText>
        <View className="py-md">
          <Suspense fallback={<OText>Loading...</OText>}>
            <ChallengeActivityPills fragmentRef={frag.challenge} />
          </Suspense>
        </View>
        <ChallengeSocials fragmentRef={frag.challenge} />
      </View>
    </OTouchable>
  );
};
