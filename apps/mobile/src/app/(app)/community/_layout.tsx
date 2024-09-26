import { MiniNav } from "@universe/molecules";
import { Stack, useRouter } from "expo-router";
import { Text, View } from "react-native";

import ChevronLeftIcon from "../../../../assets/icons/chevron-left.svg";
import { Touchable } from "../../../universe/atoms/Touchable";

export default function CommunityRoot() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: () => "",
        headerShadowVisible: false,
        headerBackVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerLeft: () => (
            <Text className="text-3xl font-bold">Community</Text>
          ),
          headerRight: () => <MiniNav />,
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          headerLeft: () => (
            <View className="flex flex-row items-center gap-sm">
              <Touchable onPress={() => router.back()}>
                <ChevronLeftIcon />
              </Touchable>
              <Text className="text-3xl font-bold">New Community</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          headerLeft: () => (
            <View className="flex flex-row items-center gap-sm">
              <Touchable onPress={() => router.back()}>
                <ChevronLeftIcon />
              </Touchable>
              <Text className="text-3xl font-bold">Search</Text>
            </View>
          ),
        }}
      />
    </Stack>
  );
}
