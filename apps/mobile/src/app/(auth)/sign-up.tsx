import React, { useRef } from "react";
import { PrimaryButton, PrimaryTextInput } from "@universe/atoms";
import { PrimaryPasswordInput } from "@universe/atoms/PrimaryPasswordInput";
import type { GestureResponderEvent } from "react-native";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { useMutation } from "react-relay";
import { UserCreateMutation } from "../../users";
import type { userCreateMutation } from "../../users/__generated__/userCreateMutation.graphql";
import { Controller, useForm } from "react-hook-form";
import type { CreateUserInput } from "@o/api";
import { graphql } from "react-relay";

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

type UserSignUpFormFields = {
  passwordRepeat: string;
} & CreateUserInput;

export default function SignUp() {
  const [commitMutation, isMutationInFlight] =
    useMutation<userCreateMutation>(UserCreateMutation);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UserSignUpFormFields>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordRepeat: "",
    },
  });

  const passwordRef = useRef({});
  passwordRef.current = watch("password");

  const onSubmit = (data: CreateUserInput) => {
    const { firstName, lastName, email, password } = data;
    commitMutation({
      variables: {
        userInput: { firstName, lastName, email, password },
      },
    });
  };

  return (
    <SafeAreaView>
      <ScrollView className="h-full">
        <View className="w-full px-md">
          <Text className="text-3xl font-black mb-md">Sign Up</Text>
          <View className="flex flex-row justify-between mb-md gap-md">
            <Controller
              name="firstName"
              control={control}
              rules={{ required: true }}
              render={({ field: { onBlur, onChange, value } }) => (
                <PrimaryTextInput
                  className="flex-1"
                  placeholder="First Name"
                  inputMode="text"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.firstName}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              rules={{ required: true }}
              render={({ field: { onBlur, onChange, value } }) => (
                <PrimaryTextInput
                  className="flex-1"
                  placeholder="Last Name"
                  inputMode="text"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.lastName}
                />
              )}
            />
          </View>

          <Controller
            name="email"
            control={control}
            rules={{
              required: true,
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Invalid email",
              },
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <PrimaryTextInput
                className="mb-md"
                placeholder="email@address.com"
                inputMode="email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.email}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: true,
              minLength: {
                value: 8,
                message: "Password must be > 8 characters",
              },
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <PrimaryPasswordInput
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.password}
              />
            )}
          />

          <Controller
            name="passwordRepeat"
            control={control}
            rules={{
              required: true,
              minLength: {
                value: 8,
                message: "Password must be > 8 characters",
              },
              validate: (repeatedPassword) =>
                repeatedPassword === passwordRef.current ||
                "Passwords do not match",
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <PrimaryPasswordInput
                placeholder="Repeat Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.passwordRepeat}
              />
            )}
          />

          <PrimaryButton
            title="Join the community"
            disabled={isMutationInFlight}
            onPress={(e) => {
              // Read more about event pooling
              // https://legacy.reactjs.org/docs/legacy-event-pooling.html
              e.persist();
              handleSubmit(onSubmit);
            }}
          ></PrimaryButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
