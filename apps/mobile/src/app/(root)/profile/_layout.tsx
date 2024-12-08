import { Stack } from "expo-router";
import { Text } from "react-native";

import { MiniNav } from "@/universe/molecules";

import { ModalCloseButton } from "../../../universe/atoms";

export default function Root() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: () => "",
        headerShadowVisible: false,
        headerStyle: { backgroundColor: "#edf4f8" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerLeft: () => <Text className="text-3xl font-bold">Profile</Text>,
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
            <Text className="text-xl font-bold">Manage Profile</Text>
          ),
          headerRight: () => <ModalCloseButton />,
          headerBackVisible: true,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
