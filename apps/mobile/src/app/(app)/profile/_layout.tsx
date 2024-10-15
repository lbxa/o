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
        headerStyle: { backgroundColor: "#edf4f8" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerLeft: () => <Text className="text-3xl font-bold">Profile</Text>,
          headerRight: () => <MiniNav items={["message"]} />,
        }}
      />
    </Stack>
  );
}
