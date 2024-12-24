import { Stack } from "expo-router";
import { Text } from "react-native";

import { ModalCloseButton } from "@/universe/atoms";

import { SharedHeaderTitle, useSharedHeaderOptions } from "../../../../shared";

export default function ChallengeRoot() {
  const { customTitleOptions } = useSharedHeaderOptions();

  return (
    <Stack
      screenOptions={{
        ...customTitleOptions,
      }}
    >
      <Stack.Screen
        name="create"
        options={{
          headerLeft: () => <SharedHeaderTitle title="New Challenge" />,
        }}
      />
      <Stack.Screen
        name="invite"
        options={{
          headerLeft: () => (
            <Text className="text-xl font-bold">Invite your friends</Text>
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
    </Stack>
  );
}
