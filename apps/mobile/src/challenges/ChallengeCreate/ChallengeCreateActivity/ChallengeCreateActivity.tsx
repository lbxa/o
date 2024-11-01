import ChevronRightIcon from "@assets/icons/chevron-right.svg";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { View } from "react-native";

import { Title, Touchable } from "@/universe/atoms";

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
      <Touchable
        onPress={handleModal}
        className="mb-lg flex w-full flex-row items-center rounded-lg bg-ivory px-sm py-3"
      >
        <View className="flex flex-1 flex-row items-center">
          <ChallengeCreateActivitySummary />
        </View>
        <ChevronRightIcon width={25} />
      </Touchable>

      <BottomSheetModal
        ref={modalRef}
        // index={0}
        // snapPoints={["45%"]}
        backdropComponent={(props) => <BottomSheetBackdrop {...props} />}
        enableDynamicSizing
        maxDynamicContentSize={700}
        // enablePanDownToClose
        // maxDynamicContentSize={700}
      >
        <BottomSheetScrollView>
          <ChallengeCreateActivitySelector modalRef={modalRef} />
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
};
