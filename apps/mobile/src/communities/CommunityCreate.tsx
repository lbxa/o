import SearchIcon from "@assets/icons/search.svg";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Switch, Text, View } from "react-native";
import { ConnectionHandler, graphql, useMutation } from "react-relay";

import type {
  CommunityCreateInput,
  CommunityCreateMutation,
} from "@/__generated__/CommunityCreateMutation.graphql";
import { useZustStore } from "@/state";
import {
  OButton,
  OTouchable,
  PrimaryTextInputControl,
  Title,
} from "@/universe/atoms";
import { useSvgFill } from "@/utils";

export const CommunityCreate = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const svgFill = useSvgFill();
  const { activeUser } = useZustStore();
  const [commitMutation, isMutationInFlight] =
    useMutation<CommunityCreateMutation>(graphql`
      mutation CommunityCreateMutation(
        $communityCreateInput: CommunityCreateInput!
      ) {
        communityCreate(communityCreateInput: $communityCreateInput) {
          communityEdge {
            cursor
            node {
              ...CommunityCard_community
            }
          }
        }
      }
    `);

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
    if (!activeUser) {
      throw new Error("Active user not found");
    }

    const { name, isPublic } = data;

    commitMutation({
      variables: {
        communityCreateInput: {
          name,
          isPublic,
        },
      },
      updater: (proxyStore, data) => {
        if (!data) return;

        const viewer = proxyStore.getRoot().getLinkedRecord("viewer");
        if (!viewer) {
          throw new Error("Viewer not found");
        }

        const connectionRecord = ConnectionHandler.getConnection(
          viewer,
          "CommunityList_viewer_communities"
        );

        if (!connectionRecord) {
          throw new Error("Connection record not found");
        }

        const payload = proxyStore.getRootField("communityCreate");
        const communityEdge = payload.getLinkedRecord("communityEdge");

        const newEdge = ConnectionHandler.createEdge(
          proxyStore,
          connectionRecord,
          communityEdge,
          "CommunityEdge"
        );

        ConnectionHandler.insertEdgeBefore(connectionRecord, newEdge);
      },
      onError: (error) => {
        setError(error.message.split("\n")[1]);
      },
      onCompleted() {
        setError(null);
        router.replace("/(root)/community");
      },
    });
  };

  return (
    <View className="gap-md flex h-full flex-col">
      <View>
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
              error={!!error || !!errors.name}
              errorMessage={error ?? errors.name?.message}
            />
          )}
        />
      </View>

      <View>
        <Title>Public</Title>
        <Controller
          name="isPublic"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Switch className="mb-md" onValueChange={onChange} value={value} />
          )}
        />
      </View>

      {/* <Title>Data Controls</Title>
      <Text>Who can invite members?</Text>
      <View className="pl-md">
        <Text>Admins only</Text>
        <Text>Everyone</Text>
      </View>
      <Text>Who can create new challenges?</Text>
      <View className="pl-md">
        <Text>Admins only</Text>
        <Text>Everyone</Text>
      </View> */}

      <View>
        <Title>Invite Members</Title>
        <OTouchable
          onPress={() => router.push("/(root)/community/invite")}
          className="mb-md bg-ivory px-sm flex w-full flex-row items-center rounded-lg py-3 dark:bg-white/20"
        >
          <SearchIcon width={25} fill={svgFill} />
          <Text className="pl-sm dark:text-ivory text-black">Search</Text>
        </OTouchable>
      </View>

      <OButton
        title="Create"
        disabled={isMutationInFlight}
        loading={isMutationInFlight}
        className="mb-[200px]"
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
