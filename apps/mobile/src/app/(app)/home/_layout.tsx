import { Stack } from "expo-router";
import { Text } from "react-native";

import { MiniNav } from "@/universe/molecules";

export default function Root() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: () => "",
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerLeft: () => <Text className="text-3xl font-bold">oNex</Text>,
          headerRight: () => <MiniNav items={["search", "message"]} />,
        }}
      />
    </Stack>
  );
}
