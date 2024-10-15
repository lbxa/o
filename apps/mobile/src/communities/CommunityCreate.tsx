import SearchIcon from "@assets/icons/search.svg";
import {
  Button,
  PrimaryTextInputControl,
  Title,
  Touchable,
} from "@universe/atoms";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Switch, Text, View } from "react-native";
import { graphql, useMutation } from "react-relay";

import type {
  CommunityCreateInput,
  CommunityCreateMutation,
} from "../__generated__/CommunityCreateMutation.graphql.ts";

export const COMMUNITY_CREATE_MUTATION = graphql`
  mutation CommunityCreateMutation(
    $communityCreateInput: CommunityCreateInput!
  ) {
    communityCreate(communityCreateInput: $communityCreateInput) {
      name
      isPublic
    }
  }
`;

export const CommunityCreate = () => {
  const router = useRouter();
  const [commitMutation, isMutationInFlight] =
    useMutation<CommunityCreateMutation>(COMMUNITY_CREATE_MUTATION);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CommunityCreateInput>({
    defaultValues: {
      name: "",
      isPublic: false,
    },
  });

  const onSubmit = (data: CommunityCreateInput) => {
    const { name, isPublic } = data;
    commitMutation({
      variables: {
        communityCreateInput: {
          name,
          isPublic,
        },
      },
      onError: (error) => {
        console.error(error.message);
      },
    });
  };

  return (
    <View className="mb-md">
      <Title>Name</Title>
      <Controller
        name="name"
        control={control}
        rules={{ required: { value: true, message: "Required field" } }}
        render={({ field: { onBlur, onChange, value } }) => (
          <PrimaryTextInputControl
            className="mb-md"
            placeholder="Community name"
            inputMode="text"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.name}
            errorMessage={errors.name?.message}
          />
        )}
      />
      <Title>Public</Title>
      <Controller
        name="isPublic"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Switch className="mb-md" onValueChange={onChange} value={value} />
        )}
      />

      <Title>Data Controls</Title>
      <Text>Who can invite members?</Text>
      <View className="pl-md">
        <Text>Admins only</Text>
        <Text>Everyone</Text>
      </View>
      <Text>Who can create new challenges?</Text>
      <View className="pl-md">
        <Text>Admins only</Text>
        <Text>Everyone</Text>
      </View>

      <Title>Invite Members</Title>
      <Touchable
        onPress={() => router.push("/(app)/community/invite")}
        className="mb-md flex w-full flex-row items-center rounded-lg bg-ivory px-sm py-3"
      >
        <SearchIcon width={25} />
        <Text className="pl-sm">Search</Text>
      </Touchable>
      <Button
        title={isMutationInFlight ? "Loading..." : "Create"}
        disabled={isMutationInFlight}
        onPress={async (e) => {
          // Read more about event pooling
          // https://legacy.reactjs.org/docs/legacy-event-pooling.html
          e.persist();
          await handleSubmit(onSubmit)();
        }}
      />
    </View>
  );
};
