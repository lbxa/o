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
    <View className="gap-lg flex flex-row">
      <View className="flex flex-col items-center">
        <Text className="text-5xl font-bold">{stats.buddyCount}</Text>
        <Text className="text-lg">Buddies</Text>
      </View>
      <View className="flex flex-col items-center">
        <Text className="text-5xl font-bold">{stats.followerCount}</Text>
        <Text className="text-lg">Followers</Text>
      </View>
      <View className="flex flex-col items-center">
        <Text className="text-5xl font-bold">
          {stats.challengeActivityResultsCount}
        </Text>
        <Text className="text-lg">Challenges</Text>
      </View>
    </View>
  );
};
