import CameraIcon from "@assets/icons/camera.svg";
import CrissCrossIcon from "@assets/icons/criss-cross.svg";
import SearchIcon from "@assets/icons/search.svg";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {
  Button,
  PrimaryTextInputControl,
  Title,
  Touchable,
} from "@universe/atoms";
import { Ozone } from "@universe/molecules";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { graphql, useMutation } from "react-relay";

import type {
  ChallengeCreateInput,
  ChallengeCreateMutation,
} from "../__generated__/ChallengeCreateMutation.graphql.ts";
import { useAppSelector } from "../state";
import { selectActiveCommunity } from "../state/community.slice";
import CustomBackdrop from "./BottomSheetBackdrop";
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
  const activeCommunity = useAppSelector(selectActiveCommunity);
  const [commitMutation, isMutationInFlight] =
    useMutation<ChallengeCreateMutation>(CHALLENGE_CREATE_MUTATION);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["30%", "50%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
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
      endDate: "",
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
      onError: (error) => {
        console.error(error.message);
      },
    });
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={(props) => <CustomBackdrop {...props} />}
      >
        <BottomSheetView>
          <ChallengeTypeSelector />
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
                onPress={handlePresentModalPress}
                className="mb-lg flex w-full flex-row items-center rounded-lg bg-ivory px-sm py-3"
              >
                <CrissCrossIcon width={25} />
                <Text className="pl-sm">Choose from a blend of options</Text>
              </Touchable>

              <Title>Duration</Title>
              <View className="mb-lg flex flex-col justify-between gap-md">
                <View className="flex flex-row items-center justify-between gap-md">
                  <Text className="text-xl ">Start</Text>
                  <RNDateTimePicker mode="datetime" value={new Date()} />
                </View>
                <View className="flex flex-row items-center justify-between ">
                  <Text className="text-xl ">End</Text>
                  <RNDateTimePicker mode="datetime" value={new Date()} />
                </View>
              </View>
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
    </BottomSheetModalProvider>
  );
};
