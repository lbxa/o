import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { graphql, useFragment } from "react-relay";

import type { TopResultCard_challenge$key } from "@/__generated__/TopResultCard_challenge.graphql";
import { OText } from "@/universe/atoms";
import { UserProfileRow } from "@/users";

export const TopResultCard = ({
  result,
  topResultModalRef,
}: {
  result: TopResultCard_challenge$key;
  topResultModalRef?: React.RefObject<BottomSheetModal>;
}) => {
  const router = useRouter();
  const userResult = useFragment(
    graphql`
      fragment TopResultCard_challenge on ChallengeActivityResult {
        id
        user {
          id
          ...UserProfileRow_user
        }
        formattedResult
      }
    `,
    result
  );

  const rightItems = (
    <OText
      className="text-3xl font-bold"
      style={{ fontVariant: ["tabular-nums"] }}
    >
      {userResult.formattedResult}
    </OText>
  );

  return (
    <UserProfileRow
      user={userResult.user}
      rightItems={rightItems}
      onPress={() => {
        topResultModalRef?.current?.close();
        router.push(
          `/community/challenge/(challenge-history)/${userResult.user.id}`
        );
      }}
    />
  );
};
