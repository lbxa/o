import { Title } from "@universe/atoms";
import { Ozone } from "@universe/molecules";
import React from "react";
import { View } from "react-native";

import { CommunityCreate } from "../../communities";

export default function Home() {
  return (
    <Ozone>
      <View className="px-md">
        <Title title="Create a community" />
        <CommunityCreate />
      </View>
    </Ozone>
  );
}
