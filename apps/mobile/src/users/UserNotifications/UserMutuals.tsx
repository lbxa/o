import { Text, View } from "react-native";

import { AvatarArray } from "@/universe/molecules";

interface UserMutualsProps {
  mutuals: number;
}

export const UserMutuals = ({ mutuals }: UserMutualsProps) => {
  const mutualsLabel = mutuals === 1 ? "mutual" : "mutuals";

  return (
    <View className="gap-sm flex flex-row items-center">
      <AvatarArray arrayCount={mutuals} />
      <View className="flex flex-col">
        <Text className="dark:text-ivory text-black">
          {mutuals} {mutualsLabel}
        </Text>
        <Text className="dark:text-ivory text-black">
          Including <Text className="font-bold">x</Text>,{" "}
          <Text className="font-bold">y</Text> and{" "}
          <Text className="font-bold">z others</Text>
        </Text>
      </View>
    </View>
  );
};
