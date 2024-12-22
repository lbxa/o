import { Stack } from "expo-router";
import { Text } from "react-native";

import { SharedHeaderTitle, useSharedHeaderOptions } from "@/shared";
import { ModalCloseButton } from "@/universe/atoms";
import { MiniNav } from "@/universe/molecules";

export default function CommunityRootLayout() {
  const sharedHeaderOptions = useSharedHeaderOptions();
  return (
    <Stack
      screenOptions={{
        ...sharedHeaderOptions,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerLeft: () => (
            <Text className="dark:text-ivory text-3xl font-bold text-black">
              Community
            </Text>
          ),
          headerRight: () => <MiniNav items={["create", "search"]} />,
        }}
      />
      <Stack.Screen
        name="invite"
        options={{
          headerLeft: () => (
            <Text className="dark:text-ivory text-xl font-bold text-black">
              Invite your friends
            </Text>
          ),
          headerRight: () => <ModalCloseButton />,
          headerBackVisible: true,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="manage"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          headerLeft: () => <SharedHeaderTitle title="New Community" />,
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
          headerShown: false,
        }}
      />
    </Stack>
  );
}
