import { Stack } from "expo-router";
import { Text } from "react-native";

import { useSharedHeaderOptions } from "../../shared";

export default function AuthLayout() {
  const userSharedHeaderOptions = useSharedHeaderOptions();
  return (
    <Stack
      screenOptions={{
        ...userSharedHeaderOptions,
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          title: "Login",
          headerLeft: () => (
            <Text className="text-3xl font-bold text-black dark:text-ivory">
              Login
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          title: "Sign Up",
          headerLeft: () => (
            <Text className="text-3xl font-bold text-black dark:text-ivory">
              Sign Up
            </Text>
          ),
        }}
      />
    </Stack>
  );
}
