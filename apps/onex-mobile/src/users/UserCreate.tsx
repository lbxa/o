import type { AuthCreateUserInput } from "@o/onex-api-gql";
import { Link, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { TextInput } from "react-native";
import { View } from "react-native";
import { useMutation } from "react-relay";
import { graphql } from "react-relay";

import { OButton, OText, PrimaryTextInputControl } from "@/universe/atoms";
import { OPasswordInput } from "@/universe/atoms/OPasswordInput";
import { Ozone } from "@/universe/molecules";

import type { UserCreateMutation } from "../__generated__/UserCreateMutation.graphql";
import type { UserCreateUpdatableQuery } from "../__generated__/UserCreateUpdatableQuery.graphql";
import { useZustStore } from "../state";
import { useSecureStore } from "../utils";

// export const USER_VALIDATE_EMAIL_QUERY = graphql`
//   query UserCreateValidateEmailQuery($email: String!) {
//     userValidateEmail(email: $email) {
//       alreadyTaken
//     }
//   }
// `;

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

const _ = graphql`
  fragment UserCreateFragment_viewer_assignable on User @assignable {
    __typename
  }
`;

export const UserCreate = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { setActiveUser } = useZustStore();
  const { setStoreItem } = useSecureStore();
  const [commitMutation, isMutationInFlight] = useMutation<UserCreateMutation>(
    graphql`
      mutation UserCreateMutation($userInput: AuthCreateUserInput!) {
        authCreateUser(authCreateUserInput: $userInput) {
          user {
            ...UserCreateFragment_viewer_assignable
            id
            firstName
            lastName
            email
          }
          tokens {
            accessToken
            refreshToken
          }
        }
      }
    `
  );

  const firstNameRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const formRefs: Record<
    keyof AuthCreateUserInput,
    {
      ref: React.RefObject<TextInput>;
      next: React.RefObject<TextInput> | null;
    }
  > = {
    firstName: {
      ref: firstNameRef,
      next: lastNameRef,
    },
    lastName: {
      ref: lastNameRef,
      next: emailRef,
    },
    email: {
      ref: emailRef,
      next: passwordRef,
    },
    password: {
      ref: passwordRef,
      next: null,
    },
  };

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
      onError: (e) => {
        setError(e.message.split("\n")[1]);
      },
      updater: (proxyStore, data) => {
        if (!data?.authCreateUser) {
          throw new Error("No data returned from user registration");
        }
        proxyStore.invalidateStore();

        const { updatableData } =
          proxyStore.readUpdatableQuery<UserCreateUpdatableQuery>(
            graphql`
              query UserCreateUpdatableQuery @updatable {
                viewer {
                  user {
                    ...UserCreateFragment_viewer_assignable
                  }
                }
              }
            `,
            {}
          );

        if (updatableData.viewer) {
          updatableData.viewer.user = data.authCreateUser.user;
        }

        const { accessToken, refreshToken } = data.authCreateUser.tokens;
        setStoreItem("ACCESS_TOKEN", accessToken);
        setStoreItem("REFRESH_TOKEN", refreshToken);
        setActiveUser(data.authCreateUser.user);

        router.replace("/(root)/home");
      },
    });
  };

  return (
    <Ozone>
      <View className="mt-md px-md">
        <View className="mb-md flex flex-row justify-between gap-md">
          <Controller
            name="firstName"
            control={control}
            rules={{ required: { value: true, message: "Required field" } }}
            render={({ field: { onBlur, onChange, value } }) => (
              <PrimaryTextInputControl
                ref={formRefs.firstName.ref}
                className="flex-1"
                placeholder="First Name"
                inputMode="text"
                onBlur={onBlur}
                onChangeText={onChange}
                autoFocus={true}
                value={value}
                error={!!errors.firstName}
                errorMessage={errors.firstName?.message}
                returnKeyType="next"
                onSubmitEditing={() => {
                  formRefs.firstName.next?.current?.focus();
                }}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            rules={{ required: { value: true, message: "Required field" } }}
            render={({ field: { onBlur, onChange, value } }) => (
              <PrimaryTextInputControl
                ref={formRefs.lastName.ref}
                className="flex-1"
                placeholder="Last Name"
                inputMode="text"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.lastName}
                errorMessage={errors.lastName?.message}
                returnKeyType="next"
                onSubmitEditing={() => {
                  formRefs.lastName.next?.current?.focus();
                }}
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
              ref={formRefs.email.ref}
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
              returnKeyType="next"
              onSubmitEditing={() => {
                formRefs.email.next?.current?.focus();
              }}
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
              ref={formRefs.password.ref}
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.password}
              errorMessage={errors.password?.message}
              returnKeyType="done"
            />
          )}
        />

        {error && (
          <OText className="mb-md text-center" error>
            {error}
          </OText>
        )}

        <OButton
          title="Join the community"
          loading={isMutationInFlight}
          disabled={isMutationInFlight}
          onPress={async (e) => {
            e.persist();
            // Read more about event pooling
            // https://legacy.reactjs.org/docs/legacy-event-pooling.html
            await handleSubmit(onSubmit)();
          }}
        />
        <Link
          href="/auth/login"
          className="mt-md text-blue-700 underline dark:text-ivory"
        >
          Already have an account
        </Link>
      </View>
    </Ozone>
  );
};
