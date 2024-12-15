import { Stack } from "expo-router";
import { Text, View } from "react-native";

import { SharedHeaderTitle, useSharedHeaderOptions } from "@/shared";
import { MiniNav } from "@/universe/molecules";

import { ComingSoonBadge } from "../../../universe/atoms";

export default function Root() {
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
              oNex
            </Text>
          ),
          headerRight: () => (
            <MiniNav
              items={["notifications", "search", "message"]}
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
            <View className="flex flex-row items-center gap-sm">
              <SharedHeaderTitle title="Messages" />
              <ComingSoonBadge size="sm" />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{
          headerLeft: () => <SharedHeaderTitle title="Notifications" />,
        }}
      />
    </Stack>
  );
}
