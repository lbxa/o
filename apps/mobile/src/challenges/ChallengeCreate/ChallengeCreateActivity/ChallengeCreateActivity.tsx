import ChevronRightIcon from "@assets/icons/chevron-right.svg";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { View } from "react-native";

import { OTouchable, Subtitle, Title } from "@/universe/atoms";

import { BottomSheetBackdrop } from "../../BottomSheetBackdrop";
import { ChallengeCreateActivitySelector } from "./ChallengeCreateActivitySelector";
import { ChallengeCreateActivitySummary } from "./ChallengeCreateActivitySummary";

export const ChallengeCreateActivity = () => {
  const modalRef = useRef<BottomSheetModal>(null);

  const handleModal = useCallback(() => {
    modalRef.current?.present();
  }, []);

  return (
    <View>
      <Title>Type</Title>
      <Subtitle>Select the type of challenge you want to create</Subtitle>
      <OTouchable
        onPress={handleModal}
        className="mb-lg flex w-full flex-row items-center rounded-lg bg-ivory px-sm py-3"
      >
        <View className="flex flex-1 flex-row items-center">
          <ChallengeCreateActivitySummary />
        </View>
        <ChevronRightIcon width={25} />
      </OTouchable>

      <BottomSheetModal
        ref={modalRef}
        backdropComponent={(props) => <BottomSheetBackdrop {...props} />}
        enableDynamicSizing
        maxDynamicContentSize={700}
        enablePanDownToClose
      >
        <BottomSheetScrollView>
          <ChallengeCreateActivitySelector modalRef={modalRef} />
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
};
