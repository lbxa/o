import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";

import { useZustStore } from "@/state";
import type { TimerButtonVariant } from "@/universe/atoms";
import { OTouchable, TimerButton } from "@/universe/atoms";
import { OBackdrop } from "@/universe/molecules/OBackdrop";

import { useStopwatch } from "./hooks";
import { useChallengeActivityResultCreate } from "./mutations";

interface StopwatchLoggerProps {
  modalRef: React.RefObject<BottomSheetModal>;
}

export const StopwatchLogger = ({ modalRef }: StopwatchLoggerProps) => {
  const { time, start, stop, reset } = useStopwatch();
  const {
    setRecordedChallenge,
    setRecordedChallengeField,
    selectedChallenge,
    activeUser,
  } = useZustStore();
  const [timerButtonVariant, setTimerButtonVariant] =
    useState<TimerButtonVariant>("start");
  const [attempts, setAttempts] = useState(0);

  const [commitChallengeActivityResultCreate] =
    useChallengeActivityResultCreate();

  const handleRecord = useCallback(() => {
    if (!selectedChallenge?.activity.id || !activeUser?.id) {
      throw new Error("Challenge results require userId or activityId");
    }

    commitChallengeActivityResultCreate({
      variables: {
        input: {
          challengeId: selectedChallenge.id,
          activityId: selectedChallenge.activity.id,
          userId: activeUser.id,
          result: time.toInt(),
        },
      },
      onError: (error) => {
        console.error(error);
      },
    });
    reset();
    setRecordedChallenge(null);
    setRecordedChallengeField("attempts", attempts);
    modalRef.current?.dismiss();
  }, [
    selectedChallenge?.activity.id,
    selectedChallenge?.id,
    activeUser?.id,
    commitChallengeActivityResultCreate,
    time,
    reset,
    setRecordedChallenge,
    setRecordedChallengeField,
    attempts,
    modalRef,
  ]);

  const handleReset = useCallback(() => {
    reset();
    setTimerButtonVariant("start");
    setAttempts((prev) => prev + 1);
    setRecordedChallengeField("attempts", attempts);
  }, [reset, setRecordedChallengeField, attempts]);

  return (
    <BottomSheetModal
      ref={modalRef}
      backdropComponent={(props) => <OBackdrop {...props} />}
      enablePanDownToClose
      enableDynamicSizing
      maxDynamicContentSize={900}
    >
      <BottomSheetView>
        <View className="flex h-full flex-col gap-md bg-white px-md pb-5">
          <Text
            className="w-full text-center text-[5.5rem] font-bold"
            style={{ fontVariant: ["tabular-nums"] }} /* fixed width text */
          >
            {time.toString()}
          </Text>
          <View className="flex flex-row justify-around gap-md">
            <OTouchable
              onPress={handleReset}
              className="mt-auto flex size-[100px] rounded-full bg-gray-200"
            >
              <Text className="m-auto text-xl font-bold text-gray-600">
                Reset
              </Text>
            </OTouchable>
            <TimerButton
              variant={timerButtonVariant}
              setVariant={setTimerButtonVariant}
              onStart={start}
              onStop={stop}
              onDone={handleRecord}
            />
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
