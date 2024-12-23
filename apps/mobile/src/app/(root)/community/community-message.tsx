import MessagesArt from "@assets/images/messages.svg";
import { Text, View } from "react-native";

import { Ozone } from "@/universe/molecules";

export default function CommunityMessage() {
  return (
    <Ozone>
      <View className="px-md pt-xl flex-1 items-center">
        <MessagesArt width={200} height={200} />
        <Text className="dark:text-ivory text-center text-2xl font-bold">
          Community group chat coming soon...
        </Text>
      </View>
    </Ozone>
  );
}
