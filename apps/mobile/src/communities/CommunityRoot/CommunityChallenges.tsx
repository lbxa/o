import { useCallback, useTransition } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { graphql, useRefetchableFragment } from "react-relay";

import { ChallengeCard } from "@/challenges";
import { Button } from "@/universe/atoms";

import type { CommunityChallenges_community$key } from "../../__generated__/CommunityChallenges_community.graphql";
import type { CommunityChallengesRefreshQuery } from "../../__generated__/CommunityChallengesRefreshQuery.graphql";
import { CommunityDetails } from "./CommunityDetails";

export const COMMUNITY_CHALLENGES_FRAGMENT = graphql`
  fragment CommunityChallenges_community on Community
  @refetchable(queryName: "CommunityChallengesRefreshQuery") {
    id
    challenges {
      ...ChallengeFragment
    }
  }
`;

interface Props {
  fragmentRef: CommunityChallenges_community$key;
}

export const CommunityChallenges = ({ fragmentRef }: Props) => {
  const [isPending, startTransition] = useTransition();

  const [data, refetch] = useRefetchableFragment<
    CommunityChallengesRefreshQuery,
    CommunityChallenges_community$key
  >(COMMUNITY_CHALLENGES_FRAGMENT, fragmentRef);

  const handleRefresh = useCallback(() => {
    startTransition(() => {
      refetch({ id: "Q29tbXVuaXR5OjE=" }, { fetchPolicy: "store-and-network" });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.id]);

  console.log("data.id", data.id);

  return (
    <View>
      <FlatList
        className="px-md"
        data={data.challenges}
        ListHeaderComponent={
          <View>
            <CommunityDetails />
            <Text className="mb-md text-2xl font-bold">Challenges</Text>
          </View>
        }
        ListEmptyComponent={
          <Text className="mb-md">
            No challenges yet. Be the first to create one.
          </Text>
        }
        ListFooterComponent={<Button title="See Past Challenges"></Button>}
        renderItem={({ item }) => <ChallengeCard challengeFragment={item} />}
        refreshControl={
          <RefreshControl refreshing={isPending} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};
