import { Title, Touchable } from "@universe/atoms";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { useFragment } from "react-relay";

import type { ChallengeFragment$key } from "../__generated__/ChallengeFragment.graphql";
import { CHALLENGE_FRAGMENT } from "./ChallengeFragment";

interface ChallengeCardProps {
  challengeFragment: ChallengeFragment$key;
}
export const ChallengeCard = ({ challengeFragment }: ChallengeCardProps) => {
  const data = useFragment(CHALLENGE_FRAGMENT, challengeFragment);
  const router = useRouter();

  const endDate = dayjs(data.endDate);
  const today = dayjs();

  // Calculate the difference in days
  const daysLeft = endDate.diff(today, "day");

  return (
    <Touchable
      onPress={() => router.push(`/(app)/community/challenge/${data.id}`)}
    >
      <View className="mb-md rounded-xl bg-ivory p-sm">
        <View className="mb-md flex flex-row items-center justify-between">
          <Title>{data.name}</Title>
          <View className="rounded-lg bg-indigo/30 px-sm">
            <Text className="text-xl font-bold text-indigo">
              {daysLeft + " days"}
            </Text>
          </View>
        </View>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
      </View>
    </Touchable>
  );
};
