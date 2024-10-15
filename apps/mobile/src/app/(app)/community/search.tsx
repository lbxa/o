import { Ozone } from "@universe/molecules";
import { View } from "react-native";

import { CommunitySearch } from "@/communities";

export default function CommunitySearchRoute() {
  return (
    <Ozone>
      <View className="px-md">
        <CommunitySearch />
      </View>
    </Ozone>
  );
}
