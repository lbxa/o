import ChevronLeftIcon from "@assets/icons/chevron-left.svg";
import { Button, Touchable } from "@universe/atoms";
import { MiniNav, Ozone } from "@universe/molecules";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { useLazyLoadQuery, useQueryLoader } from "react-relay";

import type { CommunityChallengesListQuery } from "../../__generated__/CommunityChallengesListQuery.graphql";
import type { CommunityDetailsQuery } from "../../__generated__/CommunityDetailsQuery.graphql";
import {
  COMMUNITY_CHALLENGES_LIST_QUERY,
  CommunityChallengesList,
} from "./CommunityChallengesList";
import { COMMUNITY_DETAILS_QUERY, CommunityDetails } from "./CommunityDetails";

interface CommunityRootProps {
  communityId: string;
}
export const CommunityRoot = ({ communityId }: CommunityRootProps) => {
  const router = useRouter();

  const [
    communityChallengesQueryRef,
    loadCommunityChallengesQuery,
    disposeCommunityChallengesQuery,
  ] = useQueryLoader<CommunityChallengesListQuery>(
    COMMUNITY_CHALLENGES_LIST_QUERY
  );

  // TODO will need late when this component matures
  const [
    communityDetailsQueryRef,
    loadCommunityDetailsQuery,
    disposeCommunityDetailsQuery,
  ] = useQueryLoader<CommunityDetailsQuery>(COMMUNITY_CHALLENGES_LIST_QUERY);

  const query = useLazyLoadQuery<CommunityDetailsQuery>(
    COMMUNITY_DETAILS_QUERY,
    { id: communityId },
    { fetchPolicy: "store-and-network" }
  );

  useEffect(() => {
    loadCommunityChallengesQuery({ communityId: communityId });

    return () => disposeCommunityChallengesQuery();
  }, [communityId]);

  return (
    <Ozone>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <View className="flex flex-row items-center gap-sm">
              <Touchable onPress={() => router.back()}>
                <ChevronLeftIcon />
              </Touchable>
              <Text className="text-3xl font-bold">
                {query.community?.name ?? "Loading..."}
              </Text>
            </View>
          ),
          headerRight: () => (
            <MiniNav
              items={["create", "message"]}
              itemConfigs={{
                create: {
                  href: "/(app)/community/challenge/create",
                },
              }}
            />
          ),
        }}
      />
      <View className="px-md">
        {/* {communityDetailsQueryRef && (
          <CommunityDetails queryRef={communityDetailsQueryRef} />
        )} */}
        <View className="mb-md flex flex-row gap-md">
          <Button title="Share" variant="indigo" className="w-20 rounded-xl" />
          <Button
            title="Invite"
            variant="indigo"
            className="w-20 rounded-xl"
            onPress={() => router.push("/(app)/community/invite")}
          />
        </View>
        {communityChallengesQueryRef && (
          <CommunityChallengesList
            challengesQueryRef={communityChallengesQueryRef}
            communityFrag={query.community}
          />
        )}
      </View>
    </Ozone>
  );
};
