import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ChallengeCadence } from "@o/api-gql";
import { View } from "react-native";

import { useZustStore } from "@/state";
import { OButton, Pill, Subtitle, Title } from "@/universe/atoms";

import { challengeCadenceToLabel } from "../../ChallengeCadence";

export const ChallengeCreateCadenceSelector: React.FC<{
  modalRef: React.RefObject<BottomSheetModal>;
}> = ({ modalRef }) => {
  const { setChallengeFormField, challengeForm } = useZustStore();

  const selectedCadence = challengeForm.cadence ?? ChallengeCadence.None;

  const cadences: ChallengeCadence[] = [
    ChallengeCadence.None,
    ChallengeCadence.Daily,
    ChallengeCadence.Weekly,
    ChallengeCadence.Biweekly,
    ChallengeCadence.Monthly,
    ChallengeCadence.Yearly,
  ];

  return (
    <View className="flex flex-col px-md pb-10">
      <Title>Frequency</Title>
      <Subtitle>How often will you be required to post your progress?</Subtitle>
      <View className="mb-lg flex flex-row flex-wrap gap-md">
        {cadences.map((c) => (
          <Pill
            label={challengeCadenceToLabel(c)}
            key={c}
            selected={selectedCadence === c}
            onPress={() => setChallengeFormField("cadence", c)}
          />
        ))}
      </View>
      <OButton
        title={"Done"}
        variant="indigo"
        onPress={() => {
          setChallengeFormField("cadence", selectedCadence);
          modalRef.current?.close();
        }}
      />
    </View>
  );
};
