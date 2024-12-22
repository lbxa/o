import { Stack, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { TextInput } from "react-native";
import { View } from "react-native";
import { graphql, useLazyLoadQuery, useMutation } from "react-relay";

import type { emailMutation } from "@/__generated__/emailMutation.graphql";
import type { emailQuery } from "@/__generated__/emailQuery.graphql";
import { OButton, OText, PrimaryTextInputControl } from "@/universe/atoms";
import { Ozone } from "@/universe/molecules";

interface EmailFormData {
  email: string;
}

export default function Email() {
  const router = useRouter();
  const [networkError, setNetworkError] = useState<string | undefined>(
    undefined
  );
  const emailRef = useRef<TextInput>(null);

  const user = useLazyLoadQuery<emailQuery>(
    graphql`
      query emailQuery {
        viewer {
          user {
            id
            email @required(action: THROW)
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
  } = useForm<EmailFormData>({
    defaultValues: {
      email: user.viewer?.user?.email,
    },
  });

  const [commitMutation, isMutationInFlight] = useMutation<emailMutation>(
    graphql`
      mutation emailMutation($input: UserUpdateInput!) {
        userUpdate(userUpdateInput: $input) {
          id
          email
        }
      }
    `
  );

  const onSubmit = (data: EmailFormData) => {
    if (!user.viewer?.user?.id) {
      throw new Error("User ID is required");
    }

    commitMutation({
      variables: {
        input: {
          id: user.viewer.user.id,
          email: data.email,
        },
      },
      onError: (e) => {
        setNetworkError(e.message.split("\n")[1]);
      },
      onCompleted: () => {
        setNetworkError(undefined);
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
        <View className="pt-md">
          <Controller
            control={control}
            rules={{
              required: { value: true, message: "Required" },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            name="email"
            render={({ field: { onChange, value, onBlur } }) => (
              <PrimaryTextInputControl
                ref={emailRef}
                placeholder="Email Address"
                value={value}
                onChangeText={onChange}
                returnKeyType="done"
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={onBlur}
                error={!!errors.email || !!networkError}
                errorMessage={errors.email?.message ?? networkError}
              />
            )}
          />
        </View>
        <OText className="text-gray-500 dark:text-gray-400">
          Your email is used for important account notifications and recovery.
          {"\n\n"}
          We'll never share your email address with other users.
        </OText>
      </View>
    </Ozone>
  );
}
