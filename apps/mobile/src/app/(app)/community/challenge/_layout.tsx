import ChevronLeftIcon from "@assets/icons/chevron-left.svg";
import { Stack, useRouter } from "expo-router";
import { Text, View } from "react-native";

import { OTouchable } from "@/universe/atoms";

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
              <OTouchable onPress={() => router.back()}>
                <ChevronLeftIcon />
              </OTouchable>
              <Text className="text-3xl font-bold">New Challenge</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="invite"
        options={{
          headerLeft: () => (
            <Text className="text-xl font-bold">Invite your friends</Text>
          ),
          headerBackVisible: true,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
