import { Stack } from "expo-router";
import { Text } from "react-native";

export default function MessageLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerLeft: () => <Text className="text-3xl font-bold">oNex</Text>,
        }}
      />
    </Stack>
  );
}
