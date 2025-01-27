/* eslint-disable @stylistic/js/max-len */
import { View } from "react-native";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";

import type { ChallengeActivityTopResultsHistory_challenge$data } from "@/__generated__/ChallengeActivityTopResultsHistory_challenge.graphql";
import type { ChallengeActivityTopResultsHistoryUserDetails_challengeActivityResult$key } from "@/__generated__/ChallengeActivityTopResultsHistoryUserDetails_challengeActivityResult.graphql";
import { OText } from "@/universe/atoms";
import { UserAvatar } from "@/users/UserAvatar";
import { UserStreak } from "@/users/UserStreak";

export const ChallengeActivityTopResultsHistoryUserDetails = ({
  userHistory,
}: {
  userHistory: ChallengeActivityTopResultsHistory_challenge$data["resultsHistory"];
}) => {
  const frag =
    useFragment<ChallengeActivityTopResultsHistoryUserDetails_challengeActivityResult$key>(
      graphql`
        fragment ChallengeActivityTopResultsHistoryUserDetails_challengeActivityResult on ChallengeActivityResult {
          user {
            id
            firstName
            lastName
            handle
            streak {
              id
              currentStreak
            }
          }
        }
      `,
      userHistory?.edges?.[0]?.node
    );

  const fullName = [frag?.user.firstName, frag?.user.lastName].join(" ");

  return (
    <View className="gap-sm my-md flex-row items-center">
      {frag?.user && <UserAvatar size="md" user={frag.user} />}
      <View className="flex-1 flex-col">
        <OText size="2xl" className="font-bold" numberOfLines={1}>
          {frag?.user.handle ?? fullName} Challenge History
        </OText>
        <View className="flex-row">
          <UserStreak streak={frag?.user.streak?.currentStreak ?? 0} />
        </View>
      </View>
    </View>
  );
};
