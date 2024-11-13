import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { View } from "react-native";

import type { ChallengeActivityTopResultsFragment_challenge$data } from "@/__generated__/ChallengeActivityTopResultsFragment_challenge.graphql";
import { Title } from "@/universe/atoms";

import { BottomSheetBackdrop } from "../../BottomSheetBackdrop";
import { UserResultCard } from "./UserResultCard";

interface ChallengeTopResultsListProps {
  modalRef: React.RefObject<BottomSheetModal>;
  results: ChallengeActivityTopResultsFragment_challenge$data["activityTopResults"];
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
      backdropComponent={(props) => <BottomSheetBackdrop {...props} />}
    >
      <BottomSheetScrollView>
        <View className="flex flex-col bg-white px-md pb-10">
          <Title>Top Results</Title>
          {results?.map((item, index) => (
            <UserResultCard
              key={index}
              user={item.user}
              result={item.result}
              measurement={item.activity.measurement}
            />
          ))}
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};
