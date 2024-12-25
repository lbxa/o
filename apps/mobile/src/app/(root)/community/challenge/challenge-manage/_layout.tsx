import { Stack } from "expo-router";

import { SharedHeaderTitle, useSharedHeaderOptions } from "@/shared";

export default function ChallengeManageRoot() {
  const { customTitleOptions } = useSharedHeaderOptions();

  return (
    <Stack
      screenOptions={{
        ...customTitleOptions,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerLeft: () => <SharedHeaderTitle title="Challenge" />,
        }}
      />
      <Stack.Screen
        name="challenge-name"
        options={{
          headerLeft: () => <SharedHeaderTitle title="Name" />,
        }}
      />
      <Stack.Screen
        name="challenge-description"
        options={{
          headerLeft: () => <SharedHeaderTitle title="Description" />,
        }}
      />
    </Stack>
  );
}
