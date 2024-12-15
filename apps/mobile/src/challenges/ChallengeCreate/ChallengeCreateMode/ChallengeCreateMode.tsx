import ChevronRightIcon from "@assets/icons/chevron-right.svg";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { View } from "react-native";

import { OTouchable, Subtitle, Title } from "@/universe/atoms";

import { useSharedBottomSheetProps } from "../../../shared";
import { useSvgFill } from "../../../utils";
import { ChallengeCreateModeSelector } from "./ChallengeCreateModeSelector";
import { ChallengeCreateModeSummary } from "./ChallengeCreateModeSummary";

export const ChallengeCreateMode: React.FC = () => {
  const svgFill = useSvgFill();
  const modalRef = useRef<BottomSheetModal>(null);
  const sharedBottomSheetProps = useSharedBottomSheetProps();
  const handleModal = useCallback(() => {
    modalRef.current?.present();
  }, []);

  return (
    <View>
      <Title className="text-xl">Mode</Title>
      <Subtitle>How will users prove they completed your challenge?</Subtitle>
      <OTouchable
        onPress={handleModal}
        className="mb-lg flex w-full flex-row items-center rounded-lg bg-ivory px-sm py-3 dark:bg-white/20"
      >
        <View className="flex flex-1 flex-row items-center">
          <ChallengeCreateModeSummary />
        </View>
        <ChevronRightIcon width={25} fill={svgFill} />
      </OTouchable>
      <BottomSheetModal
        ref={modalRef}
        {...sharedBottomSheetProps}
        enableDynamicSizing
        enablePanDownToClose
      >
        <BottomSheetScrollView>
          <ChallengeCreateModeSelector modalRef={modalRef} />
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
};
