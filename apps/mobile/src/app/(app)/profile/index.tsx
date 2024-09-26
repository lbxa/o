import CameraIcon from "@assets/icons/camera.svg";
import { Button } from "@universe/atoms";
import { Ozone } from "@universe/molecules";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

import { useViewer } from "../../../users";
import { useAuth } from "../../../utils/useAuth";

export default function Profile() {
  const router = useRouter();
  const { viewer } = useViewer();
  const { logout } = useAuth();

  return (
    <Ozone>
      <View className="flex">
        <View className="mb-md flex grow bg-ivory p-md">
          <View className="mb-md flex size-[150px] rounded-full bg-gray-300">
            <View className="m-auto">
              <CameraIcon width={45} height={45} fill={"grey"} />
            </View>
          </View>
          <Text className="text-left text-6xl font-bold">
            {viewer?.firstName + " " + viewer?.lastName}
          </Text>
          <Text>{viewer?.email}</Text>
        </View>
        <View className="mx-md">
          <Button
            title="Logout"
            onPress={() => {
              logout();
              router.replace("/(auth)/login");
            }}
          />
        </View>
      </View>
    </Ozone>
  );
}
