import TickUp from "@assets/icons/tick-up.svg";
import { Text, View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { TopMoverCard_challenge$key } from "@/__generated__/TopMoverCard_challenge.graphql";
import { UserProfileRow } from "@/users";
import { useOTheme } from "@/utils";

export const ChallengeActivityHistoryCard = ({
  result,
}: {
  result: ChallengeActivityHistoryCard_challenge$key;
}) => {
  const { builtInColors } = useOTheme();
  const userResult = useFragment(
    graphql`
      fragment ChallengeActivityHistoryCard_challenge on ChallengeActivityResult {
        id
        user {
          id
          firstName
          lastName
          handle
        }
        result
      }
    `,
    result
  );

  const rightItems = (
    <View className="ml-sm gap-sm shrink-0 flex-row items-center">
      <TickUp width={25} height={25} fill={builtInColors.green[500]} />
      <Text
        className="text-3xl font-bold text-green-500 dark:text-green-500"
        style={{ fontVariant: ["tabular-nums"] }}
      >
        {userResult.result + "%"}
      </Text>
    </View>
  );

  return <UserProfileRow user={userResult.user} rightItems={rightItems} />;
};
