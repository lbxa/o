import SearchIcon from "@assets/icons/search.svg";
import { Link } from "expo-router";
import React, { Suspense, useCallback, useState } from "react";
import { FlatList, Text, View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import {
  graphql,
  usePreloadedQuery,
  useRefetchableFragment,
} from "react-relay";

import type { UserSearchFriends_viewer$key } from "@/__generated__/UserSearchFriends_viewer.graphql";
import type { UserSearchFriendsListQuery } from "@/__generated__/UserSearchFriendsListQuery.graphql";
import type { UserSearchRefetchQuery } from "@/__generated__/UserSearchRefetchQuery.graphql";
import { PrimaryTextInputControl } from "@/universe/atoms";

import { UserInviteCard } from "./UserInviteCard";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (term: string) => void;
}

const SearchBar = ({ searchQuery, onSearchChange }: SearchBarProps) => {
  const handleChange = useCallback(
    (term: string) => {
      onSearchChange(term);
    },
    [onSearchChange]
  );

  return (
    <View className="mb-sm flex w-full flex-row items-center">
      <View className="mb-md flex w-full flex-1 flex-row items-center rounded-lg bg-ivory px-sm">
        <SearchIcon width={20} />
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

interface UserSearchProps {
  queryRef: PreloadedQuery<UserSearchFriendsListQuery>;
}

export const UserSearch = ({ queryRef }: UserSearchProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const query = usePreloadedQuery<UserSearchFriendsListQuery>(
    USER_SEARCH_QUERY,
    queryRef
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

  const handleSearchChange = (term: string) => {
    setSearchQuery(term);
    refetch({ searchTerm: term }, { fetchPolicy: "store-and-network" });
  };

  return (
    <View className="flex-1 bg-white px-md">
      <View className="h-full">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        <Suspense fallback={<Text>Loading...</Text>}>
          <FlatList
            data={data?.user?.searchFriends}
            renderItem={({ item }) => <UserInviteCard fragmentRef={item} />}
            ListEmptyComponent={
              <Text className="text-center">No users found.</Text>
            }
          />
        </Suspense>
      </View>
    </View>
  );
};
