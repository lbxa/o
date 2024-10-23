import type { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { ChallengeMode } from "@o/api";
import classNames from "classnames";
import CheckBox from "expo-checkbox";
import React from "react";
import { Text, View } from "react-native";

import { Button, Subtitle, Title } from "@/universe/atoms";

import { useZustStore } from "../../state";
import type { ChallengeModeLabel } from "../ChallengeMode";

const DataControl: React.FC<{
  controlName: string;
  controlDescription: string;
  onSelect?: () => void;
  selected?: boolean;
  comingSoon?: boolean;
}> = ({ controlName, controlDescription, selected, onSelect, comingSoon }) => {
  return (
    <View className="flex flex-row items-center gap-md">
      <View className="flex flex-1">
        <Text
          className={classNames("mb-sm text-xl", {
            "text-gray-500": comingSoon,
          })}
        >
          {controlName}
          {comingSoon && " (Coming Soon)"}
        </Text>
        <Text>{controlDescription}</Text>
      </View>
      <CheckBox
        value={selected}
        color="black"
        disabled={comingSoon}
        onValueChange={onSelect}
      />
    </View>
  );
};

export const ChallengeModeSelector: React.FC<{
  modalRef: React.RefObject<BottomSheetModalMethods>;
}> = ({ modalRef }) => {
  const { setChallengeFormField, challengeForm } = useZustStore();

  const selectedControl = challengeForm.mode ?? ChallengeMode.BlindTrust;

  const controls: {
    controlId: ChallengeMode;
    controlName: ChallengeModeLabel;
    controlDescription: string;
    comingSoon?: boolean;
  }[] = [
    {
      controlId: ChallengeMode.BlindTrust,
      controlName: "Blind Trust",
      controlDescription:
        "Users can submit their workouts without any verification. This is a good option for challenges that are self-paced and do not require any external verification.",
    },
    {
      controlId: ChallengeMode.BuddySystem,
      controlName: "Buddy System",
      controlDescription:
        "Users can verify each other's workouts. This is a good option for communities that want to maintain a level of trust, accountability and getting that conversation started.",
      comingSoon: true,
    },
    {
      controlId: ChallengeMode.VerifiedOnly,
      controlName: "Verified Only",
      controlDescription:
        "Only admins are permitted to verify a members workout. This option is ideal for challenges that emphasise strict accountability and require a higher level of oversight.",
    },
  ];

  return (
    <View className="flex flex-col bg-white px-md pb-10">
      <Title>Proof of Workout</Title>
      <Subtitle>How will users prove they completed your challenge?</Subtitle>
      <View className="mb-lg flex flex-col gap-md">
        {controls.map((c) => (
          <DataControl
            key={c.controlName}
            {...c}
            selected={c.controlId === selectedControl}
            onSelect={() => setChallengeFormField("mode", c.controlId)}
          />
        ))}
      </View>
      <Button
        title={"Done"}
        variant="indigo"
        onPress={() => {
          modalRef.current?.close();
        }}
      />
    </View>
  );
};
