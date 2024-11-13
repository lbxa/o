import ChevronRightIcon from "@assets/icons/chevron-right.svg";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { View } from "react-native";

import { OTouchable, Title } from "@/universe/atoms";

import { BottomSheetBackdrop } from "../../BottomSheetBackdrop";
import { ChallengeCreateCadenceSelector } from "./ChallengeCreateCadenceSelector";
import { ChallengeCreateCadenceSummary } from "./ChallengeCreateCadenceSummary";

export const ChallengeCreateCadence = () => {
  const modalRef = useRef<BottomSheetModal>(null);
  const handleModal = useCallback(() => {
    modalRef.current?.present();
  }, []);

  return (
    <View>
      <Title>Cadence</Title>
      <OTouchable
        onPress={handleModal}
        className="mb-lg flex w-full flex-row items-center rounded-lg bg-ivory px-sm py-3"
      >
        <View className="flex flex-1 flex-row items-center">
          <ChallengeCreateCadenceSummary />
        </View>
        <ChevronRightIcon width={25} />
      </OTouchable>

      <BottomSheetModal
        ref={modalRef}
        backdropComponent={(props) => <BottomSheetBackdrop {...props} />}
        enablePanDownToClose
      >
        <BottomSheetView>
          <ChallengeCreateCadenceSelector modalRef={modalRef} />
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};
