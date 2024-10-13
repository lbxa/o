import { CommunityCard } from "@universe/molecules";
import { useCallback, useEffect, useTransition } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import {
  graphql,
  usePreloadedQuery,
  useRefetchableFragment,
} from "react-relay";

import type { CommunityListFragment$key } from "../__generated__/CommunityListFragment.graphql";
import type { CommunityListQuery } from "../__generated__/CommunityListQuery.graphql";
import type { CommunityListRefetchQuery } from "../__generated__/CommunityListRefetchQuery.graphql";

const COMMUNITY_LIST_FRAGMENT = graphql`
  fragment CommunityListFragment on Viewer
  @refetchable(queryName: "CommunityListRefetchQuery") {
    communities {
      ...CommunityFragment
    }
  }
`;

// TODO moved to the parent component
export const COMMUNITY_LIST_QUERY = graphql`
  query CommunityListQuery {
    viewer {
      ...CommunityListFragment
    }
  }
`;

interface Props {
  queryRef: PreloadedQuery<CommunityListQuery>;
}

export const CommunityList = ({ queryRef }: Props) => {
  const query = usePreloadedQuery(COMMUNITY_LIST_QUERY, queryRef);
  const [isPending, startTransition] = useTransition();

  const [data, refetch] = useRefetchableFragment<
    CommunityListRefetchQuery,
    CommunityListFragment$key
  >(COMMUNITY_LIST_FRAGMENT, query.viewer);

  const handleRefresh = useCallback(() => {
    startTransition(() => {
      refetch({}, { fetchPolicy: "store-and-network" });
    });
  }, [refetch]);

  return (
    <View className="h-full">
      <FlatList
        className="px-sm"
        data={data?.communities}
        renderItem={({ item }) => <CommunityCard community={item} />}
        ListHeaderComponent={<></>}
        refreshControl={
          <RefreshControl refreshing={isPending} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};
