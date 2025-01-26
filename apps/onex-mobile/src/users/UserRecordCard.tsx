import TrophyIcon from "@assets/icons/trophy.svg";
import VerifiedBadgeIcon from "@assets/icons/verified-badge.svg";
import type {
  ChallengeActivityGoal,
  ChallengeActivityType,
  ChallengeActivityUnits,
} from "@o/api-gql";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { UserRecordCard_userRecord$key } from "@/__generated__/UserRecordCard_userRecord.graphql";
import { challengeActivityUnitToLabel } from "@/challenges/ChallengeActivity";
import { useZustStore } from "@/state/zust-store";
import { OText, OTouchable } from "@/universe/atoms";
import { UserAvatar } from "@/users/UserAvatar";
import { useOTheme } from "@/utils";

interface UserRecordCardProps {
  fragmentRef: UserRecordCard_userRecord$key;
}
export const UserRecordCard = ({ fragmentRef }: UserRecordCardProps) => {
  const router = useRouter();
  const { setSelectedChallenge } = useZustStore();
  const { isDark, colors } = useOTheme();
  const userRecord = useFragment<UserRecordCard_userRecord$key>(
    graphql`
      fragment UserRecordCard_userRecord on UserRecord {
        user {
          id
          firstName
          lastName
        }
        challenge {
          id
          name
          activity {
            id
            unit
            goal
            type
            target
            unit
          }
          community {
            id
            name
            isVerified
          }
        }
        activityResult {
          id
          result
        }
      }
    `,
    fragmentRef
  );

  const handlePress = () => {
    setSelectedChallenge({
      ...userRecord.challenge,
      activity: {
        id: userRecord.challenge.activity.id,
        goal: userRecord.challenge.activity
          .goal as unknown as ChallengeActivityGoal,
        type: userRecord.challenge.activity
          .type as unknown as ChallengeActivityType,
        unit: userRecord.challenge.activity
          .unit as unknown as ChallengeActivityUnits,
        target: userRecord.challenge.activity.target,
      },
    });
    router.push(`/community/challenge/${userRecord.challenge.id}`);
  };

  return (
    <OTouchable
      onPress={handlePress}
      className="mb-md rounded-3xl bg-ivory p-sm px-3 dark:bg-surface-dark"
    >
      <View className="flex flex-col gap-sm">
        <View className="flex flex-row items-start justify-between">
          <View className="flex flex-1 flex-col gap-sm">
            <OText className="text-3xl font-bold">
              {userRecord.challenge.name} Record
            </OText>
            <View className="flex flex-row items-center gap-sm">
              <OText className="text-2xl">
                {userRecord.challenge.community?.name}{" "}
                {userRecord.challenge.community?.isVerified && (
                  <VerifiedBadgeIcon
                    width={16}
                    height={16}
                    fill={isDark ? colors.ivory.DEFAULT : colors.indigo.DEFAULT}
                  />
                )}
              </OText>
            </View>
          </View>
          <View className="shrink-0 rounded-full bg-indigo/30 p-sm">
            <TrophyIcon width={24} height={24} fill={colors.indigo.DEFAULT} />
          </View>
        </View>
        <OText className="py-md text-6xl">
          {userRecord.activityResult.result +
            " " +
            challengeActivityUnitToLabel(
              userRecord.challenge.activity.unit as ChallengeActivityUnits
            )}
        </OText>
        <View className="flex flex-row items-center gap-sm">
          <UserAvatar user={userRecord.user} size="sm" />
          <OText className="text-lg">
            {userRecord.user.firstName + " " + userRecord.user.lastName}
          </OText>
        </View>
      </View>
    </OTouchable>
  );
};
