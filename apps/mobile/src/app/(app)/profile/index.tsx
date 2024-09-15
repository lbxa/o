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
      <View className="mb-md flex px-md">
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
          variant="red"
        />
      </View>
    </Ozone>
  );
}
