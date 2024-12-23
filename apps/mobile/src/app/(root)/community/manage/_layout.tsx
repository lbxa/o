import { Stack } from "expo-router";

import { SharedHeaderTitle, useSharedHeaderOptions } from "@/shared";

export default function CommunityManageRoot() {
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
          headerLeft: () => <SharedHeaderTitle title="Manage" />,
        }}
      />
      <Stack.Screen
        name="community-name"
        options={{
          headerLeft: () => <SharedHeaderTitle title="Name" />,
        }}
      />
      <Stack.Screen
        name="community-visibility"
        options={{
          headerLeft: () => <SharedHeaderTitle title="Visibility" />,
        }}
      />
    </Stack>
  );
}