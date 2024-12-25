import CameraIcon from "@assets/icons/camera.svg";
import ChevronDownIcon from "@assets/icons/chevron-down.svg";
import ChevronUpIcon from "@assets/icons/chevron-up.svg";
import SearchIcon from "@assets/icons/search.svg";
import {
  ChallengeActivityUnits,
  ChallengeCadence,
  ChallengeMode,
} from "@o/api-gql";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import classNames from "classnames";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import type { TextInput } from "react-native";
import { ScrollView, Text, View } from "react-native";
import { ConnectionHandler, graphql, useMutation } from "react-relay";

import type {
  ChallengeCreateInput,
  ChallengeCreateMutation,
} from "@/__generated__/ChallengeCreateMutation.graphql";
import { useZustStore } from "@/state";
import {
  OButton,
  OTouchable,
  PrimaryTextInputControl,
  Subtitle,
  Title,
} from "@/universe/atoms";
import { Ozone } from "@/universe/molecules";
import { useViewerId } from "@/users/hooks";

import { useSvgFill } from "../../utils";
import { ChallengeCreateActivity } from "./ChallengeCreateActivity";
import { ChallengeCreateCadence } from "./ChallengeCreateCadence";
import { ChallengeCreateMode } from "./ChallengeCreateMode";

export const ChallengeCreate = () => {
  const router = useRouter();
  const viewerId = useViewerId();
  const svgFill = useSvgFill();
  const {
    selectedCommunity,
    challengeForm,
    setChallengeFormField,
    clearChallengeForm,
  } = useZustStore();
  const [commitMutation, isMutationInFlight] =
    useMutation<ChallengeCreateMutation>(graphql`
      mutation ChallengeCreateMutation(
        $challengeCreateInput: ChallengeCreateInput!
        $challengeActivityCreateInput: ChallengeActivityCreateInput!
        $connections: [ID!]!
      ) {
        challengeCreate(
          challengeCreateInput: $challengeCreateInput
          challengeActivityCreateInput: $challengeActivityCreateInput
        ) {
          challengeEdge @prependEdge(connections: $connections) {
            cursor
            node {
              ...ChallengeCard_challenge
            }
          }
        }
      }
    `);

  const scrollViewRef = useRef<ScrollView | null>(null);
  const descriptionRef = useRef<TextInput | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ChallengeCreateInput>({
    defaultValues: {
      name: "",
      description: "",
      cadence: ChallengeCadence.None,
      mode: ChallengeMode.BlindTrust,
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const startDate = watch("startDate");

  const onSubmit = (data: ChallengeCreateInput) => {
    if (!selectedCommunity) {
      // don't submit if no community is selected
      throw new Error("No community selected");
    }

    if (!challengeForm.goal || !challengeForm.type) {
      // TODO throw a toast!
      throw new Error("Missing challenge activity data");
    }

    const { name, description, startDate, endDate } = data;

    commitMutation({
      variables: {
        challengeCreateInput: {
          name,
          description,
          communityId: selectedCommunity.id,
          cadence: challengeForm.cadence ?? ChallengeCadence.None,
          mode: challengeForm.mode ?? ChallengeMode.BlindTrust,
          startDate,
          endDate,
        },
        challengeActivityCreateInput: {
          type: challengeForm.type,
          goal: challengeForm.goal,
          target: challengeForm.target,
          unit: challengeForm.unit ?? ChallengeActivityUnits.None,
        },
        connections: [
          ConnectionHandler.getConnectionID(
            viewerId,
            "ChallengeList_viewer_challenges",
            { communityId: selectedCommunity.id }
          ),
        ],
      },
      onCompleted: () => {
        clearChallengeForm();
        router.replace(`/(root)/community/${selectedCommunity.id}`);
      },
      onError: (error) => {
        console.error(error.message);
      },
    });
  };

  return (
    <Ozone>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }}
      >
        <View className="flex-1">
          <OTouchable className="mb-md flex h-[150px] bg-gray-200 dark:bg-white/20">
            <View className="m-auto">
              <CameraIcon width={45} height={45} fill={"grey"} />
            </View>
          </OTouchable>
          <View className="mb-md px-md">
            <Title>Name</Title>
            <Controller
              name="name"
              control={control}
              rules={{ required: { value: true, message: "Required" } }}
              render={({ field: { onBlur, onChange, value } }) => (
                <PrimaryTextInputControl
                  className="mb-lg"
                  placeholder="What's your challenge called?"
                  inputMode="text"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  returnKeyType="next"
                  value={value}
                  error={!!errors.name}
                  errorMessage={errors.name?.message}
                  onSubmitEditing={() => {
                    descriptionRef.current?.focus();
                  }}
                />
              )}
            />
            <Title>Description</Title>
            <Controller
              name="description"
              control={control}
              rules={{ required: { value: true, message: "Required" } }}
              render={({ field: { onBlur, onChange, value } }) => (
                <PrimaryTextInputControl
                  ref={descriptionRef}
                  className="mb-lg"
                  placeholder="Describe your challenge and its goals..."
                  inputMode="text"
                  editable
                  onBlur={onBlur}
                  onChangeText={onChange}
                  multiline
                  blurOnSubmit
                  returnKeyType="done"
                  // numberOfLines={10}
                  value={value}
                  error={!!errors.description}
                  style={{ height: 100 }}
                  errorMessage={errors.description?.message}
                  textAlignVertical="top"
                />
              )}
            />

            <ChallengeCreateActivity />

            <Title>Date</Title>
            <Subtitle>When should the challenge officially begin?</Subtitle>
            <View className="mb-lg">
              <View
                className={classNames(
                  "flex flex-row items-center ml-auto rounded-lg mb-md",
                  {
                    "bg-red-200 text-red-800": !!errors.endDate,
                  }
                )}
              >
                <Controller
                  name="startDate"
                  control={control}
                  rules={{
                    required: { value: true, message: "Required field" },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <RNDateTimePicker
                      mode="datetime"
                      value={value}
                      onChange={(_, selectedDate) => {
                        onChange(selectedDate);
                      }}
                    />
                  )}
                />
              </View>
            </View>

            <Title>Invite Members</Title>
            <Subtitle>A challenge is nothing without its people!</Subtitle>
            <OTouchable
              onPress={() => router.push("/(root)/community/community-invite")}
              className="mb-lg flex w-full flex-row items-center gap-sm rounded-lg bg-ivory px-sm py-3 dark:bg-white/20"
            >
              <SearchIcon width={22} fill={svgFill} />
              <Text className="dark:text-ivory">Search</Text>
            </OTouchable>

            {challengeForm.advancedMode ? (
              <View className="flex flex-col gap-sm">
                <View className="flex flex-row items-center justify-between">
                  <View>
                    <OTouchable
                      onPress={() =>
                        setChallengeFormField("advancedMode", false)
                      }
                      className="flex flex-row items-center gap-sm"
                    >
                      <Title>Less Settings</Title>
                      <ChevronUpIcon width={22} height={22} fill={svgFill} />
                    </OTouchable>
                    <Subtitle>
                      Select more settings for advanced customization
                    </Subtitle>
                  </View>
                </View>

                <ChallengeCreateCadence />

                <View
                  className={classNames(
                    "flex flex-col justify-between rounded-lg mb-sm",
                    {
                      "bg-red-200 text-red-800": !!errors.endDate,
                    }
                  )}
                >
                  <Title className="text-xl">End</Title>
                  <Subtitle>When should the challenge officially end?</Subtitle>
                  <View className="ml-auto">
                    <Controller
                      name="endDate"
                      control={control}
                      rules={{
                        required: { value: true, message: "Required field" },
                        validate: (endDate) => {
                          if (dayjs(endDate).isBefore(dayjs(startDate))) {
                            return "End date must be after start date";
                          }
                          return true;
                        },
                      }}
                      render={({ field: { onChange, value } }) => (
                        <RNDateTimePicker
                          mode="datetime"
                          value={value}
                          onChange={(_, selectedDate) => {
                            onChange(selectedDate);
                          }}
                        />
                      )}
                    />
                  </View>
                </View>
                {!!errors.endDate && (
                  <Text className="mb-md pl-sm text-red-900">
                    End date must be after start date
                  </Text>
                )}

                <ChallengeCreateMode />
              </View>
            ) : (
              <View className="mb-lg">
                <OTouchable
                  onPress={() => setChallengeFormField("advancedMode", true)}
                  className="flex flex-row items-center gap-sm"
                >
                  <Title>More Settings</Title>
                  <ChevronDownIcon width={22} height={22} fill={svgFill} />
                </OTouchable>
                <Subtitle>
                  Select more settings for advanced customization
                </Subtitle>
              </View>
            )}

            <OButton
              title="Create"
              loading={isMutationInFlight}
              disabled={isMutationInFlight}
              onPress={async (e) => {
                // Read more about event pooling
                // https://legacy.reactjs.org/docs/legacy-event-pooling.html
                e.persist();
                await handleSubmit(onSubmit)();
              }}
            />
          </View>
        </View>
      </ScrollView>
    </Ozone>
  );
};
