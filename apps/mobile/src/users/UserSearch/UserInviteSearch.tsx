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

import type { UserInviteSearchFriends_viewer$key } from "@/__generated__/UserInviteSearchFriends_viewer.graphql";
import type { UserInviteSearchFriendsListQuery } from "@/__generated__/UserInviteSearchFriendsListQuery.graphql";
import type { UserInviteSearchRefetchQuery } from "@/__generated__/UserInviteSearchRefetchQuery.graphql";
import { OSearchBar } from "@/universe/molecules";

import { UserInviteCard } from "./UserInviteCard";

const USER_INVITE_SEARCH_QUERY = graphql`
  query UserInviteSearchFriendsListQuery($searchTerm: String) {
    viewer {
      ...UserInviteSearchFriends_viewer @arguments(searchTerm: $searchTerm)
    }
  }
`;

interface UserInviteSearchResultsProps {
  searchTerm: string;
}

const UserInviteSearchResults = ({
  searchTerm,
}: UserInviteSearchResultsProps) => {
  const [_, startTransition] = useTransition();
  const query = useLazyLoadQuery<UserInviteSearchFriendsListQuery>(
    USER_INVITE_SEARCH_QUERY,
    {
      searchTerm: "",
    }
  );

  const [data, refetch] = useRefetchableFragment<
    UserInviteSearchRefetchQuery,
    UserInviteSearchFriends_viewer$key
  >(
    graphql`
      fragment UserInviteSearchFriends_viewer on Viewer
      @refetchable(queryName: "UserInviteSearchRefetchQuery")
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

export const UserInviteSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const deferredSearchQuery = useDeferredValue(searchQuery);

  return (
    <View className="px-md h-full flex-1">
      <OSearchBar
        loading={searchQuery !== deferredSearchQuery}
        placeholder="Search users"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showCancel={false}
      />
      <Suspense fallback={null}>
        <UserInviteSearchResults searchTerm={deferredSearchQuery} />
      </Suspense>
    </View>
  );
};
