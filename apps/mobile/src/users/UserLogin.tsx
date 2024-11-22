import type { AuthLoginInput } from "@o/api-gql";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Text } from "react-native";
import { useMutation } from "react-relay";
import { graphql } from "react-relay";

import type { UserLoginMutation } from "@/__generated__/UserLoginMutation.graphql";
import { useZustStore } from "@/state";
import {
  OButton,
  OPasswordInput,
  PrimaryTextInputControl,
} from "@/universe/atoms";
import { Ozone } from "@/universe/molecules";
import { useSecureStore } from "@/utils";

import type { UserLoginUpdatableQuery } from "../__generated__/UserLoginUpdatableQuery.graphql";

const _ = graphql`
  fragment UserLoginFragment_viewer_assignable on User @assignable {
    __typename
  }
`;

export const UserLogin = () => {
  const router = useRouter();
  const { setActiveUser } = useZustStore();
  const { setStoreItem } = useSecureStore();
  const [error, setError] = useState<string | null>(null);
  const [commitMutation, isMutationInFlight] = useMutation<UserLoginMutation>(
    graphql`
      mutation UserLoginMutation($authLoginInput: AuthLoginInput!) {
        authLogin(authLoginInput: $authLoginInput) {
          tokens {
            accessToken
            refreshToken
          }
          user {
            ...UserLoginFragment_viewer_assignable
            id
            firstName
            lastName
            email
          }
        }
      }
    `
  );

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
      onError: (e) => {
        setError(e.message.split("\n")[1]);
      },
      updater: (proxyStore, data) => {
        if (!data?.authLogin) {
          throw new Error("No data returned from user login");
        }
        proxyStore.invalidateStore();

        const { updatableData } =
          proxyStore.readUpdatableQuery<UserLoginUpdatableQuery>(
            graphql`
              query UserLoginUpdatableQuery @updatable {
                viewer {
                  user {
                    ...UserLoginFragment_viewer_assignable
                  }
                }
              }
            `,
            {}
          );

        if (updatableData.viewer) {
          console.log("Viewer has been updated in the cache!");
          updatableData.viewer.user = data.authLogin.user;
        }

        const { accessToken, refreshToken } = data.authLogin.tokens;
        setStoreItem("ACCESS_TOKEN", accessToken);
        setStoreItem("REFRESH_TOKEN", refreshToken);
        setActiveUser(data.authLogin.user);
        setActiveUser(data.authLogin.user);

        router.replace("/(root)/home");
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
            <OPasswordInput
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
        {error && (
          <Text className="mb-md text-center text-red-900">{error}</Text>
        )}
        <OButton
          title={isMutationInFlight ? "Loading..." : "Login"}
          disabled={isMutationInFlight}
          onPress={async (e) => {
            // Read more about event pooling
            // https://legacy.reactjs.org/docs/legacy-event-pooling.html
            e.persist();
            await handleSubmit(onSubmit)();
          }}
        ></OButton>
        <Link href="/(auth)/sign-up" className="mt-md text-blue-700 underline">
          Create an account
        </Link>
      </View>
    </Ozone>
  );
};
