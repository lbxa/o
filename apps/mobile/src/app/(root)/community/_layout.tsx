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
            <Text className="text-3xl font-bold text-black dark:text-ivory">
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
            <Text className="text-xl font-bold text-black dark:text-ivory">
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
        name="community-message"
        options={{
          headerLeft: () => <SharedHeaderTitle title="Community Chat" />,
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
