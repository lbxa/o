import { CommunityCard } from "@universe/molecules";
import { Suspense, useCallback, useEffect, useTransition } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import {
  graphql,
  usePreloadedQuery,
  useRefetchableFragment,
} from "react-relay";

import type { CommunityList__query$key } from "../__generated__/CommunityList__query.graphql";
import type { CommunityListQuery } from "../__generated__/CommunityListQuery.graphql";
import type { CommunityListRefetchQuery } from "../__generated__/CommunityListRefetchQuery.graphql";

const COMMUNITY_LIST_FRAGMENT = graphql`
  fragment CommunityList__query on Query
  @refetchable(queryName: "CommunityListRefetchQuery") {
    communities {
      ...CommunityFragment
    }
  }
`;

export const COMMUNITY_LIST_QUERY = graphql`
  query CommunityListQuery {
    ...CommunityList__query
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
    CommunityList__query$key
  >(COMMUNITY_LIST_FRAGMENT, query);

  const handleRefresh = useCallback(() => {
    startTransition(() => {
      refetch({}, { fetchPolicy: "network-only" });
    });
  }, [refetch]);

  useEffect(() => {
    console.log("Rows fetched", data.communities?.length);
  }, [query]);

  return (
    <View className="min-h-screen">
      <Suspense fallback={<Text>Loading...</Text>}>
        <FlatList
          data={data.communities}
          renderItem={({ item }) => <CommunityCard community={item} />}
          ListHeaderComponent={<></>}
          refreshControl={
            <RefreshControl refreshing={isPending} onRefresh={handleRefresh} />
          }
        />
      </Suspense>
    </View>
  );
};
