import React from "react";
import { Text, View } from "react-native";

import { AppRoot } from "@/root";
import { Ozone } from "@/universe/molecules";

export default function Home() {
  return (
    <AppRoot>
      <Ozone>
        <View className="px-md">
          <Text>More to come...</Text>
        </View>
      </Ozone>
    </AppRoot>
  );
}
