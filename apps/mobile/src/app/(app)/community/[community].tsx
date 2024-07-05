import { Ozone } from "@universe/molecules";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";
import type { PreloadedQuery } from "react-relay";
import { useFragment, usePreloadedQuery, useQueryLoader } from "react-relay";

import type { CommunityFragment$key } from "../../../__generated__/CommunityFragment.graphql";
import type { CommunitySearchQuery } from "../../../__generated__/CommunitySearchQuery.graphql";
import {
  COMMUNITY_FRAGMENT,
  COMMUNITY_SEARCH_QUERY,
} from "../../../communities";

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
    loadQuery({ id: Number(communityId) }, { fetchPolicy: "store-only" });
  }, [communityId, loadQuery]);

  if (!queryRef) {
    return <Text>Loading...</Text>;
  }

  return (
    <Ozone>
      <CommunityDetails queryRef={queryRef} />
    </Ozone>
  );
}
