import { Stack, useRouter } from "expo-router";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import type { TextInput } from "react-native";
import { View } from "react-native";
import { graphql, useLazyLoadQuery, useMutation } from "react-relay";

import type { userNameMutation } from "@/__generated__/userNameMutation.graphql";
import type { userNameQuery } from "@/__generated__/userNameQuery.graphql";
import { OButton, OText, PrimaryTextInputControl } from "@/universe/atoms";
import { Ozone } from "@/universe/molecules";

interface NameFormData {
  firstName: string;
  lastName: string;
}

export default function Name() {
  const router = useRouter();
  const firstNameRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);

  const user = useLazyLoadQuery<userNameQuery>(
    graphql`
      query userNameQuery {
        viewer {
          user {
            id
            firstName @required(action: THROW)
            lastName @required(action: THROW)
          }
        }
      }
    `,
    {}
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NameFormData>({
    defaultValues: {
      firstName: user.viewer?.user?.firstName,
      lastName: user.viewer?.user?.lastName,
    },
  });

  const [commitMutation, isMutationInFlight] = useMutation<userNameMutation>(
    graphql`
      mutation userNameMutation($input: UserUpdateInput!) {
        userUpdate(userUpdateInput: $input) {
          id
          firstName
          lastName
        }
      }
    `
  );

  const onSubmit = (data: NameFormData) => {
    if (!user.viewer?.user?.id) {
      throw new Error("User ID is required");
    }

    commitMutation({
      variables: {
        input: {
          id: user.viewer.user.id,
          firstName: data.firstName,
          lastName: data.lastName,
        },
      },
      onCompleted: () => {
        router.back();
      },
    });
  };

  return (
    <Ozone>
      <Stack.Screen
        options={{
          headerRight: () => (
            <OButton
              title="Done"
              type="secondary"
              loading={isMutationInFlight}
              onPress={async (e) => {
                e.persist();
                await handleSubmit(onSubmit)();
              }}
            />
          ),
        }}
      />
      <View className="flex flex-col gap-md px-md">
        <View className="flex flex-row gap-md pt-md">
          <Controller
            control={control}
            rules={{ required: { value: true, message: "Required" } }}
            name="firstName"
            render={({ field: { onChange, value, onBlur } }) => (
              <PrimaryTextInputControl
                ref={firstNameRef}
                placeholder="First Name"
                value={value}
                onChangeText={onChange}
                className="flex-1"
                returnKeyType="next"
                onSubmitEditing={() => {
                  lastNameRef.current?.focus();
                }}
                onBlur={onBlur}
                error={!!errors.firstName}
                errorMessage={errors.firstName?.message}
              />
            )}
          />
          <Controller
            control={control}
            rules={{ required: { value: true, message: "Required" } }}
            name="lastName"
            render={({ field: { onChange, value, onBlur } }) => (
              <PrimaryTextInputControl
                ref={lastNameRef}
                placeholder="Last Name"
                value={value}
                onChangeText={onChange}
                className="flex-1"
                returnKeyType="done"
                onBlur={onBlur}
                error={!!errors.lastName}
                errorMessage={errors.lastName?.message}
              />
            )}
          />
        </View>
        <OText className="text-gray-500 dark:text-gray-400">
          Your name will be displayed to your friends and followers.
          {"\n\n"}
          This helps people recognize you and makes it easier for them to find
          and connect with you.
          {"\n\n"}
          You can change your name at any time, but we recommend using your real
          name to build trust within the community.
        </OText>
      </View>
    </Ozone>
  );
}
