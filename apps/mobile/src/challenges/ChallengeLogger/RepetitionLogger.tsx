import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import classNames from "classnames";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import { useMutation } from "react-relay";

import { useZustStore } from "@/state";
import { OButton, OTouchable } from "@/universe/atoms";

import type { ChallengeActivityResultCreateMutation } from "../../__generated__/ChallengeActivityResultCreateMutation.graphql";
import { BottomSheetBackdrop } from "../BottomSheetBackdrop";
import { CHALLENGE_ACTIVITY_RESULT_CREATE_MUTATION } from "./mutations";

interface RepetitionLoggerProps {
  modalRef: React.RefObject<BottomSheetModal>;
}

export const RepetitionLogger = ({ modalRef }: RepetitionLoggerProps) => {
  const [count, setCount] = useState(0);
  const {
    setRecordedChallenge,
    setRecordedChallengeField,
    selectedChallenge,
    activeUser,
  } = useZustStore();

  const [attempts, setAttempts] = useState(0);

  const [commitMutation] = useMutation<ChallengeActivityResultCreateMutation>(
    CHALLENGE_ACTIVITY_RESULT_CREATE_MUTATION
  );

  const handleRecord = useCallback(() => {
    if (
      !selectedChallenge?.id ||
      !selectedChallenge.activity.id ||
      !activeUser?.id
    ) {
      throw new Error("Challenge results require userId or activityId");
    }

    commitMutation({
      variables: {
        input: {
          challengeId: selectedChallenge.id,
          activityId: selectedChallenge.activity.id,
          userId: activeUser.id,
          result: count,
        },
      },
      onError: (error) => {
        console.error(error);
      },
      onCompleted: () => {
        console.log("result logged!");
      },
    });

    setCount(0);
    setRecordedChallenge(null);
    setRecordedChallengeField("attempts", attempts);
    modalRef.current?.dismiss();
  }, [
    selectedChallenge?.activity.id,
    selectedChallenge?.id,
    activeUser?.id,
    commitMutation,
    count,
    setRecordedChallenge,
    setRecordedChallengeField,
    attempts,
    modalRef,
  ]);

  const handleReset = useCallback(() => {
    setCount(0);
    setAttempts((prev) => prev + 1);
    setRecordedChallengeField("attempts", attempts);
  }, [setRecordedChallengeField, attempts]);

  return (
    <BottomSheetModal
      ref={modalRef}
      backdropComponent={(props) => <BottomSheetBackdrop {...props} />}
      enablePanDownToClose
      enableDynamicSizing
      maxDynamicContentSize={900}
    >
      <BottomSheetScrollView>
        <View className="flex h-full flex-col gap-md bg-white px-md pb-10">
          <Text
            className="w-full text-center text-[5.5rem] font-bold"
            style={{ fontVariant: ["tabular-nums"] }} /* fixed width text */
          >
            {count}
          </Text>
          <View className="flex flex-col gap-xl">
            <View className="flex flex-row justify-around gap-md">
              <View className="flex flex-col justify-between">
                <OTouchable
                  onPress={handleReset}
                  className="flex size-[100px] rounded-full bg-gray-200"
                >
                  <Text className="m-auto text-xl font-bold text-gray-600">
                    Manual
                  </Text>
                </OTouchable>
                <OTouchable
                  onPress={handleReset}
                  className="flex size-[100px] rounded-full bg-gray-200"
                >
                  <Text className="m-auto text-xl font-bold text-gray-600">
                    Reset
                  </Text>
                </OTouchable>
              </View>
              <OTouchable
                onPress={() => setCount((prev) => prev + 1)}
                className={classNames(
                  "mt-auto flex size-[250px] rounded-full bg-green-200"
                )}
              >
                <Text
                  className={classNames(
                    "m-auto text-3xl font-bold text-green-600"
                  )}
                >
                  Count+
                </Text>
              </OTouchable>
            </View>
            <OButton
              type="primary"
              variant="indigo"
              title="Done"
              onPress={handleRecord}
            />
          </View>
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};
