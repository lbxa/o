import { View } from "react-native";

import { CommunitySearch } from "@/communities";
import { Ozone } from "@/universe/molecules";

export default function CommunitySearchRoute() {
  return (
    <Ozone>
      <View className="px-md">
        <CommunitySearch />
      </View>
    </Ozone>
  );
}
