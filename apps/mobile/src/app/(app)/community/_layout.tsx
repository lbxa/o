import { Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import ChevronLeftIcon from "../../../../assets/icons/chevron-left.svg";

export default function CommunityRoot() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: () => "",
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="create"
        options={{
          headerLeft: () => (
            <View className="flex flex-row items-center gap-sm">
              <TouchableOpacity>
                <ChevronLeftIcon />
              </TouchableOpacity>
              <Text className="text-3xl font-bold">New Community</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          headerLeft: () => (
            <View className="flex flex-row items-center gap-sm">
              <TouchableOpacity>
                <ChevronLeftIcon />
              </TouchableOpacity>
              <Text className="text-3xl font-bold">Search</Text>
            </View>
          ),
        }}
      />
    </Stack>
  );
}
