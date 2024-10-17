import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useState } from "react";
import { View } from "react-native";

import { Button, Pill, Subtitle, Title } from "@/universe/atoms";

type Cadence =
  | "None"
  | "Daily"
  | "Weekly"
  | "Bi-weekly"
  | "Monthly"
  | "Yearly"
  | "Custom";

interface CustomCadence {
  interval: number;
  unit: "Hours" | "Days" | "Weeks" | "Months" | "Years";
}

export const ChallengeCadenceSelector: React.FC<{
  modalRef: React.RefObject<BottomSheetModal>;
}> = ({ modalRef }) => {
  const [cadence, setCadence] = useState<Cadence>("None");
  const [customCadence, setCustomCadence] = useState<CustomCadence>({
    interval: 1,
    unit: "Days",
  });

  const candences: Cadence[] = [
    "None",
    "Daily",
    "Weekly",
    "Bi-weekly",
    "Monthly",
    "Yearly",
    // "Custom",
  ];

  return (
    <View className="flex h-full flex-col  px-md pb-md">
      <Title>Repeat</Title>
      <Subtitle>How often will users need to post their progress?</Subtitle>
      <View className="mb-lg flex flex-row flex-wrap gap-md">
        {candences.map((c) => (
          <Pill
            label={c}
            key={c}
            selected={cadence === c}
            onPress={() => setCadence(c)}
          />
        ))}
      </View>
      {/* TODO custom cadences */}
      {/* <Text>Repeat every N: </Text>
        <View className="flex flex-row gap-md">
          <Text>Hours</Text>
          <Text>Days</Text>
          <Text>Weeks</Text>
          <Text>Months</Text>
          <Text>Years</Text>
        </View> */}
      <Button
        title={"Done"}
        variant="indigo"
        onPress={() => modalRef.current?.close()}
      />
    </View>
  );
};
