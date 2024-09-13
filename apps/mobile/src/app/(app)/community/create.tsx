import { Ozone } from "@universe/molecules";
import { View } from "react-native";

import { CommunityCreate } from "../../../communities";

export default function CommunityCreateRoute() {
  return (
    <Ozone>
      <View className="px-md">
        <CommunityCreate />
      </View>
    </Ozone>
  );
}
