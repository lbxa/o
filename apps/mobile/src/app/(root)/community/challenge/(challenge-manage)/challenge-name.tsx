import { Stack, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { TextInput } from "react-native";
import { View } from "react-native";
import { graphql, useLazyLoadQuery, useMutation } from "react-relay";

import type { challengeNameMutation } from "@/__generated__/challengeNameMutation.graphql";
import type { challengeNameQuery } from "@/__generated__/challengeNameQuery.graphql";
import { useZustStore } from "@/state";
import { OButton, OText, PrimaryTextInputControl } from "@/universe/atoms";
import { Ozone } from "@/universe/molecules";

interface NameFormData {
  name: string;
}

export default function ChallengeManageName() {
  const router = useRouter();
  const [networkError, setNetworkError] = useState<string | undefined>(
    undefined
  );
  const nameRef = useRef<TextInput>(null);

  const selectedChallengeId = useZustStore(
    (state) => state.selectedChallenge?.id
  );
  if (!selectedChallengeId) {
    throw new Error("Challenge ID is required");
  }

  const challenge = useLazyLoadQuery<challengeNameQuery>(
    graphql`
      query challengeNameQuery($challengeId: ID!) {
        viewer {
          challenge(challengeId: $challengeId) {
            id
            name @required(action: THROW)
          }
        }
      }
    `,
    { challengeId: selectedChallengeId }
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NameFormData>({
    defaultValues: {
      name: challenge.viewer?.challenge?.name,
    },
  });

  const [commitMutation, isMutationInFlight] =
    useMutation<challengeNameMutation>(graphql`
      mutation challengeNameMutation($input: ChallengeUpdateInput!) {
        challengeUpdate(challengeUpdateInput: $input) {
          id
          name
        }
      }
    `);

  const onSubmit = (data: NameFormData) => {
    if (!challenge.viewer?.challenge?.id) {
      throw new Error("Challenge ID is required");
    }

    commitMutation({
      variables: {
        input: {
          id: challenge.viewer.challenge.id,
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
      <View className="gap-md px-md flex flex-col">
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
          Choose a name that represents your challenge.
          {"\n\n"}
          This name will be visible to all users and helps them understand what
          your challenge is about.
        </OText>
      </View>
    </Ozone>
  );
}
