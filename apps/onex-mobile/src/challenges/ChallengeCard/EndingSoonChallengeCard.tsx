import type {
  ChallengeActivityGoal,
  ChallengeActivityType,
} from "@o/onex-api-gql";
import type { ChallengeActivityUnits } from "@o/onex-api-gql";
import { useRouter } from "expo-router";
import { Suspense } from "react";
import { View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { EndingSoonChallengeCard_challenge$key } from "@/__generated__/EndingSoonChallengeCard_challenge.graphql";
import { ChallengeActivityPills } from "@/challenges/ChallengeActivity";
import { ChallengeSocials } from "@/challenges/ChallengeSocials";
import { useZustStore } from "@/state";
import { OText, OTouchable } from "@/universe/atoms";

interface EndingSoonChallengeCardProps {
  fragmentRef: EndingSoonChallengeCard_challenge$key;
}

export const EndingSoonChallengeCard = ({
  fragmentRef,
}: EndingSoonChallengeCardProps) => {
  const router = useRouter();
  const { setSelectedChallenge } = useZustStore();

  const frag = useFragment<EndingSoonChallengeCard_challenge$key>(
    graphql`
      fragment EndingSoonChallengeCard_challenge on EndingSoonChallenge {
        id
        daysUntilEnd
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

  const daysUntilEndLabel: string =
    frag.daysUntilEnd === 1
      ? "day"
      : frag.daysUntilEnd === 0
        ? "today"
        : frag.daysUntilEnd + " days";

  return (
    <OTouchable onPress={handlePress}>
      <View className="mb-md flex flex-col gap-sm rounded-3xl bg-ivory p-sm px-3 dark:bg-surface-dark">
        <OText className=" text-3xl font-bold ">
          Challenge ending in {daysUntilEndLabel}
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
