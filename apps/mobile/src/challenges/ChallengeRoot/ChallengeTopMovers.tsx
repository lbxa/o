import type { User } from "@o/api";
import { Text, View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import { graphql, usePreloadedQuery } from "react-relay";

import type { ChallengeTopMoversQuery } from "../../__generated__/ChallengeTopMoversQuery.graphql";
import { intToTimestamp } from "../ChallengeLogger/utils";

const UserResultCard = ({ user, result }: { user: User; result: number }) => {
  return (
    <View className="mt-sm flex-row items-center justify-between">
      <View className="flex flex-col">
        <Text className="text-xl">{user.firstName + " " + user.lastName}</Text>
        <Text className="text-sm">
          Friends with <Text className="font-bold">{user.firstName}</Text> and{" "}
          <Text className="font-bold">2 others</Text>
        </Text>
      </View>
      <Text
        className="text-3xl font-bold"
        style={{ fontVariant: ["tabular-nums"] }}
      >
        {intToTimestamp(result).toString()}
      </Text>
    </View>
  );
};

export const CHALLENGE_TOP_MOVERS_QUERY = graphql`
  query ChallengeTopMoversQuery($challengeId: ID!) {
    challengeActivityResults(challengeId: $challengeId) {
      user {
        id
        firstName
        lastName
      }
      result
    }
  }
`;

interface ChallengeTopMoversProps {
  queryRef: PreloadedQuery<ChallengeTopMoversQuery>;
}
export const ChallengeTopMovers = ({ queryRef }: ChallengeTopMoversProps) => {
  const data = usePreloadedQuery<ChallengeTopMoversQuery>(
    CHALLENGE_TOP_MOVERS_QUERY,
    queryRef
  );
  return (
    <View className="mb-md">
      <Text className="text-2xl font-bold">Top Movers</Text>
      {data.challengeActivityResults
        ?.slice(0, 3)
        .map((item) => (
          <UserResultCard user={item.user} result={item.result} />
        ))
      // <FlatList
      //   data={data.challengeActivityResults.slice(0, 3)}
      //   renderItem={({ item }) => (
      //     <UserResultCard user={item.user} result={item.result} />
      //   )}
      // />
      }
      <Text className="mt-md underline">View all</Text>
    </View>
  );
};
