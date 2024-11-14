import { useCallback, useEffect, useTransition } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import {
  graphql,
  usePreloadedQuery,
  useRefetchableFragment,
} from "react-relay";

import type { CommunityListFragment$key } from "@/__generated__/CommunityListFragment.graphql";
import type { CommunityListRefetchQuery } from "@/__generated__/CommunityListRefetchQuery.graphql";
import { CommunityCard } from "@/universe/molecules";

import { useZustStore } from "../state";

const COMMUNITY_LIST_FRAGMENT = graphql`
  fragment CommunityListFragment on Viewer
  @refetchable(queryName: "CommunityListRefetchQuery") {
    communities {
      ...CommunityFragment
    }
  }
`;

export const COMMUNITY_LIST_QUERY = graphql`
  query CommunityListQuery {
    viewer {
      ...CommunityListFragment
    }
  }
`;

export const CommunityList = () => {
  const { preloadedCommunityListQuery } = useZustStore();
  const query = usePreloadedQuery(
    COMMUNITY_LIST_QUERY,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    preloadedCommunityListQuery!
  );
  const [isPending, startTransition] = useTransition();

  const [data, refetch] = useRefetchableFragment<
    CommunityListRefetchQuery,
    CommunityListFragment$key
  >(COMMUNITY_LIST_FRAGMENT, query.viewer);

  const handleRefresh = useCallback(() => {
    startTransition(() => {
      refetch({});
    });
  }, [refetch]);

  useEffect(() => {
    return () => preloadedCommunityListQuery?.dispose();
  }, [preloadedCommunityListQuery]);

  return (
    <View className="h-full">
      <FlatList
        className="px-md"
        data={data?.communities}
        renderItem={({ item }) => <CommunityCard community={item} />}
        ListHeaderComponent={<></>}
        ListEmptyComponent={<Text>Looking a little quiet here...</Text>}
        refreshControl={
          <RefreshControl refreshing={isPending} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};
