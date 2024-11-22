import type { User } from "@o/api-gql";
import { Text, View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import { graphql, usePreloadedQuery } from "react-relay";

import type { ChallengeTopMoversQuery } from "../../../__generated__/ChallengeTopMoversQuery.graphql";
import { intToTimestamp } from "../../ChallengeLogger/utils";

const UserChallengeResultCard = ({
  user,
  result,
}: {
  user: User;
  result: number;
}) => {
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
  query ChallengeTopMoversQuery(
    $challengeId: ID!
    $count: Int
    $cursor: String
  ) {
    challengeActivityResults(
      challengeId: $challengeId
      first: $count
      after: $cursor
    ) @connection(key: "ChallengeTopMoversQuery_challengeActivityResults") {
      edges {
        cursor
        node {
          user {
            id
            firstName
            lastName
          }
          result
        }
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
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
      {data.challengeActivityResults.edges
        ?.slice(0, 3)
        .map((item, i) => (
          <UserChallengeResultCard
            key={i}
            user={item.node.user}
            result={item.node.result}
          />
        ))}
      <Text className="mt-md underline">View all</Text>
    </View>
  );
};
