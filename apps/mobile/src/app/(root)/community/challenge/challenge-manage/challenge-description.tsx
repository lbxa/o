import { Stack, useRouter } from "expo-router";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import type { TextInput } from "react-native";
import { View } from "react-native";
import { graphql, useLazyLoadQuery, useMutation } from "react-relay";

import type { challengeDescriptionMutation } from "@/__generated__/challengeDescriptionMutation.graphql";
import type { challengeDescriptionQuery } from "@/__generated__/challengeDescriptionQuery.graphql";
import { useZustStore } from "@/state";
import { OButton, OText, PrimaryTextInputControl } from "@/universe/atoms";
import { Ozone } from "@/universe/molecules";

interface DescriptionFormData {
  description: string;
}

export default function ChallengeDescription() {
  const router = useRouter();
  const bioRef = useRef<TextInput>(null);

  const selectedChallengeId = useZustStore(
    (state) => state.selectedChallenge?.id
  );

  if (!selectedChallengeId) {
    throw new Error("Challenge ID is required");
  }

  const challenge = useLazyLoadQuery<challengeDescriptionQuery>(
    graphql`
      query challengeDescriptionQuery($challengeId: ID!) {
        viewer {
          challenge(challengeId: $challengeId) {
            id
            description
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
  } = useForm<DescriptionFormData>({
    defaultValues: {
      description: challenge.viewer?.challenge?.description ?? "",
    },
  });

  const [commitMutation, isMutationInFlight] =
    useMutation<challengeDescriptionMutation>(graphql`
      mutation challengeDescriptionMutation($input: ChallengeUpdateInput!) {
        challengeUpdate(challengeUpdateInput: $input) {
          id
          description
        }
      }
    `);

  const onSubmit = (data: DescriptionFormData) => {
    if (!challenge.viewer?.challenge?.id) {
      throw new Error("Challenge ID is required");
    }

    commitMutation({
      variables: {
        input: {
          id: challenge.viewer.challenge.id,
          description: data.description,
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
      <View className="gap-md px-md flex flex-col">
        <View className="pt-md">
          <Controller
            control={control}
            rules={{
              maxLength: {
                value: 160,
                message: "Bio cannot exceed 160 characters",
              },
            }}
            name="description"
            render={({ field: { onChange, value, onBlur } }) => (
              <PrimaryTextInputControl
                ref={bioRef}
                placeholder="Write a short description about the challenge"
                value={value}
                onChangeText={onChange}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                onBlur={onBlur}
                error={!!errors.description}
                errorMessage={errors.description?.message}
                style={{ height: 100 }}
                returnKeyType="done"
              />
            )}
          />
        </View>
        <OText className="text-gray-500 dark:text-gray-400">
          Tell others about the challenge. What are the goals?
          {"\n\n"}
          Your description will be visible on your profile to all users.
        </OText>
      </View>
    </Ozone>
  );
}
