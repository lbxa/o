import type { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import CheckBox from "expo-checkbox";
import React, { useState } from "react";
import { Text, View } from "react-native";

import { Button, Subtitle, Title } from "@/universe/atoms";

const DataControl: React.FC<{
  controlName: string;
  controlDescription: string;
  onSelect?: () => void;
  selected?: boolean;
  disabled?: boolean;
}> = ({ controlName, controlDescription, selected, onSelect, disabled }) => {
  return (
    <View className="flex flex-row items-center gap-md">
      <View className="flex flex-1">
        <Text className="mb-sm text-xl">{controlName}</Text>
        <Text>{controlDescription}</Text>
      </View>
      <CheckBox
        value={selected}
        color="black"
        disabled={disabled}
        onValueChange={onSelect}
      />
    </View>
  );
};

export const ChallengeDataControls: React.FC<{
  modalRef: React.RefObject<BottomSheetModalMethods>;
}> = ({ modalRef }) => {
  const [control, setControl] = useState<string>("blind_trust");

  const controls: {
    controlId: string;
    controlName: string;
    controlDescription: string;
    disabled?: boolean;
  }[] = [
    {
      controlId: "blind_trust",
      controlName: "Blind Trust",
      controlDescription:
        "Users can submit their workouts without any verification. This is a good option for challenges that are self-paced and do not require any external verification.",
    },
    {
      controlId: "buddy_system",
      controlName: "Buddy System (Coming Soon)",
      controlDescription:
        "Users can verify each other's workouts. This is a good option for communities that want to maintain a level of trust, accountability and getting that conversation started.",
      disabled: true,
    },
    {
      controlId: "verified_admin",
      controlName: "Verified Admin",
      controlDescription:
        "Only admins are permitted to verify a members workout. This option is ideal for challenges that emphasise strict accountability and require a higher level of oversight.",
    },
  ];

  return (
    <View className="flex h-full flex-col bg-white px-md">
      <View className="flex flex-1">
        <Title>Proof of Workout</Title>
        <Subtitle>How will users prove they completed your challenge?</Subtitle>
        <View className="flex flex-col gap-md">
          {controls.map((c) => (
            <DataControl
              key={c.controlName}
              {...c}
              selected={c.controlId === control}
              onSelect={() => setControl(c.controlId)}
            />
          ))}
        </View>
      </View>
      <Button
        title={"Done"}
        variant="indigo"
        className="mb-10"
        onPress={(e) => {
          // Read more about event pooling
          // https://legacy.reactjs.org/docs/legacy-event-pooling.html
          e.persist();
          modalRef.current?.close();
        }}
      />
    </View>
  );
};
