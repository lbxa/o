import { Text, View } from "react-native";

import { AvatarArray } from "@/universe/molecules/AvatarArray";

interface CommunitySocialsProps {
  memberCount: number;
}

export const CommunitySocials = ({ memberCount }: CommunitySocialsProps) => {
  const memberCountLabel = memberCount === 1 ? "member" : "members";

  return (
    <View className="flex flex-row items-center gap-sm">
      <AvatarArray arrayCount={memberCount} />
      <View className="flex flex-col">
        <Text className="text-black dark:text-ivory">
          {memberCount} {memberCountLabel}
        </Text>
        <Text className="text-black dark:text-ivory">
          Including <Text className="font-bold">x</Text>,{" "}
          <Text className="font-bold">y</Text> and{" "}
          <Text className="font-bold">z others</Text>
        </Text>
      </View>
    </View>
  );
};
