import type { AuthCreateUserInput } from "@o/api";
import { PrimaryButton, PrimaryTextInputControl } from "@universe/atoms";
import { PrimaryPasswordInput } from "@universe/atoms/PrimaryPasswordInput";
import { Ozone } from "@universe/molecules";
import React, { useRef, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import {
  fetchQuery,
  PreloadOptions,
  useLazyLoadQuery,
  useMutation,
  usePreloadedQuery,
  useQueryLoader,
  useRelayEnvironment,
} from "react-relay";
import { graphql } from "react-relay";

import type { UserCreateMutation } from "../__generated__/UserCreateMutation.graphql";
import type { UserCreateValidateEmailQuery } from "../__generated__/UserCreateValidateEmailQuery.graphql";

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
    }
  }
`;

const EmailCheckMessage = ({
  queryRef,
}: {
  queryRef: PreloadedQuery<UserCreateValidateEmailQuery>;
}) => {
  const data = usePreloadedQuery(USER_VALIDATE_EMAIL_QUERY, queryRef);

  return (
    <View>
      {data.userValidateEmail?.alreadyTaken ? "Email already taken" : ""}
    </View>
  );
};

type UserSignUpFormFields = {
  passwordRepeat: string;
} & AuthCreateUserInput;

export const UserCreate = () => {
  const [commitMutation, isMutationInFlight] =
    useMutation<UserCreateMutation>(USER_CREATE_MUTATION);

  // TODO finish dup email check
  // const [isPending, startTransition] = useTransition();
  // const [email, setEmail] = useState<string>("");

  // const something = useLazyLoadQuery<UserCreateValidateEmailQuery>(
  //   USER_VALIDATE_EMAIL_QUERY,
  //   { email: "hello" },
  //   { fetchPolicy: "network-only" }
  // );

  const [queryRef, loadQuery] = useQueryLoader<UserCreateValidateEmailQuery>(
    USER_VALIDATE_EMAIL_QUERY
  );

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
      onError: (e) => {
        console.log(1, e.name);
        console.log(2, e.message);
      },
    });
  };

  return (
    <Ozone>
      <View className="px-md">
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
        {queryRef && <EmailCheckMessage queryRef={queryRef} />}

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
            // Read more about event pooling
            // https://legacy.reactjs.org/docs/legacy-event-pooling.html
            await handleSubmit(onSubmit)();
          }}
        ></PrimaryButton>
      </View>
    </Ozone>
  );
};
