import tailwind from "@o/tailwind/base";
import { Stack } from "expo-router";

import { SharedHeaderTitle, useSharedHeaderOptions } from "../../../../shared";
import { useOTheme } from "../../../../utils";

const colors = tailwind.theme.extend.colors;

export default function Root() {
  const sharedHeaderOptions = useSharedHeaderOptions();
  const { isDark } = useOTheme();

  return (
    <Stack
      screenOptions={{
        ...sharedHeaderOptions,
        headerStyle: {
          backgroundColor: isDark ? "#000000" : colors.ivory.DEFAULT,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerLeft: () => <SharedHeaderTitle title="Manage Profile" />,
        }}
      />
      <Stack.Screen
        name="name"
        options={{
          headerLeft: () => <SharedHeaderTitle title="Name" />,
        }}
      />
      <Stack.Screen
        name="handle"
        options={{
          headerLeft: () => <SharedHeaderTitle title="Handle" />,
        }}
      />
      <Stack.Screen
        name="email"
        options={{
          headerLeft: () => <SharedHeaderTitle title="Email" />,
        }}
      />
      <Stack.Screen
        name="bio"
        options={{
          headerLeft: () => <SharedHeaderTitle title="Bio" />,
        }}
      />
    </Stack>
  );
}
