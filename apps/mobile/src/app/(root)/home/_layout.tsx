import { Stack } from "expo-router";
import { Text } from "react-native";

import { useSharedHeaderOptions } from "@/shared";
import { MiniNav } from "@/universe/molecules";

import { ComingSoonBadge } from "../../../universe/atoms";

export default function Root() {
  const { builtInTitleOptions } = useSharedHeaderOptions();

  return (
    <Stack
      screenOptions={{
        ...builtInTitleOptions,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
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
      <Stack.Screen name="user-search" />
      <Stack.Screen
        name="message"
        options={{
          title: "Messages",
          headerRight: () => <ComingSoonBadge size="sm" />,
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{
          title: "Notifications",
        }}
      />
    </Stack>
  );
}
