import ChevronLeftIcon from "@assets/icons/chevron-left.svg";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { ChallengeHeader_challenge$key } from "@/__generated__/ChallengeHeader_challenge.graphql";
import { OTouchable } from "@/universe/atoms";

export const ChallengeHeader: React.FC<{
  fragmentRef: ChallengeHeader_challenge$key;
}> = ({ fragmentRef }) => {
  const challenge = useFragment<ChallengeHeader_challenge$key>(
    graphql`
      fragment ChallengeHeader_challenge on Challenge {
        id
        name
      }
    `,
    fragmentRef
  );

  return (
    <View className="flex flex-row items-center gap-sm">
      <OTouchable onPress={() => router.back()}>
        <ChevronLeftIcon />
      </OTouchable>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        className="flex-1 text-3xl font-bold"
      >
        {challenge.name}
      </Text>
    </View>
  );
};
