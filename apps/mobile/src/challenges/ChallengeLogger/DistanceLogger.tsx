import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { View } from "react-native";

import { ComingSoonBadge, Title } from "@/universe/atoms";
import { OBackdrop } from "@/universe/molecules/OBackdrop";

interface DistanceLoggerProps {
  modalRef: React.RefObject<BottomSheetModal>;
}
export const DistanceLogger = ({ modalRef }: DistanceLoggerProps) => {
  return (
    <BottomSheetModal
      ref={modalRef}
      backdropComponent={(props) => <OBackdrop {...props} />}
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
