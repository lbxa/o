import tailwind from "@o/tailwind/base";
import { Stack } from "expo-router";

import { SharedHeaderTitle, useSharedHeaderOptions } from "../../../../shared";
import { useOTheme } from "../../../../utils";

const colors = tailwind.theme.extend.colors;

export default function Root() {
  const { customTitleOptions } = useSharedHeaderOptions();
  const { isDark } = useOTheme();

  return (
    <Stack
      screenOptions={{
        ...customTitleOptions,
        headerStyle: {
          backgroundColor: isDark ? "#000000" : colors.ivory.DEFAULT,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerLeft: () => <SharedHeaderTitle title="Manage" />,
        }}
      />
      <Stack.Screen
        name="user-name"
        options={{
          headerLeft: () => <SharedHeaderTitle title="Name" />,
        }}
      />
      <Stack.Screen
        name="user-handle"
        options={{
          headerLeft: () => <SharedHeaderTitle title="Handle" />,
        }}
      />
      <Stack.Screen
        name="user-email"
        options={{
          headerLeft: () => <SharedHeaderTitle title="Email" />,
        }}
      />
      <Stack.Screen
        name="user-bio"
        options={{
          headerLeft: () => <SharedHeaderTitle title="Bio" />,
        }}
      />
    </Stack>
  );
}
