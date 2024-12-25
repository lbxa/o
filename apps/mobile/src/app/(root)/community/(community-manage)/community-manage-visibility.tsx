import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Switch, View } from "react-native";
import { graphql, useLazyLoadQuery, useMutation } from "react-relay";

import type { communityManageVisibilityMutation } from "@/__generated__/communityManageVisibilityMutation.graphql";
import type { communityManageVisibilityQuery } from "@/__generated__/communityManageVisibilityQuery.graphql";
import { useZustStore } from "@/state";
import { OButton, OText } from "@/universe/atoms";
import { Ozone } from "@/universe/molecules";

interface VisibilityFormData {
  isPublic: boolean;
}

export default function CommunityManagePublic() {
  const router = useRouter();
  const selectedCommunity = useZustStore((state) => state.selectedCommunity);

  if (!selectedCommunity) {
    throw new Error("Community ID is required");
  }

  const community = useLazyLoadQuery<communityManageVisibilityQuery>(
    graphql`
      query communityManageVisibilityQuery($communityId: ID!) {
        viewer {
          community(communityId: $communityId) {
            id
            isPublic @required(action: THROW)
          }
        }
      }
    `,
    { communityId: selectedCommunity.id }
  );

  const [visibility, setVisibility] = useState<boolean>(
    community.viewer?.community?.isPublic ?? false
  );

  const [commitMutation, isMutationInFlight] =
    useMutation<communityManageVisibilityMutation>(graphql`
      mutation communityManageVisibilityMutation(
        $input: CommunityUpdateInput!
      ) {
        communityUpdate(communityUpdateInput: $input) {
          id
          isPublic
        }
      }
    `);

  const { control, handleSubmit } = useForm<VisibilityFormData>({
    defaultValues: {
      isPublic: community.viewer?.community?.isPublic ?? false,
    },
  });

  const onSubmit = (data: VisibilityFormData) => {
    if (!community.viewer?.community?.id) {
      throw new Error("Community ID is required");
    }

    commitMutation({
      variables: {
        input: {
          id: community.viewer.community.id,
          isPublic: data.isPublic,
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
      <View className="gap-md px-md pt-md flex flex-col">
        <View className="flex flex-row items-center justify-between">
          <OText className="text-xl font-bold">
            {visibility === true ? "Public" : "Private"}
          </OText>
          <Controller
            name="isPublic"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Switch
                className="mb-md"
                onValueChange={(e) => {
                  setVisibility(e);
                  onChange(e);
                }}
                value={value}
                disabled={isMutationInFlight}
              />
            )}
          />
        </View>
        <OText className="text-gray-500 dark:text-gray-400">
          Public communities can be found and joined by anyone.
          {"\n\n"}
          Private communities require an invitation to join.
          {"\n\n"}
          You can change this setting at any time.
        </OText>
      </View>
    </Ozone>
  );
}
