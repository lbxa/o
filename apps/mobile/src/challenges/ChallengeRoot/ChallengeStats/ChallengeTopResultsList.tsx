import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { View } from "react-native";

import type { UserResultCard_challenge$key } from "@/__generated__/UserResultCard_challenge.graphql";
import { Title } from "@/universe/atoms";
import { OBackdrop } from "@/universe/molecules/OBackdrop";

import { UserResultCard } from "./UserResultCard";

interface ChallengeTopResultsListProps {
  modalRef: React.RefObject<BottomSheetModal>;
  results: UserResultCard_challenge$key[];
}
export const ChallengeTopResultsList = ({
  modalRef,
  results,
}: ChallengeTopResultsListProps) => {
  return (
    <BottomSheetModal
      ref={modalRef}
      enableDynamicSizing
      maxDynamicContentSize={900}
      enablePanDownToClose
      backdropComponent={(props) => <OBackdrop {...props} />}
    >
      <BottomSheetScrollView>
        <View className="flex flex-col bg-white px-md pb-10">
          <Title>View all</Title>
          {results.map((item, index) => (
            <UserResultCard key={index} result={item} />
          ))}
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};
