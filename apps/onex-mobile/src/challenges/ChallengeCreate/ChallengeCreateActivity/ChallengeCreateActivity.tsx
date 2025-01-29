import ChevronRightIcon from "@assets/icons/chevron-right.svg";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { OTouchable, Subtitle, Title } from "@/universe/atoms";

import { useSharedBottomSheetProps } from "../../../shared";
import { useSvgFill } from "../../../utils";
import { ChallengeCreateActivitySelector } from "./ChallengeCreateActivitySelector";
import { ChallengeCreateActivitySummary } from "./ChallengeCreateActivitySummary";

export const ChallengeCreateActivity = () => {
  const modalRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();
  const svgFill = useSvgFill();
  const sharedBottomSheetProps = useSharedBottomSheetProps();

  const handleModal = useCallback(() => {
    modalRef.current?.present();
  }, []);

  return (
    <View>
      <Title>Type</Title>
      <Subtitle>Select the type of challenge you want to create</Subtitle>
      <OTouchable
        onPress={handleModal}
        className="mb-lg bg-ivory px-sm  flex w-full flex-row items-center rounded-lg py-3 dark:bg-white/20"
      >
        <View className="flex flex-1 flex-row items-center">
          <ChallengeCreateActivitySummary />
        </View>
        <ChevronRightIcon width={25} fill={svgFill} />
      </OTouchable>
      <BottomSheetModal
        ref={modalRef}
        {...sharedBottomSheetProps}
        topInset={insets.top}
        enablePanDownToClose
        enableDynamicSizing
        // maxDynamicContentSize={600}
        keyboardBlurBehavior="restore"
        keyboardBehavior="interactive"
      >
        <BottomSheetScrollView>
          <ChallengeCreateActivitySelector modalRef={modalRef} />
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
};
