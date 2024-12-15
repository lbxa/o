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
    <View className="gap-sm flex flex-row items-center">
      <AvatarArray arrayCount={memberCount} />
      <View className="flex flex-col">
        <Text className="dark:text-ivory text-black">{memberLabel}</Text>
        <Text className="dark:text-ivory text-black">
          Started by <Text className="font-bold">x</Text>,{" "}
          <Text className="font-bold">y</Text> and{" "}
          <Text className="font-bold">z others</Text>
        </Text>
      </View>
    </View>
  );
};
