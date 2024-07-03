import type { AuthLoginInput } from "@o/api";
import {
  PrimaryButton,
  PrimaryPasswordInput,
  PrimaryTextInputControl,
} from "@universe/atoms";
import { Ozone } from "@universe/molecules";
import { Link, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { useMutation } from "react-relay";
import { graphql } from "react-relay";

import type { UserLoginMutation } from "../__generated__/UserLoginMutation.graphql";

const userLoginMutation = graphql`
  mutation UserLoginMutation($authLoginInput: AuthLoginInput!) {
    authLogin(authLoginInput: $authLoginInput) {
      accessToken
      refreshToken
    }
  }
`;

export const UserLogin = () => {
  const router = useRouter();
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
          SecureStore.setItem("ACCESS_TOKEN", data.authLogin.accessToken);
          console.log("accessToken", SecureStore.getItem("ACCESS_TOKEN"));
          router.replace("(app)/home");
        }
        // store.get("id");
        // data?.login.accessToken;
      },
      // optimisticUpdater: {},
    });
  };

  return (
    <Ozone>
      <View className="px-md">
        <Text className="text-3xl font-black mb-md">Login</Text>
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

        <PrimaryButton
          title={isMutationInFlight ? "Loading..." : "Login"}
          disabled={isMutationInFlight}
          onPress={async (e) => {
            // Read more about event pooling
            // https://legacy.reactjs.org/docs/legacy-event-pooling.html
            e.persist();
            await handleSubmit(onSubmit)();
          }}
        ></PrimaryButton>
        <Link href="(auth)/sign-up" className="mt-md underline text-blue-700">
          Create an account
        </Link>
      </View>
    </Ozone>
  );
};
