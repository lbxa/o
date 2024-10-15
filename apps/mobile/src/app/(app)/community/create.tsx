import CameraIcon from "@assets/icons/camera.svg";
import { View } from "react-native";

import { CommunityCreate } from "@/communities";
import { Ozone } from "@/universe/molecules";

export default function CommunityCreateRoute() {
  return (
    <Ozone>
      <View className="mb-md flex h-[150px] bg-gray-200">
        <View className="m-auto">
          <CameraIcon width={45} height={45} fill={"grey"} />
        </View>
      </View>
      <View className="px-md">
        <CommunityCreate />
      </View>
    </Ozone>
  );
}
