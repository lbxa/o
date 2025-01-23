import { Stack } from "expo-router";
import { Text } from "react-native";

import { useSharedHeaderOptions } from "@/shared";
import { ModalCloseButton, OText } from "@/universe/atoms";
import { MiniNav } from "@/universe/molecules";

export default function CommunityRootLayout() {
  const { builtInTitleOptions } = useSharedHeaderOptions();
  return (
    <Stack
      screenOptions={{
        ...builtInTitleOptions,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Community",
          headerLeft: () => (
            <Text className="text-3xl font-bold text-black dark:text-ivory">
              Community
            </Text>
          ),
          headerRight: () => (
            <MiniNav
              items={["create", "search"]}
              itemConfigs={{
                search: { href: "/(root)/community/community-search" },
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="community-invite"
        options={{
          headerLeft: () => (
            <Text className="text-xl font-bold text-black dark:text-ivory">
              Invite your friends
            </Text>
          ),
          headerRight: () => <ModalCloseButton />,
          headerBackVisible: true,
          presentation: "modal",
        }}
      />
      <Stack.Screen name="community-search" />
      <Stack.Screen
        name="(community-manage)/community-manage"
        options={{
          title: "Manage",
        }}
      />
      <Stack.Screen
        name="(community-manage)/community-manage-name"
        options={{
          title: "Name",
        }}
      />
      <Stack.Screen
        name="(community-manage)/community-manage-visibility"
        options={{
          title: "Visibility",
        }}
      />
      <Stack.Screen
        name="community-create"
        options={{
          title: "New Community",
        }}
      />
      <Stack.Screen
        name="community-message"
        options={{
          title: "Community Chat",
        }}
      />
      <Stack.Screen
        name="challenge/challenge-create"
        options={{
          title: "New Challenge",
        }}
      />
      <Stack.Screen
        name="challenge/challenge-invite"
        options={{
          headerLeft: () => (
            <OText className="text-xl font-bold">Invite your friends</OText>
          ),
          headerRight: () => <ModalCloseButton />,
          headerBackVisible: true,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="challenge/(challenge-manage)/challenge-manage"
        options={{
          title: "Manage",
        }}
      />
      <Stack.Screen
        name="challenge/(challenge-manage)/challenge-name"
        options={{
          title: "Name",
        }}
      />
      <Stack.Screen
        name="challenge/(challenge-manage)/challenge-description"
        options={{
          title: "Description",
        }}
      />
    </Stack>
  );
}
