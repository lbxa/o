import CameraIcon from "@assets/icons/camera.svg";
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
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { graphql, useMutation } from "react-relay";

import type {
  ChallengeCreateInput,
  ChallengeCreateMutation,
} from "@/__generated__/ChallengeCreateMutation.graphql";
import { useZustStore } from "@/state";
import {
  OButton,
  OTouchable,
  PrimaryTextInputControl,
  Title,
} from "@/universe/atoms";
import { Ozone } from "@/universe/molecules";

import { ChallengeCreateActivity } from "./ChallengeCreateActivity";
import { ChallengeCreateCadence } from "./ChallengeCreateCadence";
import { ChallengeCreateMode } from "./ChallengeCreateMode";

export const CHALLENGE_CREATE_MUTATION = graphql`
  mutation ChallengeCreateMutation(
    $challengeCreateInput: ChallengeCreateInput!
    $challengeActivityCreateInput: ChallengeActivityCreateInput!
  ) {
    challengeCreate(
      challengeCreateInput: $challengeCreateInput
      challengeActivityCreateInput: $challengeActivityCreateInput
    ) {
      id
      name
      description
    }
  }
`;

export const ChallengeCreate = () => {
  const router = useRouter();
  const { selectedCommunity, challengeForm } = useZustStore();
  const [commitMutation, isMutationInFlight] =
    useMutation<ChallengeCreateMutation>(CHALLENGE_CREATE_MUTATION);

  useEffect(() => {
    console.log("CHALLENGE", challengeForm);
  }, [challengeForm]);

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

    if (
      !challengeForm.activity?.goal ||
      !challengeForm.activity.measurement ||
      !challengeForm.activity.type
    ) {
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
          type: challengeForm.activity.type,
          measurement: challengeForm.activity.measurement,
          goal: challengeForm.activity.goal,
          target: challengeForm.activity.target,
          unit: challengeForm.activity.unit ?? ChallengeActivityUnits.None,
        },
      },
      onCompleted: (data) => {
        console.log("SUCCESS", data.challengeCreate);
        // setFormStatus("COMPLETED");
      },
      onError: (error) => {
        console.error(error.message);
        // setFormStatus("ERROR");
      },
    });
  };

  return (
    <View>
      <Ozone>
        <ScrollView>
          <View className="flex-1">
            <OTouchable className="mb-md flex h-[150px] bg-gray-200">
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
                    value={value}
                    error={!!errors.name}
                    errorMessage={errors.name?.message}
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
                    className="mb-lg"
                    placeholder="Describe your challenge and its goals..."
                    inputMode="text"
                    editable
                    onBlur={onBlur}
                    onChangeText={onChange}
                    multiline
                    blurOnSubmit
                    // numberOfLines={10}
                    value={value}
                    error={!!errors.name}
                    style={{ height: 100 }}
                    errorMessage={errors.name?.message}
                    textAlignVertical="top"
                  />
                )}
              />

              <ChallengeCreateActivity />

              <Title>Duration</Title>
              <View className="mb-lg flex flex-col justify-between">
                <View
                  className={classNames(
                    "flex flex-row items-center justify-between rounded-lg pl-sm mb-md",
                    {
                      "bg-red-200 text-red-800": !!errors.endDate,
                    }
                  )}
                >
                  <Text className="text-xl ">Start</Text>
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
                <View
                  className={classNames(
                    "flex flex-row items-center justify-between rounded-lg pl-sm mb-sm",
                    {
                      "bg-red-200 text-red-800": !!errors.endDate,
                    }
                  )}
                >
                  <Text className="text-xl">End</Text>
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
                {!!errors.endDate && (
                  <Text className="pl-sm text-red-900">
                    End date must be after start date
                  </Text>
                )}
              </View>

              <ChallengeCreateCadence />
              <ChallengeCreateMode />

              <Title>Invite Members</Title>
              <OTouchable
                onPress={() => router.push("/(app)/community/invite")}
                className="mb-lg flex w-full flex-row items-center rounded-lg bg-ivory px-sm py-3"
              >
                <SearchIcon width={25} />
                <Text className="pl-sm">Search</Text>
              </OTouchable>
              <OButton
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
          </View>
        </ScrollView>
      </Ozone>
    </View>
  );
};
