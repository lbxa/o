import MessagesArt from "@assets/images/messages.svg";
import { Text, View } from "react-native";

import { Ozone } from "@/universe/molecules";

export default function Message() {
  return (
    <Ozone>
      <View className="flex-1 items-center px-md pt-xl">
        <MessagesArt width={200} height={200} />
        <Text className="text-center text-2xl font-bold dark:text-ivory">
          Messages coming soon...
        </Text>
      </View>
    </Ozone>
  );
}
