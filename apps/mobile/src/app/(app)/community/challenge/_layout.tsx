import ChevronLeftIcon from "@assets/icons/chevron-left.svg";
import { Touchable } from "@universe/atoms";
import { Stack, useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function ChallengeRoot() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: () => "",
        headerShadowVisible: false,
        headerBackVisible: false,
      }}
    >
      <Stack.Screen
        name="create"
        options={{
          headerLeft: () => (
            <View className="flex flex-row items-center gap-sm">
              <Touchable onPress={() => router.back()}>
                <ChevronLeftIcon />
              </Touchable>
              <Text className="text-3xl font-bold">New Challenge</Text>
            </View>
          ),
        }}
      />
    </Stack>
  );
}