import { Text, View } from "react-native";

import { OText } from "@/universe/atoms";
// import { AvatarArray } from "@/universe/molecules";
import { AvatarMolecules } from "@/universe/molecules/AvatarMolecules";

interface UserMutualsProps {
  mutuals: number;
}

export const UserMutuals = ({ mutuals }: UserMutualsProps) => {
  return (
    <View className="flex flex-row items-center gap-sm">
      {/* <AvatarArray arrayCount={mutuals} /> */}
      <AvatarMolecules count={mutuals} />
      <OText numberOfLines={2}>
        Followed by <Text className="font-bold">x</Text> and{" "}
        <OText className="font-bold">z others</OText>
      </OText>
    </View>
  );
};
