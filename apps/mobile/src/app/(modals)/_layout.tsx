import { Stack } from "expo-router";

import { useSharedHeaderOptions } from "../../shared";

export default function ModalsLayout() {
  const sharedHeaderOptions = useSharedHeaderOptions();
  return (
    <Stack>
      <Stack.Screen
        name="[user]"
        options={{
          ...sharedHeaderOptions,
        }}
      />
    </Stack>
  );
}
