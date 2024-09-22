import CameraIcon from "@assets/icons/camera.svg";
import { PrimaryButton } from "@universe/atoms";
import { Ozone } from "@universe/molecules";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

import { useActiveUser } from "../../../users";
import { useAuth } from "../../../utils/useAuth";

export default function Profile() {
  const router = useRouter();
  const activeUser = useActiveUser();
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
            {activeUser?.firstName + " " + activeUser?.lastName}
          </Text>
          <Text>{activeUser?.email}</Text>
        </View>
        <View className="mx-md">
          <PrimaryButton
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