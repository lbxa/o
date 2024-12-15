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
            <Text className="dark:text-ivory text-3xl font-bold text-black">
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
            <Text className="dark:text-ivory text-3xl font-bold text-black">
              Sign Up
            </Text>
          ),
        }}
      />
    </Stack>
  );
}
