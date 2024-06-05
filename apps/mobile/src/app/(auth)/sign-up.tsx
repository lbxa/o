import { Card, PrimaryButton, PrimaryTextInput } from "@universe/atoms";
import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function SignIn() {
  return (
    <SafeAreaView>
      <ScrollView className="h-full"> 
        <View className="px-md">
          <Card>
            <Text className="font-mono text-center text-3xl font-light">Welcome to CHAMP</Text>
          </Card>
          <PrimaryTextInput placeholder="Username" inputMode="text"/>
          <PrimaryTextInput placeholder="name@email.com" inputMode="email"/>
          <PrimaryTextInput placeholder="Password" secureTextEntry/>
          <PrimaryTextInput placeholder="Repeat password" secureTextEntry/>
          <PrimaryButton title="Join the journey"></PrimaryButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}