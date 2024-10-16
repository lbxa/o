import type { AuthLoginInput } from "@o/api";
import { Link, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { useMutation } from "react-relay";
import { graphql } from "react-relay";

import {
  Button,
  PrimaryPasswordInput,
  PrimaryTextInputControl,
} from "@/universe/atoms";
import { Ozone } from "@/universe/molecules";

import type { UserLoginMutation } from "../__generated__/UserLoginMutation.graphql";
import { useSecureStore } from "../utils/useSecureStore";

const userLoginMutation = graphql`
  mutation UserLoginMutation($authLoginInput: AuthLoginInput!) {
    authLogin(authLoginInput: $authLoginInput) {
      accessToken
      refreshToken
      user {
        firstName
        lastName
        email
      }
    }
  }
`;

export const UserLogin = () => {
  const router = useRouter();
  const { setStoreItem } = useSecureStore();
  const [commitMutation, isMutationInFlight] =
    useMutation<UserLoginMutation>(userLoginMutation);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthLoginInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: AuthLoginInput) => {
    const { email, password } = data;
    commitMutation({
      variables: {
        authLoginInput: {
          email,
          password,
        },
      },
      updater: (store, data) => {
        if (data?.authLogin.accessToken) {
          // SecureStore.setItem("ACCESS_TOKEN", data.authLogin.accessToken);
          setStoreItem("ACCESS_TOKEN", data.authLogin.accessToken);
          setStoreItem("REFRESH_TOKEN", data.authLogin.refreshToken);

          console.log("accessToken", SecureStore.getItem("ACCESS_TOKEN"));
          console.log("refreshToken", SecureStore.getItem("REFRESH_TOKEN"));
          router.replace("/(app)/home");
        }
        // store.get("id");
        // data?.login.accessToken;
      },
    });
  };

  return (
    <Ozone>
      <View className="px-md">
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
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              autoCorrect={false}
              autoFocus={true}
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
              autoCorrect={false}
              value={value}
              error={!!errors.password}
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Button
          title={isMutationInFlight ? "Loading..." : "Login"}
          disabled={isMutationInFlight}
          onPress={async (e) => {
            // Read more about event pooling
            // https://legacy.reactjs.org/docs/legacy-event-pooling.html
            e.persist();
            await handleSubmit(onSubmit)();
          }}
        ></Button>
        <Link href="/(auth)/sign-up" className="mt-md text-blue-700 underline">
          Create an account
        </Link>
      </View>
    </Ozone>
  );
};
