import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { View } from "react-native";

import { ComingSoonBadge, Title } from "@/universe/atoms";

import { useSharedBottomSheetProps } from "../../shared";

interface DistanceLoggerProps {
  modalRef: React.RefObject<BottomSheetModal>;
}
export const DistanceLogger = ({ modalRef }: DistanceLoggerProps) => {
  const bottomSheetProps = useSharedBottomSheetProps();
  return (
    <BottomSheetModal
      ref={modalRef}
      {...bottomSheetProps}
      enablePanDownToClose
      enableDynamicSizing={false}
      index={0}
      snapPoints={["13%"]}
    >
      <BottomSheetView>
        <View className="px-md">
          <View className="flex flex-row items-center gap-sm">
            <Title>Distance Logger</Title>
            <ComingSoonBadge />
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
