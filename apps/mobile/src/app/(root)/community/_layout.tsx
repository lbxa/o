import ChevronLeftIcon from "@assets/icons/chevron-left.svg";
import { Stack, useRouter } from "expo-router";
import { Text, View } from "react-native";

import { useZustStore } from "@/state";
import {
  ComingSoonBadge,
  ModalCloseButton,
  OTouchable,
} from "@/universe/atoms";
import { MiniNav } from "@/universe/molecules";

export default function CommunityRootLayout() {
  const router = useRouter();
  const { selectedCommunity } = useZustStore();

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
        name="index"
        options={{
          headerLeft: () => (
            <Text className="text-3xl font-bold">Community</Text>
          ),
          headerRight: () => (
            <MiniNav items={["create", "search", "message"]} />
          ),
        }}
      />
      <Stack.Screen
        name="invite"
        options={{
          headerLeft: () => (
            <Text className="text-xl font-bold">Invite your friends</Text>
          ),
          headerRight: () => <ModalCloseButton />,
          headerBackVisible: true,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="manage"
        options={{
          headerLeft: () => (
            <View className="gap-sm mr-auto flex max-w-[80%] flex-row items-center">
              <Text
                className="text-xl font-bold"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Manage {selectedCommunity?.name ?? ""}
              </Text>
              <ComingSoonBadge size="sm" />
            </View>
          ),
          headerRight: () => <ModalCloseButton />,
          headerBackVisible: true,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          headerLeft: () => (
            <View className="gap-sm flex flex-row items-center">
              <OTouchable onPress={() => router.back()}>
                <ChevronLeftIcon />
              </OTouchable>
              <Text className="text-3xl font-bold">New Community</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="challenge"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
