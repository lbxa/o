import TickUp from "@assets/icons/tick-up.svg";
import { View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { TopMoverCard_challenge$key } from "@/__generated__/TopMoverCard_challenge.graphql";
import { OText } from "@/universe/atoms";
import { UserProfileRow } from "@/users";
import { useOTheme } from "@/utils";

export const TopMoverCard = ({
  result,
}: {
  result: TopMoverCard_challenge$key;
}) => {
  const { builtInColors } = useOTheme();
  const userResult = useFragment(
    graphql`
      fragment TopMoverCard_challenge on ChallengeActivityResult {
        id
        user {
          ...UserProfileRow_user
        }
        result
      }
    `,
    result
  );

  const rightItems = (
    <View className="ml-sm shrink-0 flex-row items-center gap-sm">
      <TickUp width={25} height={25} fill={builtInColors.green[500]} />
      <OText
        className="text-3xl font-bold text-green-500"
        style={{ fontVariant: ["tabular-nums"] }}
      >
        {userResult.result + "%"}
      </OText>
    </View>
  );

  return <UserProfileRow user={userResult.user} rightItems={rightItems} />;
};
