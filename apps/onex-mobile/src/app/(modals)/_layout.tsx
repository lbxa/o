import { Stack } from "expo-router";

import { useSharedHeaderOptions } from "../../shared";

export default function ModalsLayout() {
  const { customTitleOptions } = useSharedHeaderOptions();
  return (
    <Stack>
      <Stack.Screen
        name="[user]"
        options={{
          ...customTitleOptions,
        }}
      />
    </Stack>
  );
}
