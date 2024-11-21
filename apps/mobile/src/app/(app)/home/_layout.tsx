import ChevronLeftIcon from "@assets/icons/chevron-left.svg";
import { Stack, useRouter } from "expo-router";
import { Text, View } from "react-native";

import { OTouchable } from "@/universe/atoms";
import { MiniNav } from "@/universe/molecules";

export default function Root() {
  const router = useRouter();

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
      <Stack.Screen
        name="message"
        options={{
          headerLeft: () => (
            <View className="flex flex-row items-center gap-sm">
              <OTouchable onPress={() => router.back()}>
                <ChevronLeftIcon />
              </OTouchable>
              <Text className="text-3xl font-bold">Messages</Text>
            </View>
          ),
        }}
      />
    </Stack>
  );
}
