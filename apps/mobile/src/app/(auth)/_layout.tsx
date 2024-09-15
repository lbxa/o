import { Stack } from "expo-router";
import { Text } from "react-native";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: () => "",
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          title: "Login",
          headerLeft: () => <Text className="text-3xl font-bold">Login</Text>,
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          title: "Sign Up",
          headerLeft: () => <Text className="text-3xl font-bold">Sign Up</Text>,
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
