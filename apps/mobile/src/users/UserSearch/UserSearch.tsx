import SearchIcon from "@assets/icons/search.svg";
import debounce from "debounce";
import { Link } from "expo-router";
import React, {
  Suspense,
  useCallback,
  useDeferredValue,
  useEffect,
  useState,
  useTransition,
} from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View,
} from "react-native";
import { graphql, useLazyLoadQuery, useRefetchableFragment } from "react-relay";

import type { UserSearchFriends_viewer$key } from "@/__generated__/UserSearchFriends_viewer.graphql";
import type { UserSearchFriendsListQuery } from "@/__generated__/UserSearchFriendsListQuery.graphql";
import type { UserSearchRefetchQuery } from "@/__generated__/UserSearchRefetchQuery.graphql";
import { PrimaryTextInputControl, Skeleton } from "@/universe/atoms";

import { UserInviteCard } from "./UserInviteCard";

interface SearchBarProps {
  loading?: boolean;
  searchQuery: string;
  onSearchChange: (term: string) => void;
}

const SearchBar = ({
  searchQuery,
  onSearchChange,
  loading,
}: SearchBarProps) => {
  const handleChange = useCallback(
    (term: string) => {
      onSearchChange(term);
    },
    [onSearchChange]
  );

  return (
    <View className="flex w-full flex-row items-center">
      <View className="mb-md flex w-full flex-1 flex-row items-center rounded-lg bg-ivory px-sm">
        {loading ? <ActivityIndicator /> : <SearchIcon width={20} />}
        <PrimaryTextInputControl
          className="flex-1"
          placeholder="Search Users"
          inputMode="text"
          autoFocus
          value={searchQuery}
          textContentType="oneTimeCode"
          onChangeText={handleChange}
        />
        <Link href="../">Cancel</Link>
      </View>
    </View>
  );
};

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
      <SearchBar
        // loading={searchQuery !== deferredSearchQuery}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <Suspense
        fallback={
          <ScrollView>
            <View className="flex flex-col gap-sm">
              {Array.from({ length: 20 }).map((_, index) => (
                <Skeleton key={index} className="h-12 w-full rounded-xl" />
              ))}
            </View>
          </ScrollView>
        }
      >
        <UserSearchResults searchTerm={deferredSearchQuery} />
      </Suspense>
    </View>
  );
};
