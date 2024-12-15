import tailwind from "@o/tailwind/base";
import { Stack } from "expo-router";
import { Text } from "react-native";

import { MiniNav } from "@/universe/molecules";

import { useSharedHeaderOptions } from "../../../shared";
import { ModalCloseButton } from "../../../universe/atoms";
import { useOTheme } from "../../../utils";

const colors = tailwind.theme.extend.colors;

export default function Root() {
  const sharedHeaderOptions = useSharedHeaderOptions();
  const { isDark } = useOTheme();

  return (
    <Stack
      screenOptions={{
        ...sharedHeaderOptions,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerStyle: {
            backgroundColor: isDark ? "#000000" : colors.ivory.DEFAULT,
          },
          headerLeft: () => (
            <Text className="dark:text-ivory text-3xl font-bold text-black">
              Profile
            </Text>
          ),
          headerRight: () => (
            <MiniNav
              items={["manage"]}
              itemConfigs={{ manage: { href: "/profile/manage" } }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="manage"
        options={{
          headerLeft: () => (
            <Text className="dark:text-ivory text-xl font-bold text-black">
              Manage Profile
            </Text>
          ),
          headerRight: () => <ModalCloseButton />,
          headerBackVisible: true,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
