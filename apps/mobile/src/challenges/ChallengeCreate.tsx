import CameraIcon from "@assets/icons/camera.svg";
import ChevronRightIcon from "@assets/icons/chevron-right.svg";
import CrissCrossIcon from "@assets/icons/criss-cross.svg";
import SearchIcon from "@assets/icons/search.svg";
import StopwatchIcon from "@assets/icons/stopwatch.svg";
import VerifiedBadgeIcon from "@assets/icons/verified-badge.svg";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { graphql, useMutation } from "react-relay";

import {
  Button,
  PrimaryTextInputControl,
  Title,
  Touchable,
} from "@/universe/atoms";
import { Ozone } from "@/universe/molecules";

import type {
  ChallengeCreateInput,
  ChallengeCreateMutation,
} from "../__generated__/ChallengeCreateMutation.graphql";
import { useAppSelector } from "../state";
import { selectActiveCommunity } from "../state/community.slice";
import { BottomSheetBackdrop } from "./BottomSheetBackdrop";
import { ChallengeCadenceSelector } from "./ChallengeCadenceSelector";
import { ChallengeDataControls } from "./ChallengeDataControls";
import { ChallengeTypeSelector } from "./ChallengeTypeSelector";

export const CHALLENGE_CREATE_MUTATION = graphql`
  mutation ChallengeCreateMutation(
    $challengeCreateInput: ChallengeCreateInput!
  ) {
    challengeCreate(challengeCreateInput: $challengeCreateInput) {
      name
      description
    }
  }
`;

export const ChallengeCreate = () => {
  const router = useRouter();
  const [formStatus, setFormStatus] = useState<
    "COMPLETED" | "ERROR" | "PENDING"
  >("PENDING");
  const activeCommunity = useAppSelector(selectActiveCommunity);
  const [commitMutation, isMutationInFlight] =
    useMutation<ChallengeCreateMutation>(CHALLENGE_CREATE_MUTATION);

  const challengeBuilderModalRef = useRef<BottomSheetModal>(null);
  const candenceSelectorModalRef = useRef<BottomSheetModal>(null);
  const dataControlsModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentChallengeBuilderModalPress = useCallback(() => {
    challengeBuilderModalRef.current?.present();
  }, []);

  const handlePresentCandenceSelectorModalPress = useCallback(() => {
    candenceSelectorModalRef.current?.present();
  }, []);

  const handlePresentDataControlsModalPress = useCallback(() => {
    dataControlsModalRef.current?.present();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChallengeCreateInput>({
    defaultValues: {
      name: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const onSubmit = (data: ChallengeCreateInput) => {
    const { name, description, startDate, endDate } = data;
    commitMutation({
      variables: {
        challengeCreateInput: {
          name,
          description,
          communityId: activeCommunity?.id,
          startDate,
          endDate,
        },
      },
      onCompleted: (data) => {
        console.log("SUCCESS", data.challengeCreate);
        setFormStatus("COMPLETED");
      },
      onError: (error) => {
        console.error(error.message);
        setFormStatus("ERROR");
      },
    });
  };

  return (
    <View>
      <BottomSheetModal
        ref={challengeBuilderModalRef}
        index={0}
        snapPoints={["70%"]}
        backdropComponent={(props) => <BottomSheetBackdrop {...props} />}
        enablePanDownToClose
      >
        <BottomSheetView>
          <ChallengeTypeSelector modalRef={challengeBuilderModalRef} />
        </BottomSheetView>
      </BottomSheetModal>
      <Ozone>
        <ScrollView>
          <View className="flex-1">
            <Touchable className="mb-md flex h-[150px] bg-gray-200">
              <View className="m-auto">
                <CameraIcon width={45} height={45} fill={"grey"} />
              </View>
            </Touchable>
            <View className="mb-md px-md">
              <Title>Name</Title>
              <Controller
                name="name"
                control={control}
                rules={{ required: { value: true, message: "Required field" } }}
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
                rules={{ required: { value: true, message: "Required field" } }}
                render={({ field: { onBlur, onChange, value } }) => (
                  <PrimaryTextInputControl
                    className="mb-lg"
                    placeholder="Describe your challenge and its goals..."
                    inputMode="text"
                    editable
                    onBlur={onBlur}
                    onChangeText={onChange}
                    multiline
                    // numberOfLines={10}
                    value={value}
                    error={!!errors.name}
                    style={{ height: 100 }}
                    errorMessage={errors.name?.message}
                    textAlignVertical="top"
                  />
                )}
              />
              <Title>Type</Title>
              <Touchable
                onPress={handlePresentChallengeBuilderModalPress}
                className="mb-lg flex w-full flex-row items-center rounded-lg bg-ivory px-sm py-3"
              >
                <View className="flex flex-1 flex-row items-center">
                  <CrissCrossIcon width={25} />
                  <Text className="pl-sm">Choose from a blend of options</Text>
                </View>
                <ChevronRightIcon width={25} />
              </Touchable>

              <Title>Duration</Title>
              <View className="mb-lg flex flex-col justify-between gap-md">
                <View className="flex flex-row items-center justify-between gap-md">
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
                        onChange={onChange}
                      />
                    )}
                  />
                </View>
                <View className="flex flex-row items-center justify-between ">
                  <Text className="text-xl ">End</Text>
                  <Controller
                    name="endDate"
                    control={control}
                    rules={{
                      required: { value: true, message: "Required field" },
                    }}
                    render={({ field: { onChange, value } }) => (
                      <RNDateTimePicker
                        mode="datetime"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </View>
              </View>

              <Title>Cadence</Title>
              <Touchable
                onPress={handlePresentCandenceSelectorModalPress}
                className="mb-lg flex w-full flex-row items-center rounded-lg bg-ivory px-sm py-3"
              >
                <View className="flex flex-1 flex-row items-center">
                  <StopwatchIcon width={25} />
                  <Text className="pl-sm">
                    How often will you post your progress?
                  </Text>
                </View>
                <ChevronRightIcon width={25} />
              </Touchable>

              <BottomSheetModal
                ref={candenceSelectorModalRef}
                index={0}
                snapPoints={["40%"]}
                backdropComponent={(props) => (
                  <BottomSheetBackdrop {...props} />
                )}
                enablePanDownToClose
              >
                <BottomSheetView>
                  <ChallengeCadenceSelector
                    modalRef={candenceSelectorModalRef}
                  />
                </BottomSheetView>
              </BottomSheetModal>

              <Title>Data Controls</Title>

              <Touchable
                onPress={handlePresentDataControlsModalPress}
                className="mb-lg flex w-full flex-row items-center rounded-lg bg-ivory px-sm py-3"
              >
                <View className="flex flex-1 flex-row items-center">
                  <VerifiedBadgeIcon width={25} fill="black" />
                  <Text className="pl-sm">What method of proof is needed?</Text>
                </View>
                <ChevronRightIcon width={25} />
              </Touchable>

              <BottomSheetModal
                ref={dataControlsModalRef}
                index={0}
                snapPoints={["60%"]}
                backdropComponent={(props) => (
                  <BottomSheetBackdrop {...props} />
                )}
                enablePanDownToClose
              >
                <BottomSheetView>
                  <ChallengeDataControls modalRef={dataControlsModalRef} />
                </BottomSheetView>
              </BottomSheetModal>

              <Title>Invite Members</Title>
              <Touchable
                onPress={() => router.push("/(app)/community/invite")}
                className="mb-lg flex w-full flex-row items-center rounded-lg bg-ivory px-sm py-3"
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
          </View>
        </ScrollView>
      </Ozone>
    </View>
  );
};
