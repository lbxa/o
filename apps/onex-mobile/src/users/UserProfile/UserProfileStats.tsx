import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { UserProfileStats_user$key } from "@/__generated__/UserProfileStats_user.graphql";
import { OTouchable } from "@/universe/atoms";

export const UserProfileStats = ({
  user,
}: {
  user: UserProfileStats_user$key;
}) => {
  const router = useRouter();
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
      <OTouchable
        className="flex flex-col items-center"
        onPress={() => router.push("/(root)/profile/profile-followers")}
      >
        <Text className="text-5xl font-bold text-black dark:text-ivory">
          {stats.followerCount}
        </Text>
        <Text className="text-lg text-black dark:text-ivory">Followers</Text>
      </OTouchable>
      <View className="flex flex-col items-center">
        <Text className="text-5xl font-bold text-black dark:text-ivory">
          {stats.challengeActivityResultsCount}
        </Text>
        <Text className="text-lg text-black dark:text-ivory">Challenges</Text>
      </View>
    </View>
  );
};
