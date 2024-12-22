import { Stack } from "expo-router";
import { Text, View } from "react-native";

import { SharedHeaderTitle, useSharedHeaderOptions } from "@/shared";
import { useZustStore } from "@/state";
import { ComingSoonBadge, ModalCloseButton } from "@/universe/atoms";
import { MiniNav } from "@/universe/molecules";

export default function CommunityRootLayout() {
  const { selectedCommunity } = useZustStore();
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
          headerLeft: () => (
            <View className="mr-auto flex max-w-[80%] flex-row items-center gap-sm">
              <Text
                className="text-xl font-bold text-black dark:text-ivory"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Manage {selectedCommunity?.name ?? ""}
              </Text>
              <ComingSoonBadge size="sm" />
            </View>
          ),
          headerRight: () => <ModalCloseButton />,
          presentation: "modal",
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
