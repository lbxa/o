import CameraIcon from "@assets/icons/camera.svg";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

import { OButton, OTouchable } from "@/universe/atoms";
import { Ozone } from "@/universe/molecules";
import { useViewer } from "@/users";
import { useToken } from "@/utils/useToken";

export default function Profile() {
  const router = useRouter();
  const { viewer } = useViewer();
  const { deleteToken } = useToken();

  return (
    <Ozone>
      <View className="flex">
        <View className="mb-md flex grow bg-ivory p-md">
          <OTouchable className="mb-md flex size-[200px] rounded-full bg-gray-300">
            <View className="m-auto">
              <CameraIcon width={45} height={45} fill={"grey"} />
            </View>
          </OTouchable>
          <Text className="text-left text-6xl font-bold">
            {viewer?.firstName + " " + viewer?.lastName}
          </Text>
          <Text>{viewer?.email}</Text>
        </View>
        <View className="mx-md">
          <OButton
            title="Logout"
            onPress={async () => {
              await deleteToken();
              router.replace("/(auth)/login");
            }}
          />
        </View>
      </View>
    </Ozone>
  );
}
