import { Stack, useRouter } from "expo-router";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import type { TextInput } from "react-native";
import { View } from "react-native";
import { graphql, useLazyLoadQuery, useMutation } from "react-relay";

import type { profileManageBioMutation } from "@/__generated__/profileManageBioMutation.graphql";
import type { profileManageBioQuery } from "@/__generated__/profileManageBioQuery.graphql";
import { OButton, OText, PrimaryTextInputControl } from "@/universe/atoms";
import { Ozone } from "@/universe/molecules";

interface BioFormData {
  bio: string;
}

export default function Bio() {
  const router = useRouter();
  const bioRef = useRef<TextInput>(null);

  const user = useLazyLoadQuery<profileManageBioQuery>(
    graphql`
      query profileManageBioQuery {
        viewer {
          user {
            id
            bio
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
  } = useForm<BioFormData>({
    defaultValues: {
      bio: user.viewer?.user?.bio ?? "",
    },
  });

  const [commitMutation, isMutationInFlight] =
    useMutation<profileManageBioMutation>(graphql`
      mutation profileManageBioMutation($input: UserUpdateInput!) {
        userUpdate(userUpdateInput: $input) {
          id
          bio
        }
      }
    `);

  const onSubmit = (data: BioFormData) => {
    if (!user.viewer?.user?.id) {
      throw new Error("User ID is required");
    }

    commitMutation({
      variables: {
        input: {
          id: user.viewer.user.id,
          bio: data.bio,
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
              maxLength: {
                value: 160,
                message: "Bio cannot exceed 160 characters",
              },
            }}
            name="bio"
            render={({ field: { onChange, value, onBlur } }) => (
              <PrimaryTextInputControl
                ref={bioRef}
                placeholder="Write a short bio about yourself"
                value={value}
                onChangeText={onChange}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                onBlur={onBlur}
                error={!!errors.bio}
                errorMessage={errors.bio?.message}
                style={{ height: 100 }}
                returnKeyType="done"
              />
            )}
          />
        </View>
        <OText className="text-gray-500 dark:text-gray-400">
          Tell others a bit about yourself. What are your interests?
          {"\n\n"}
          Your bio will be visible on your profile to all users.
        </OText>
      </View>
    </Ozone>
  );
}
