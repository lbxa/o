import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import classNames from "classnames";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import { graphql } from "react-relay";

import { useZustStore } from "@/state";
import { OTouchable } from "@/universe/atoms";

import { useSharedBottomSheetProps } from "../../shared";
import { useChallengeActivityResultCreate } from "./mutations";

interface RepetitionLoggerProps {
  modalRef: React.RefObject<BottomSheetModal>;
}

const _ = graphql`
  fragment RepetitionLogger_challenge_assignable on Challenge @assignable {
    __typename
  }
`;

export const RepetitionLogger = ({ modalRef }: RepetitionLoggerProps) => {
  const [count, setCount] = useState(0);
  const sharedBottomSheetProps = useSharedBottomSheetProps();
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
      updater: (proxyStore, data) => {
        if (!data?.challengeActivityResultCreate) {
          throw new Error("Failed to log result");
        }

        // TODO: optimistic updates for new results.
        // TODO: rank relative to cached results
        // TODO: bubble out common logic to all 3x loggers

        // const { updatableData } =
        //   proxyStore.readUpdatableQuery<RepetitionLoggerUpdatableQuery>(
        //     graphql`
        //       query RepetitionLoggerUpdatableQuery($challengeId: ID!)
        //       @updatable {
        //         viewer {
        //           challenge(challengeId: $challengeId) {
        //             ...RepetitionLogger_challenge_assignable
        //           }
        //         }
        //       }
        //     `,
        //     {
        //       challengeId: selectedChallenge.id,
        //     }
        //   );

        // if (updatableData.viewer?.challenge) {
        //   updatableData.viewer.challenge =
        //     data.challengeActivityResultCreate.challengeActivityResultEdge.node;
        // }
      },
    });

    setCount(0);
    setRecordedChallenge(null);
    setRecordedChallengeField("attempts", attempts);
    modalRef.current?.dismiss();
  }, [
    selectedChallenge?.id,
    selectedChallenge?.activity.id,
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
      {...sharedBottomSheetProps}
      enablePanDownToClose
      enableDynamicSizing
      maxDynamicContentSize={700}
      keyboardBlurBehavior="restore"
      keyboardBehavior="interactive"
    >
      <BottomSheetScrollView>
        <View className="flex h-full flex-col gap-md px-md pb-10">
          <OTouchable onPress={() => setIsEditing(true)}>
            {isEditing ? (
              <BottomSheetTextInput
                className="w-full text-center text-[5.5rem] font-bold dark:text-ivory"
                style={{ fontVariant: ["tabular-nums"] }}
                value={count.toString()}
                onChangeText={(text) => {
                  const num = Number(text);
                  if (!isNaN(num)) {
                    setCount(num);
                  }
                }}
                keyboardType="number-pad"
                returnKeyType="done"
                autoFocus
                selectTextOnFocus
                onBlur={() => setIsEditing(false)}
              />
            ) : (
              <Text
                className="w-full text-center text-[5.5rem] font-bold dark:text-ivory"
                style={{ fontVariant: ["tabular-nums"] }}
              >
                {count}
              </Text>
            )}
          </OTouchable>
          <View className="flex flex-col gap-xl">
            <View className="flex flex-row justify-around gap-md">
              <View className="flex flex-col justify-between">
                <OTouchable
                  onPress={handleReset}
                  className="flex size-[100px] rounded-full bg-gray-200 dark:bg-gray-200/30"
                >
                  <Text className="m-auto text-xl font-bold text-gray-600 dark:text-gray-300">
                    Reset
                  </Text>
                </OTouchable>
                <OTouchable
                  onPress={handleRecord}
                  className={classNames(
                    "flex size-[100px] rounded-full bg-indigo-200 dark:bg-indigo-200/30",
                    count === 0 && "opacity-50"
                  )}
                  disabled={count === 0}
                >
                  <Text className="m-auto text-xl font-bold text-indigo-600 dark:text-indigo-300">
                    Done
                  </Text>
                </OTouchable>
              </View>
              <OTouchable
                onPress={() => setCount((prev) => prev + 1)}
                className={classNames(
                  "mt-auto flex size-[250px] rounded-full bg-green-200 dark:bg-green-200/30"
                )}
              >
                <Text
                  className={classNames(
                    "m-auto text-3xl font-bold text-green-600 dark:text-green-300"
                  )}
                >
                  Count+
                </Text>
              </OTouchable>
            </View>
          </View>
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};
