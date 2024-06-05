import { PrimaryButton, PrimaryTextInput } from "@universe/atoms";
import { PrimaryPasswordInput } from "@universe/atoms/PrimaryPasswordInput";
import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function SignIn() {
  return (
    <SafeAreaView>
      <ScrollView className="h-full"> 
        <View className="px-md">
          <Text className="text-3xl font-black mb-sm">Sign Up</Text>
          <PrimaryTextInput placeholder="Username" inputMode="text"/>
          <PrimaryTextInput placeholder="name@email.com" inputMode="email"/>
          <PrimaryPasswordInput placeholder="Password"/>
          <PrimaryPasswordInput placeholder="Repeat password"/>
          <PrimaryButton title="Join the community"></PrimaryButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}