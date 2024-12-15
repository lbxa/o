import { Text, View } from "react-native";

import { AvatarArray } from "@/universe/molecules";

interface UserMutualsProps {
  mutuals: number;
}

export const UserMutuals = ({ mutuals }: UserMutualsProps) => {
  const mutualsLabel = mutuals === 1 ? "mutual" : "mutuals";

  return (
    <View className="flex flex-row items-center gap-sm">
      <AvatarArray arrayCount={mutuals} />
      <View className="flex flex-col">
        <Text className="text-black dark:text-ivory">
          {mutuals} {mutualsLabel}
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
