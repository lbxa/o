import ChevronLeftIcon from "@assets/icons/chevron-left.svg";
import { Stack, useRouter } from "expo-router";
import { Text, View } from "react-native";

import { OTouchable } from "@/universe/atoms";
import { MiniNav } from "@/universe/molecules";

export default function CommunityRootLayout() {
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
          headerRight: () => (
            <MiniNav items={["create", "search", "message"]} />
          ),
        }}
      />
      <Stack.Screen
        name="invite"
        options={{
          headerLeft: () => (
            <Text className="text-xl font-bold">Invite your friends</Text>
          ),
          headerBackVisible: true,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="manage"
        options={{
          headerLeft: () => <Text className="text-xl font-bold">Manage</Text>,
          headerBackVisible: true,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          headerLeft: () => (
            <View className="gap-sm flex flex-row items-center">
              <OTouchable onPress={() => router.back()}>
                <ChevronLeftIcon />
              </OTouchable>
              <Text className="text-3xl font-bold">New Community</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="challenge"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          headerLeft: () => (
            <View className="gap-sm flex flex-row items-center">
              <OTouchable onPress={() => router.back()}>
                <ChevronLeftIcon />
              </OTouchable>
              <Text className="text-3xl font-bold">Search</Text>
            </View>
          ),
        }}
      />
    </Stack>
  );
}
