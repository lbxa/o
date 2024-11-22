import SearchIcon from "@assets/icons/search.svg";
import { Link } from "expo-router";
import React, { Suspense, useCallback, useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { graphql, useLazyLoadQuery, useRefetchableFragment } from "react-relay";

import type { UserSearchFriendsFragment$key } from "@/__generated__/UserSearchFriendsFragment.graphql";
import type { UserSearchFriendsListQuery } from "@/__generated__/UserSearchFriendsListQuery.graphql";
import type { UserSearchRefetchQuery } from "@/__generated__/UserSearchRefetchQuery.graphql";
import { PrimaryTextInputControl } from "@/universe/atoms";

import { UserInviteCard } from "./UserInviteCard";

const USER_FRIENDS_LIST_FRAGMENT = graphql`
  fragment UserSearchFriendsFragment on Viewer
  @refetchable(queryName: "UserSearchRefetchQuery")
  @argumentDefinitions(searchTerm: { type: "String", defaultValue: null }) {
    user {
      searchFriends(searchTerm: $searchTerm) {
        ...UserFragment
      }
    }
  }
`;

export const UserSearch = () => {
  const query = useLazyLoadQuery<UserSearchFriendsListQuery>(
    graphql`
      query UserSearchFriendsListQuery($searchTerm: String) {
        viewer {
          ...UserSearchFriendsFragment @arguments(searchTerm: $searchTerm)
        }
      }
    `,
    { searchTerm: "" }
  );

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [data, refetch] = useRefetchableFragment<
    UserSearchRefetchQuery,
    UserSearchFriendsFragment$key
  >(USER_FRIENDS_LIST_FRAGMENT, query.viewer);

  const handleSearchChange = useCallback(
    (term: string) => {
      setSearchQuery(term);
      refetch({ searchTerm: term }, { fetchPolicy: "store-and-network" });
    },
    [refetch]
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-md">
        <View className="h-full">
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
                onChangeText={handleSearchChange}
              />
              <Link href="../">Cancel</Link>
            </View>
          </View>
          <Suspense
            fallback={
              <View className="flex-1 items-center justify-center">
                <Text className="bg-red-200 text-center">Loading...</Text>
              </View>
            }
          >
            <FlatList
              data={data?.user?.searchFriends}
              renderItem={({ item }) => <UserInviteCard userFragment={item} />}
              ListEmptyComponent={
                <Text className="text-center">No users found.</Text>
              }
            />
          </Suspense>
        </View>
      </View>
    </SafeAreaView>
  );
};
