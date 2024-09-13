import { PrimaryButton, Title } from "@universe/atoms";
import { Ozone } from "@universe/molecules";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import { useAuth } from "../../utils/useAuth";

export default function Profile() {
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <Ozone>
      <View className="mb-md flex items-center">
        <View className="relative mx-auto mb-md size-[200px] rounded-full bg-gray-200">
          <TouchableOpacity className="absolute bottom-4 right-3 rounded-3xl bg-gray-400 px-md py-sm">
            <Text className="font-bold text-white">Change me</Text>
          </TouchableOpacity>
        </View>
        <Title title="Lucas Barbosa" />
        <Text>lucas.brsa@hotmail.com</Text>
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
