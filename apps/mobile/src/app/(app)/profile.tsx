import { PrimaryButton, Title } from "@universe/atoms";
import { Ozone } from "@universe/molecules";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import { useAuth } from "../../auth";

export default function Profile() {
  const router = useRouter();
  const { logout } = useAuth();
  return (
    <Ozone>
      <View className="flex items-center mb-md">
        <View className="mx-auto w-[200px] h-[200px] rounded-full bg-gray-200 mb-md relative">
          <TouchableOpacity className="bg-gray-400 absolute bottom-4 right-3 px-md py-sm rounded-3xl">
            <Text className="font-bold text-white">Change</Text>
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
            router.replace("(auth)/login");
          }}
          variant="red"
        />
      </View>
    </Ozone>
  );
}
