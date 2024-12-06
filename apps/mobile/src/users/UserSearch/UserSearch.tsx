import debounce from "debounce";
import React, {
  Suspense,
  useDeferredValue,
  useEffect,
  useState,
  useTransition,
} from "react";
import { FlatList, Text, View } from "react-native";
import { graphql, useLazyLoadQuery, useRefetchableFragment } from "react-relay";

import type { UserSearchFriends_viewer$key } from "@/__generated__/UserSearchFriends_viewer.graphql";
import type { UserSearchFriendsListQuery } from "@/__generated__/UserSearchFriendsListQuery.graphql";
import type { UserSearchRefetchQuery } from "@/__generated__/UserSearchRefetchQuery.graphql";
import { OSearchBar } from "@/universe/molecules";

import { UserInviteCard } from "./UserInviteCard";

export const USER_SEARCH_QUERY = graphql`
  query UserSearchFriendsListQuery($searchTerm: String) {
    viewer {
      ...UserSearchFriends_viewer @arguments(searchTerm: $searchTerm)
    }
  }
`;

interface UserSearchResultsProps {
  searchTerm: string;
}

const UserSearchResults = ({ searchTerm }: UserSearchResultsProps) => {
  const [_, startTransition] = useTransition();
  const query = useLazyLoadQuery<UserSearchFriendsListQuery>(
    USER_SEARCH_QUERY,
    {
      searchTerm: "",
    }
  );

  const [data, refetch] = useRefetchableFragment<
    UserSearchRefetchQuery,
    UserSearchFriends_viewer$key
  >(
    graphql`
      fragment UserSearchFriends_viewer on Viewer
      @refetchable(queryName: "UserSearchRefetchQuery")
      @argumentDefinitions(searchTerm: { type: "String", defaultValue: null }) {
        user {
          searchFriends(searchTerm: $searchTerm) {
            ...UserInviteCard_user
          }
        }
      }
    `,
    query.viewer
  );

  useEffect(() => {
    const debouncedRefetch = debounce(() => {
      startTransition(() => {
        refetch(
          { searchTerm },
          { fetchPolicy: "store-and-network", UNSTABLE_renderPolicy: "partial" }
        );
      });
    }, 300);

    debouncedRefetch();

    return () => debouncedRefetch.clear();
  }, [refetch, searchTerm]);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      className="px-sm"
      data={data?.user?.searchFriends}
      renderItem={({ item }) => <UserInviteCard fragmentRef={item} />}
      ListEmptyComponent={
        <Text className="pt-md text-center">No users found</Text>
      }
    />
  );
};

export const UserSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const deferredSearchQuery = useDeferredValue(searchQuery);

  return (
    <View className="h-full flex-1 px-md">
      <OSearchBar
        loading={searchQuery !== deferredSearchQuery}
        placeholder="Search users"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <Suspense fallback={null}>
        <UserSearchResults searchTerm={deferredSearchQuery} />
      </Suspense>
    </View>
  );
};
