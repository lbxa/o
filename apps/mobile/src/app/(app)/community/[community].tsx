import { Ozone } from "@universe/molecules";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Text, Touchable, TouchableOpacity, View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import { useFragment, usePreloadedQuery, useQueryLoader } from "react-relay";

import type { CommunityFragment$key } from "../../../__generated__/CommunityFragment.graphql";
import type { CommunitySearchQuery } from "../../../__generated__/CommunitySearchQuery.graphql";
import {
  COMMUNITY_FRAGMENT,
  COMMUNITY_SEARCH_QUERY,
} from "../../../communities";
import {
  PrimaryButton,
  PrimaryTextInput,
  Subtitle,
  Title,
} from "../../../universe/atoms";

interface DumbProps {
  frag: CommunityFragment$key;
}

const DumbComponent = ({ frag }: DumbProps) => {
  const data = useFragment(COMMUNITY_FRAGMENT, frag);
  return <Text>{data.name}</Text>;
};

interface Props {
  queryRef: PreloadedQuery<CommunitySearchQuery>;
}

const CommunityDetails = ({ queryRef }: Props) => {
  const data = usePreloadedQuery<CommunitySearchQuery>(
    COMMUNITY_SEARCH_QUERY,
    queryRef
  );

  if (!data.community) {
    return <Text>Community not found</Text>;
  }

  return <DumbComponent frag={data.community} />;
};

export default function CommunityPage() {
  const { community: communityId } = useLocalSearchParams<{
    community: string;
  }>();

  const [queryRef, loadQuery] = useQueryLoader<CommunitySearchQuery>(
    COMMUNITY_SEARCH_QUERY
  );

  useEffect(() => {
    loadQuery({ id: communityId! }, { fetchPolicy: "store-only" });
  }, [communityId, loadQuery]);

  if (!queryRef) {
    return <Text>Loading...</Text>;
  }

  return (
    <Ozone>
      <View className="w-full h-[200px] bg-gray-300 mb-md"></View>
      {/* <CommunityDetails queryRef={queryRef} /> */}
      <View className="px-md">
        <Title title="Create a Challenge" />
        <Subtitle title="Individual or team" />
        <View className="flex flex-row justify-between mb-md">
          <PrimaryButton title="Individual" />
          <PrimaryButton title="Group" />
        </View>
        <Subtitle title="Select date" />
        <Subtitle title="Challenge access code" />
        <PrimaryTextInput placeholder="1234" className="mb-md" />
        <PrimaryButton title="Start"></PrimaryButton>
      </View>
    </Ozone>
  );
}
