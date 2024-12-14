import ChevronLeftIcon from "@assets/icons/chevron-left.svg";
import { Stack, useRouter } from "expo-router";
import { Text, View } from "react-native";

import { OTouchable } from "@/universe/atoms";
import { MiniNav } from "@/universe/molecules";

export default function Root() {
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
          headerLeft: () => <Text className="text-3xl font-bold">oNex</Text>,
          headerRight: () => (
            <MiniNav
              items={["search", "message"]}
              itemConfigs={{ search: { href: "/(root)/home/user-search" } }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="user-search"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="message"
        options={{
          headerLeft: () => (
            <View className="gap-sm flex flex-row items-center">
              <OTouchable onPress={() => router.back()}>
                <ChevronLeftIcon />
              </OTouchable>
              <Text className="text-3xl font-bold">Messages</Text>
            </View>
          ),
        }}
      />
    </Stack>
  );
}
