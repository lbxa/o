import { Text, View } from "react-native";

export const CommunitySocials = () => {
  return (
    <View className="flex flex-row items-center gap-sm">
      <View className="flex-row items-center">
        <View className="z-30 size-10 rounded-full border border-white bg-gray-500"></View>
        <View className="z-20 -ml-4 size-10 rounded-full border border-white bg-gray-400"></View>
        <View className="z-10 -ml-4 size-10 rounded-full border border-white bg-gray-300"></View>
      </View>
      <View className="flex flex-col">
        <Text>n members</Text>
        <Text>
          Joined by <Text className="font-bold">x</Text>,{" "}
          <Text className="font-bold">y</Text> and{" "}
          <Text className="font-bold">z others</Text>
        </Text>
      </View>
    </View>
  );
};
