import { View } from "react-native";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";

import type { ChallengeSocials_challenge$key } from "@/__generated__/ChallengeSocials_challenge.graphql";
import { OText } from "@/universe/atoms";
import { AvatarArray } from "@/universe/molecules";

interface ChallengeSocialsProps {
  fragmentRef: ChallengeSocials_challenge$key;
}
export const ChallengeSocials = ({ fragmentRef }: ChallengeSocialsProps) => {
  const frag = useFragment(
    graphql`
      fragment ChallengeSocials_challenge on Challenge {
        id
        memberCount
        firstMember {
          id
          firstName
        }
        secondMember {
          id
          firstName
        }
      }
    `,
    fragmentRef
  );

  const memberCount = frag.memberCount ?? 0;
  const firstMemberName = frag.firstMember?.firstName;
  const secondMemberName = frag.secondMember?.firstName;

  let memberLabel: string;
  switch (memberCount) {
    case 1:
      memberLabel = memberCount + " member";
      break;
    case 0:
      memberLabel = "No members";
      break;
    default:
      memberLabel = memberCount + " members";
      break;
  }
  return (
    <View className="flex flex-row items-center gap-sm">
      <AvatarArray arrayCount={memberCount} />
      <View className="flex flex-1 flex-col">
        <OText numberOfLines={1}>{memberLabel}</OText>
        <OText numberOfLines={1}>
          Started by <OText className="font-bold">{firstMemberName}</OText>
          {secondMemberName && (
            <OText className="font-bold">
              <OText className="font-normal">,</OText> {secondMemberName}
            </OText>
          )}
          {memberCount > 2 && (
            <OText className="font-bold">
              <OText className="font-normal"> and </OText>
              {memberCount - 2} others
            </OText>
          )}
        </OText>
      </View>
    </View>
  );
};
