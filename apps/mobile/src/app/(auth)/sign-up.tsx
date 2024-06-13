import React from "react";
import { PrimaryButton, PrimaryTextInput } from "@universe/atoms";
import { PrimaryPasswordInput } from "@universe/atoms/PrimaryPasswordInput";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { useMutation } from "react-relay";
import { UserCreateMutation } from "../../users";
import type { userCreateMutation } from "../../users/__generated__/userCreateMutation.graphql";
import { Controller, useForm } from "react-hook-form";
import type { CreateUserInput } from "@o/api";
// import { useLazyLoadQuery, graphql } from "react-relay";
// import type { signUpUserQuery } from "./__generated__/signUpUserQuery.graphql";

// const UserProfileFragment = graphql`
//   fragment signUpUserFragment on User {
//     _id: id
//     firstName
//     lastName
//     email
//   }
// `;

// const UserProfileQuery = graphql`
//   query signUpUserQuery($id: Int!) {
//     user(id: $id) {
//        _id: id
//         firstName
//         lastName
//         email
//     }
//   }
// `;

export default function SignUp() {
  // const { user } = useLazyLoadQuery<signUpUserQuery>(UserProfileQuery, { id: 1 });
  const [commitMutation, isMutationInFlight] =
    useMutation<userCreateMutation>(UserCreateMutation);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const onSubmit = (data: CreateUserInput) => {
    console.log(data);
    commitMutation({
      variables: {
        userInput: {
          firstName: "Erin",
          lastName: "Jones",
          email: "erin@jones.com",
        },
      },
    });
  };

  return (
    <SafeAreaView>
      <ScrollView className="h-full">
        <View className="px-md">
          <Text className="text-3xl font-black mb-sm">Sign Up</Text>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: true }}
            render={({ field: { onBlur, onChange, value } }) => (
              <PrimaryTextInput
                placeholder="Username"
                inputMode="text"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          {errors.firstName && <Text>This is required!</Text>}
          <PrimaryTextInput placeholder="name@email.com" inputMode="email" />
          <PrimaryPasswordInput placeholder="Password" />
          <PrimaryPasswordInput placeholder="Repeat password" />

          <PrimaryButton
            title="Join the community"
            disabled={isMutationInFlight}
            onPress={handleSubmit(onSubmit)}
          ></PrimaryButton>

          {/* <Text>{user?._id + ': ' + user?.firstName + ' ' + user?.lastName}</Text> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
