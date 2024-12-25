import tailwind from "@o/tailwind/base";
import { Stack } from "expo-router";
import { Text } from "react-native";

import { MiniNav } from "@/universe/molecules";

import { useSharedHeaderOptions } from "../../../shared";
import { useOTheme } from "../../../utils";

const colors = tailwind.theme.extend.colors;

export default function Root() {
  const { builtInTitleOptions } = useSharedHeaderOptions();
  const { isDark } = useOTheme();

  return (
    <Stack
      screenOptions={{
        ...builtInTitleOptions,
        headerStyle: {
          backgroundColor: isDark ? "#000000" : colors.ivory.DEFAULT,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
          headerLeft: () => (
            <Text className="text-3xl font-bold text-black dark:text-ivory">
              Profile
            </Text>
          ),
          headerRight: () => (
            <MiniNav
              items={["manage"]}
              itemConfigs={{
                manage: { href: "/profile/profile-manage" },
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="(profile-manage)/profile-manage"
        options={{
          title: "Manage",
        }}
      />
      <Stack.Screen
        name="(profile-manage)/profile-manage-name"
        options={{
          title: "Name",
        }}
      />
      <Stack.Screen
        name="(profile-manage)/profile-manage-handle"
        options={{
          title: "Handle",
        }}
      />
      <Stack.Screen
        name="(profile-manage)/profile-manage-email"
        options={{
          title: "Email",
        }}
      />
      <Stack.Screen
        name="(profile-manage)/profile-manage-bio"
        options={{
          title: "Bio",
        }}
      />
    </Stack>
  );
}
