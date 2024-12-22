import { Stack, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { graphql } from "react-relay";

import type { handleMutation } from "@/__generated__/handleMutation.graphql";
import type { handleQuery } from "@/__generated__/handleQuery.graphql";
import { OButton, OText, PrimaryTextInputControl } from "@/universe/atoms";
import { Ozone } from "@/universe/molecules";

interface HandleFormData {
  handle: string;
}

export default function Handle() {
  const router = useRouter();
  const user = useLazyLoadQuery<handleQuery>(
    graphql`
      query handleQuery {
        viewer {
          user {
            id
            handle @required(action: THROW)
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
  } = useForm<HandleFormData>({
    defaultValues: {
      handle: user.viewer?.user?.handle,
    },
  });

  const [commitMutation, isMutationInFlight] = useMutation<handleMutation>(
    graphql`
      mutation handleMutation($input: UserUpdateInput!) {
        userUpdate(userUpdateInput: $input) {
          id
          handle
        }
      }
    `
  );

  const onSubmit = (data: HandleFormData) => {
    if (!user.viewer?.user?.id) {
      throw new Error("User ID is required");
    }

    commitMutation({
      variables: {
        input: {
          id: user.viewer.user.id,
          handle: data.handle,
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
        <View className="pt-md">
          <Controller
            control={control}
            rules={{
              required: { value: true, message: "Required" },
              pattern: {
                value: /^[\w.]+$/,
                message:
                  "Only letters, numbers, underscores, and periods allowed",
              },
            }}
            name="handle"
            render={({ field: { onChange, value, onBlur } }) => (
              <PrimaryTextInputControl
                placeholder="Username"
                value={value}
                onChangeText={onChange}
                returnKeyType="done"
                autoCapitalize="none"
                onBlur={onBlur}
                error={!!errors.handle}
                errorMessage={errors.handle?.message}
              />
            )}
          />
        </View>
        <OText className="text-gray-500 dark:text-gray-400">
          Your username is unique and helps others find you.
          {"\n\n"}
          It can contain letters, numbers, underscores and periods, but no
          spaces.
        </OText>
      </View>
    </Ozone>
  );
}
