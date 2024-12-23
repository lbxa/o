import { Stack, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { TextInput } from "react-native";
import { View } from "react-native";
import { graphql, useLazyLoadQuery, useMutation } from "react-relay";

import type { communityNameMutation } from "@/__generated__/communityNameMutation.graphql";
import type { communityNameQuery } from "@/__generated__/communityNameQuery.graphql";
import { OButton, OText, PrimaryTextInputControl } from "@/universe/atoms";
import { Ozone } from "@/universe/molecules";

import { useZustStore } from "../../../../state";

interface NameFormData {
  name: string;
}

export default function CommunityManageName() {
  const router = useRouter();
  const [networkError, setNetworkError] = useState<string | undefined>(
    undefined
  );
  const nameRef = useRef<TextInput>(null);

  const selectedCommunityId = useZustStore(
    (state) => state.selectedCommunity?.id
  );
  if (!selectedCommunityId) {
    throw new Error("Community ID is required");
  }

  const community = useLazyLoadQuery<communityNameQuery>(
    graphql`
      query communityNameQuery($communityId: ID!) {
        viewer {
          community(communityId: $communityId) {
            id
            name @required(action: THROW)
          }
        }
      }
    `,
    { communityId: selectedCommunityId }
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NameFormData>({
    defaultValues: {
      name: community.viewer?.community?.name,
    },
  });

  const [commitMutation, isMutationInFlight] =
    useMutation<communityNameMutation>(graphql`
      mutation communityNameMutation($input: CommunityUpdateInput!) {
        communityUpdate(communityUpdateInput: $input) {
          id
          name
        }
      }
    `);

  const onSubmit = (data: NameFormData) => {
    if (!community.viewer?.community?.id) {
      throw new Error("Community ID is required");
    }

    commitMutation({
      variables: {
        input: {
          id: community.viewer.community.id,
          name: data.name,
        },
      },
      onError: (error) => {
        setNetworkError(error.message.split(":")[1].trim());
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
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
              maxLength: {
                value: 50,
                message: "Name cannot exceed 50 characters",
              },
            }}
            name="name"
            render={({ field: { onChange, value, onBlur } }) => (
              <PrimaryTextInputControl
                ref={nameRef}
                placeholder="Community Name"
                value={value}
                onChangeText={onChange}
                returnKeyType="done"
                onBlur={onBlur}
                error={!!errors.name || !!networkError}
                errorMessage={errors.name?.message ?? networkError}
              />
            )}
          />
        </View>
        <OText className="text-gray-500 dark:text-gray-400">
          Choose a name that represents your community.
          {"\n\n"}
          This name will be visible to all users and helps them understand what
          your community is about.
        </OText>
      </View>
    </Ozone>
  );
}
