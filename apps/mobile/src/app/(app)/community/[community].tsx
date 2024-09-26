import { Button, Touchable } from "@universe/atoms";
import { MiniNav, Ozone } from "@universe/molecules";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { graphql, useFragment, useLazyLoadQuery } from "react-relay";

import ChevronLeftIcon from "../../../../assets/icons/chevron-left.svg";
import type { CommunityDetailsQuery } from "../../../__generated__/CommunityDetailsQuery.graphql";
import type { CommunityFragment$key } from "../../../__generated__/CommunityFragment.graphql";
import { COMMUNITY_FRAGMENT } from "../../../communities/CommunityFragment";

const COMMUNITY_DETAILS_QUERY = graphql`
  query CommunityDetailsQuery($id: ID!) {
    community(id: $id) {
      ...CommunityFragment
    }
  }
`;

interface Props {
  frag: CommunityFragment$key | undefined | null;
  setName: (name: string) => void;
}

const CommunityDetails = ({ frag, setName }: Props) => {
  const data = useFragment(COMMUNITY_FRAGMENT, frag);

  useEffect(() => {
    data && setName(data.name);
  }, [data, setName]);

  if (!data) {
    return <Text>Community not found</Text>;
  }

  return <Text>{data.name}</Text>;
};

export default function CommunityDetailsRoute() {
  const router = useRouter();
  const [communityName, setCommunityName] = useState<string | undefined>(
    undefined
  );
  const { community: communityId } = useLocalSearchParams<{
    community: string;
  }>();

  const query = useLazyLoadQuery<CommunityDetailsQuery>(
    COMMUNITY_DETAILS_QUERY,
    { id: communityId },
    { fetchPolicy: "store-or-network" }
  );

  return (
    <Ozone>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <View className="gap-sm flex flex-row items-center">
              <Touchable onPress={() => router.back()}>
                <ChevronLeftIcon />
              </Touchable>
              <Text className="text-3xl font-bold">
                {communityName ?? "Community"}
              </Text>
            </View>
          ),
          headerRight: () => (
            <MiniNav
              items={["create", "message"]}
              itemConfigs={{
                create: {
                  href: "/(app)/community/create",
                },
              }}
            />
          ),
        }}
      />
      <View className="px-md">
        <View className="mb-md gap-md flex flex-row">
          <Button title="Share" variant="violet" className="w-20 rounded-xl" />
          <Button
            title="Invite"
            variant="violet"
            className="w-20 rounded-xl"
            onPress={() => router.push("/(app)/community/invite")}
          />
        </View>
        <Text className="text-xl font-bold">Challenges</Text>
        <CommunityDetails frag={query.community} setName={setCommunityName} />
      </View>
    </Ozone>
  );
}
