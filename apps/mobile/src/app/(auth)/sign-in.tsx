import { PrimaryButton, PrimaryTextInput } from "@universe/atoms";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function SignIn() {
  return (
    <SafeAreaView>
      <ScrollView className="h-full">
        <View className="px-md">
          <Text className="text-3xl font-black mb-sm">Sign In</Text>
          <PrimaryTextInput placeholder="name@email.com" inputMode="email" />
          <PrimaryTextInput placeholder="password" secureTextEntry />
          <PrimaryButton title="Sign In"></PrimaryButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
