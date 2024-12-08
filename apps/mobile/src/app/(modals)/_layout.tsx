import { Stack } from "expo-router";

export default function ModalsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[user]"
        options={{
          headerTitle: "",
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
