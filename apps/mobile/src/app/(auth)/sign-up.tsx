import React from "react";
import { PrimaryButton, PrimaryTextInput } from "@universe/atoms";
import { PrimaryPasswordInput } from "@universe/atoms/PrimaryPasswordInput";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "relay-runtime";
import type { signUpQuery } from "./__generated__/signUpQuery.graphql";

// const UserProfileFragment = graphql`
//   fragment signUpUserFragment on User {
//     _id: id
//     firstName
//     lastName 
//     email
//   }
// `;

const UserProfileQuery = graphql`
  query signUpQuery($id: Int!) {
    user(id: $id) {
       _id: id
        firstName
        lastName 
        email
    }
  }
`;

export default function SignIn() {
  const { user } = useLazyLoadQuery<signUpQuery>(UserProfileQuery, { id: 1 });

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

          <Text>{user?._id + ': ' + user?.firstName + ' ' + user?.lastName}</Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}