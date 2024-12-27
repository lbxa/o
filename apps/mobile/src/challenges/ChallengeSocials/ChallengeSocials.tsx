import { View } from "react-native";

import { OText } from "@/universe/atoms";
import { AvatarArray } from "@/universe/molecules";

interface ChallengeSocialsProps {
  memberCount: number;
}
export const ChallengeSocials = ({ memberCount }: ChallengeSocialsProps) => {
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
      <View className="flex flex-col">
        <OText>{memberLabel}</OText>
        <OText>
          Started by <OText className="font-bold">x</OText>,{" "}
          <OText className="font-bold">y</OText> and{" "}
          <OText className="font-bold">z others</OText>
        </OText>
      </View>
    </View>
  );
};
