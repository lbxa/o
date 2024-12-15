import { Text, View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { UserProfileStats_user$key } from "@/__generated__/UserProfileStats_user.graphql";

export const UserProfileStats = ({
  user,
}: {
  user: UserProfileStats_user$key;
}) => {
  const stats = useFragment<UserProfileStats_user$key>(
    graphql`
      fragment UserProfileStats_user on User {
        buddyCount
        followerCount
        challengeActivityResultsCount
      }
    `,
    user
  );

  return (
    <View className="flex flex-row gap-lg">
      <View className="flex flex-col items-center">
        <Text className="text-5xl font-bold text-black dark:text-ivory">
          {stats.buddyCount}
        </Text>
        <Text className="text-lg text-black dark:text-ivory">Buddies</Text>
      </View>
      <View className="flex flex-col items-center">
        <Text className="text-5xl font-bold text-black dark:text-ivory">
          {stats.followerCount}
        </Text>
        <Text className="text-lg text-black dark:text-ivory">Followers</Text>
      </View>
      <View className="flex flex-col items-center">
        <Text className="text-5xl font-bold text-black dark:text-ivory">
          {stats.challengeActivityResultsCount}
        </Text>
        <Text className="text-lg text-black dark:text-ivory">Challenges</Text>
      </View>
    </View>
  );
};
