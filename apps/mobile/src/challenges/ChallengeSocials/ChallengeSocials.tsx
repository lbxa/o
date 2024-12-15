import { Text, View } from "react-native";

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
        <Text className="text-black dark:text-ivory">{memberLabel}</Text>
        <Text className="text-black dark:text-ivory">
          Started by <Text className="font-bold">x</Text>,{" "}
          <Text className="font-bold">y</Text> and{" "}
          <Text className="font-bold">z others</Text>
        </Text>
      </View>
    </View>
  );
};
