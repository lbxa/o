import React, { useRef } from "react";
import { PrimaryButton, PrimaryTextInputControl } from "@universe/atoms";
import { PrimaryPasswordInput } from "@universe/atoms/PrimaryPasswordInput";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { useMutation } from "react-relay";
import { UserSignupMutation } from "../../users";
import { Controller, useForm } from "react-hook-form";
import type { CreateUserInput } from "@o/api";
import type { userSignupMutation } from "../../__generated__/userSignupMutation.graphql";

type UserSignUpFormFields = {
  passwordRepeat: string;
} & CreateUserInput;

export default function SignUp() {
  const [commitMutation, isMutationInFlight] =
    useMutation<userSignupMutation>(UserSignupMutation);

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
              rules={{ required: { value: true, message: "Required field" } }}
              render={({ field: { onBlur, onChange, value } }) => (
                <PrimaryTextInputControl
                  className="flex-1"
                  placeholder="First Name"
                  inputMode="text"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.firstName}
                  errorMessage={errors.firstName?.message}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              rules={{ required: { value: true, message: "Required field" } }}
              render={({ field: { onBlur, onChange, value } }) => (
                <PrimaryTextInputControl
                  className="flex-1"
                  placeholder="Last Name"
                  inputMode="text"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.lastName}
                  errorMessage={errors.lastName?.message}
                />
              )}
            />
          </View>

          <Controller
            name="email"
            control={control}
            rules={{
              required: { value: true, message: "Required field" },
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Invalid email",
              },
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <PrimaryTextInputControl
                className="mb-md"
                placeholder="email@address.com"
                inputMode="email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.email}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: { value: true, message: "Required field" },
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
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            name="passwordRepeat"
            control={control}
            rules={{
              required: { value: true, message: "Required field" },
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
                errorMessage={errors.passwordRepeat?.message}
              />
            )}
          />

          <PrimaryButton
            title={isMutationInFlight ? "Loading..." : "Join the community"}
            disabled={isMutationInFlight}
            onPress={async (e) => {
              e.persist();
              e.preventDefault();
              // Read more about event pooling
              // https://legacy.reactjs.org/docs/legacy-event-pooling.html
              await handleSubmit(onSubmit)(e);
            }}
          ></PrimaryButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
