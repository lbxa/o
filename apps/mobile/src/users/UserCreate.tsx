import type { AuthCreateUserInput } from "@o/api-gql";
import { Link, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { useMutation } from "react-relay";
import { graphql } from "react-relay";

import { OButton, PrimaryTextInputControl } from "@/universe/atoms";
import { OPasswordInput } from "@/universe/atoms/OPasswordInput";
import { Ozone } from "@/universe/molecules";

import type { UserCreateMutation } from "../__generated__/UserCreateMutation.graphql";

export const USER_VALIDATE_EMAIL_QUERY = graphql`
  query UserCreateValidateEmailQuery($email: String!) {
    userValidateEmail(email: $email) {
      alreadyTaken
    }
  }
`;

const USER_CREATE_MUTATION = graphql`
  mutation UserCreateMutation($userInput: AuthCreateUserInput!) {
    authCreateUser(authCreateUserInput: $userInput) {
      user {
        ...UserFragment
      }
      tokens {
        accessToken
        refreshToken
      }
    }
  }
`;

// const EmailCheckMessage = ({
//   queryRef,
// }: {
//   queryRef: PreloadedQuery<UserCreateValidateEmailQuery>;
// }) => {
//   const data = usePreloadedQuery(USER_VALIDATE_EMAIL_QUERY, queryRef);

//   return (
//     <View>
//       <Text>
//         {data.userValidateEmail?.alreadyTaken ? "Email already taken" : ""}
//       </Text>
//     </View>
//   );
// };

export const UserCreate = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [commitMutation, isMutationInFlight] =
    useMutation<UserCreateMutation>(USER_CREATE_MUTATION);

  // TODO finish dup email check
  // const [isPending, startTransition] = useTransition();
  // const [email, setEmail] = useState<string>("");
  // const [queryRef, loadQuery, disposeQuery] =
  //   useQueryLoader<UserCreateValidateEmailQuery>(USER_VALIDATE_EMAIL_QUERY);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthCreateUserInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: AuthCreateUserInput) => {
    const { firstName, lastName, email, password } = data;
    commitMutation({
      variables: {
        userInput: {
          firstName,
          lastName,
          email,
          password,
        },
      },
      updater: (store, data) => {
        if (data?.authCreateUser.user) {
          SecureStore.setItem(
            "ACCESS_TOKEN",
            data.authCreateUser.tokens.accessToken
          );
          SecureStore.setItem(
            "REFRESH_TOKEN",
            data.authCreateUser.tokens.refreshToken
          );
          router.replace("/(app)/home");
        }
      },
      onError: (e) => {
        setError(e.message.split("\n")[1]);
      },
    });
  };

  return (
    <Ozone>
      <View className="px-md">
        <View className="mb-md gap-md flex flex-row justify-between">
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
                autoFocus={true}
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
              keyboardType="email-address"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={(e) => {
                onChange(e);
                // loadQuery({ email: "hello" });
              }}
              value={value}
              error={!!errors.email}
              errorMessage={errors.email?.message}
            />
          )}
        />

        {/* {queryRef && <EmailCheckMessage queryRef={queryRef} />} */}

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
            <OPasswordInput
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.password}
              errorMessage={errors.password?.message}
            />
          )}
        />

        {error && (
          <Text className="mb-md text-center text-red-900">{error}</Text>
        )}

        <OButton
          title={isMutationInFlight ? "Loading..." : "Join the community"}
          disabled={isMutationInFlight}
          onPress={async (e) => {
            e.persist();
            // Read more about event pooling
            // https://legacy.reactjs.org/docs/legacy-event-pooling.html
            await handleSubmit(onSubmit)();
          }}
        ></OButton>
        <Link href="/(auth)/login" className="mt-md text-blue-700 underline">
          Already have an account
        </Link>
      </View>
    </Ozone>
  );
};
