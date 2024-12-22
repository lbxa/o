import type { User } from "@o/api-gql";
import { View } from "react-native";

import { OText } from "../../universe/atoms";

export const UserAvatar = ({ user }: { user: User }) => {
  return (
    <View className="mb-md flex size-[200px] items-center justify-center rounded-full bg-gray-300 dark:bg-white/20">
      <OText className="flex items-center justify-center text-7xl font-bold leading-[200px]">
        {user.firstName?.charAt(0)}
        {user.lastName?.charAt(0)}
      </OText>
    </View>
  );
};
