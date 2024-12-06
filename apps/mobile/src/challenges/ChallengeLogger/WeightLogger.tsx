import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import classNames from "classnames";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";

import { useZustStore } from "@/state";
import { OButton, OTouchable } from "@/universe/atoms";
import { OBackdrop } from "@/universe/molecules/OBackdrop";

import { useChallengeActivityResultCreate } from "./mutations";

type WeightButtonVariants =
  | "black"
  | "yellow"
  | "grey"
  | "green"
  | "blue"
  | "red";

const WeightButtonVariantMatrix: Map<
  WeightButtonVariants,
  {
    color: string;
    label: string;
    value: number;
  }
> = new Map<
  WeightButtonVariants,
  { color: string; label: string; value: number }
>([
  ["black", { color: "black", label: "1.25 kg", value: 1.25 }],
  ["yellow", { color: "yellow", label: "2.5 kg", value: 2.5 }],
  ["grey", { color: "grey", label: "5 kg", value: 5 }],
  ["green", { color: "green", label: "10 kg", value: 10 }],
  ["blue", { color: "blue", label: "20 kg", value: 20 }],
  ["red", { color: "red", label: "25 kg", value: 25 }],
]);

const WeightButton = ({
  variant,
  onPress,
}: {
  variant: WeightButtonVariants;
  onPress?: () => void;
}) => {
  const { label } = WeightButtonVariantMatrix.get(variant) ?? {
    label: "Unknown",
  };
  return (
    <OTouchable
      onPress={onPress}
      className={classNames("flex w-5/12 h-[100px] rounded-3xl flex-grow", {
        "bg-black/30": variant === "black",
        "bg-yellow-300/50": variant === "yellow",
        "bg-gray-300/50": variant === "grey",
        "bg-green-300/50": variant === "green",
        "bg-blue-300/50": variant === "blue",
        "bg-red-300/50": variant === "red",
      })}
    >
      <Text
        className={classNames("m-auto text-2xl font-bold", {
          "text-black": variant === "black",
          "text-yellow-600": variant === "yellow",
          "text-gray-600": variant === "grey",
          "text-green-600": variant === "green",
          "text-blue-600": variant === "blue",
          "text-red-600": variant === "red",
        })}
      >
        {label}
      </Text>
    </OTouchable>
  );
};

interface WeightLoggerProps {
  modalRef: React.RefObject<BottomSheetModal>;
}

export const WeightLogger = ({ modalRef }: WeightLoggerProps) => {
  const [count, setCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const {
    setRecordedChallenge,
    setRecordedChallengeField,
    selectedChallenge,
    activeUser,
  } = useZustStore();
  const [attempts, setAttempts] = useState(0);

  const [commitChallengeActivityResultCreate] =
    useChallengeActivityResultCreate();

  const handleRecord = useCallback(() => {
    if (
      !selectedChallenge?.id ||
      !selectedChallenge.activity.id ||
      !activeUser?.id
    ) {
      throw new Error("Challenge results require userId or activityId");
    }

    commitChallengeActivityResultCreate({
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
    });
    setCount(0);
    setRecordedChallenge(null);
    setRecordedChallengeField("attempts", attempts);
    modalRef.current?.dismiss();
  }, [
    selectedChallenge?.activity.id,
    selectedChallenge?.id,
    activeUser?.id,
    commitChallengeActivityResultCreate,
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
      backdropComponent={(props) => <OBackdrop {...props} />}
      enablePanDownToClose
      enableDynamicSizing
      keyboardBlurBehavior="restore"
      keyboardBehavior="extend"
      maxDynamicContentSize={900}
    >
      <BottomSheetScrollView>
        <View className="flex h-full flex-col gap-md bg-white px-md pb-10">
          <OTouchable onPress={() => setIsEditing(true)}>
            {isEditing ? (
              <BottomSheetTextInput
                className="w-full text-center text-[5.5rem] font-bold"
                style={{ fontVariant: ["tabular-nums"] }}
                value={count.toString()}
                onChangeText={(text) => {
                  const num = Number(text);
                  if (!isNaN(num)) {
                    setCount(num);
                  }
                }}
                keyboardType="decimal-pad"
                returnKeyType="done"
                autoFocus
                selectTextOnFocus
                onBlur={() => setIsEditing(false)}
              />
            ) : (
              <Text
                className="w-full text-center text-[5.5rem] font-bold"
                style={{ fontVariant: ["tabular-nums"] }}
              >
                {count}
                <Text className="text-xl">kg</Text>
              </Text>
            )}
          </OTouchable>
          <View className="flex flex-col gap-lg">
            <View className="flex flex-row flex-wrap justify-center gap-md">
              {Array.from(WeightButtonVariantMatrix.entries()).map(
                ([variant, { value }]) => (
                  <WeightButton
                    key={variant}
                    variant={variant}
                    onPress={() => setCount(count + value)}
                  />
                )
              )}
            </View>
            <View className="h-px bg-gray-200" />
            <View className="flex h-[100px] flex-row justify-between gap-md">
              {/* <OButton
                type="secondary"
                variant="gray"
                title="Manual Entry"
                // onPress={}
              /> */}
              <OButton
                type="secondary"
                className="grow !rounded-3xl"
                size="large"
                variant="gray"
                title="Reset"
                onPress={handleReset}
              />
              <OButton
                className="grow !rounded-3xl"
                size="large"
                type="primary"
                variant="indigo"
                title="Done"
                onPress={handleRecord}
              />
            </View>
          </View>
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};
