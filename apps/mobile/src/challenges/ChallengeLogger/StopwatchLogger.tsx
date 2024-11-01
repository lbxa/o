import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";

import { useZustStore } from "@/state";
import { Touchable } from "@/universe/atoms";

import { BottomSheetBackdrop } from "../BottomSheetBackdrop";
import { useStopwatch } from "./hooks";
import { formatTime } from "./utils";

type TimerButtonVariant = "start" | "stop" | "record";

interface TimerButtonProps {
  onStart: () => void;
  onStop: () => void;
  onRecord: () => void;
  reset?: boolean;
}

const TimerButton = ({ onStart, onStop, onRecord }: TimerButtonProps) => {
  const [variant, setVariant] = useState<TimerButtonVariant>("start");
  const handlerLookup: Record<TimerButtonVariant, () => void> = {
    start: onStart,
    stop: onStop,
    record: onRecord,
  };

  const labelLookup: Record<TimerButtonVariant, string> = {
    start: "Start",
    stop: "Stop",
    record: "Record",
  };

  const stateLookup: Record<TimerButtonVariant, TimerButtonVariant> = {
    start: "stop",
    stop: "record",
    record: "start",
  };

  const selectVariantText = (variant: TimerButtonVariant) =>
    labelLookup[variant];

  const handlePress = () => {
    setVariant((prev) => stateLookup[prev]);
    handlerLookup[variant]();
  };

  return (
    <Touchable
      onPress={handlePress}
      className={classNames("mt-auto flex size-[250px] rounded-full ", {
        "bg-green-200": variant === "start",
        "bg-red-200": variant === "stop",
        "bg-indigo-200": variant === "record",
      })}
    >
      <Text
        className={classNames("m-auto text-3xl font-bold", {
          "text-green-600": variant === "start",
          "text-red-600": variant === "stop",
          "text-indigo-600": variant === "record",
        })}
      >
        {selectVariantText(variant)}
      </Text>
    </Touchable>
  );
};

export const TimerLogger = () => {
  const { time, start, stop, reset } = useStopwatch();
  const modalRef = useRef<BottomSheetModal>(null);
  const handleModal = useCallback(() => {
    modalRef.current?.present();
  }, []);

  const { recordedChallenge } = useZustStore();

  useEffect(() => {
    if (recordedChallenge) {
      handleModal();
    }
  }, [handleModal, recordedChallenge]);

  const handleRecord = () => {
    reset();
    modalRef.current?.dismiss();
  };

  return (
    <BottomSheetModal
      ref={modalRef}
      backdropComponent={(props) => <BottomSheetBackdrop {...props} />}
      enablePanDownToClose
      enableDynamicSizing
      maxDynamicContentSize={900}
    >
      <BottomSheetScrollView>
        <View className="flex h-full flex-col gap-md bg-white px-md pb-20">
          <Text
            className="w-full text-center text-[5.5rem] font-bold"
            style={{ fontVariant: ["tabular-nums"] }} /* fixed width text */
          >
            {formatTime(time)}
          </Text>
          <View className="flex flex-row justify-around gap-md">
            <Touchable
              onPress={reset}
              className="mt-auto flex size-[100px] rounded-full bg-gray-200"
            >
              <Text className="m-auto text-xl font-bold text-gray-600">
                Reset
              </Text>
            </Touchable>
            <TimerButton
              onStart={start}
              onStop={stop}
              onRecord={handleRecord}
            />
          </View>
          {/* <Button title="Record" className="mt-lg" /> */}
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};
