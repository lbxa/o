import Nature from "@assets/images/nature.svg";
import React from "react";
import { Text, View } from "react-native";

import { AppRoot } from "@/root";
import { Ozone } from "@/universe/molecules";

export default function Home() {
  return (
    <AppRoot>
      <Ozone>
        <View className="gap-md pt-md flex flex-col">
          <View className="mx-auto">
            <Nature width={150} height={150} />
          </View>
          <Text className="text-center">It's time to get outside</Text>
        </View>
      </Ozone>
    </AppRoot>
  );
}
