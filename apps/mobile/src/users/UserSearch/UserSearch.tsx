import PaperPlaneIcon from "@assets/icons/paper-plane.svg";
import SearchIcon from "@assets/icons/search.svg";
import { PrimaryTextInputControl, Touchable } from "@universe/atoms";
import debounce from "debounce";
import { Link } from "expo-router";
import React, { startTransition, useCallback, useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import {
  graphql,
  useFragment,
  usePreloadedQuery,
  useRefetchableFragment,
} from "react-relay";

import type { UserFragment$key } from "../../__generated__/UserFragment.graphql";
import type { UserSearchFriendsFragment$key } from "../../__generated__/UserSearchFriendsFragment.graphql";
import type { UserSearchFriendsListQuery } from "../../__generated__/UserSearchFriendsListQuery.graphql";
import type { UserSearchRefetchQuery } from "../../__generated__/UserSearchRefetchQuery.graphql";
import { USER_FRAGMENT } from "../UserFragment";

const USER_FRIENDS_LIST_FRAGMENT = graphql`
  fragment UserSearchFriendsFragment on User
  @refetchable(queryName: "UserSearchRefetchQuery")
  @argumentDefinitions(search: { type: "String", defaultValue: null }) {
    searchFriends(searchTerm: $search) {
      id
      ...UserFragment
    }
  }
`;

export const USER_FRIENDS_LIST_QUERY = graphql`
  query UserSearchFriendsListQuery {
    user {
      ...UserSearchFriendsFragment
    }
  }
`;

interface UserCardProps {
  userFragment: UserFragment$key;
}

const UserInviteCard = ({ userFragment }: UserCardProps) => {
  const user = useFragment(USER_FRAGMENT, userFragment);

  return (
    <View className="mb-lg flex w-full flex-row items-center px-md">
      <View className="flex flex-1 flex-col">
        <Text>
          {user.firstName} {user.lastName}
        </Text>
        <Text>{user.handle}</Text>
      </View>
      <Touchable>
        <PaperPlaneIcon fill={"#5955eb"} />
      </Touchable>
    </View>
  );
};

interface UserListProps {
  user: UserSearchFriendsFragment$key;
}
const UserList = ({ user }: UserListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, refetch] = useRefetchableFragment<
    UserSearchRefetchQuery,
    UserSearchFriendsFragment$key
  >(USER_FRIENDS_LIST_FRAGMENT, user);

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      startTransition(() => {
        refetch({ search: term }, { UNSTABLE_renderPolicy: "partial" });
      });
    }, 300),
    [refetch]
  );

  const handleSearchChange = useCallback(
    (text: string) => {
      setSearchQuery(text);
      debouncedSearch(text);
    },
    [debouncedSearch]
  );

  return (
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
              onChangeText={handleSearchChange}
            />
            <Link href="../">Cancel</Link>
          </View>
        </View>
        <FlatList
          data={data.searchFriends}
          renderItem={({ item }) => <UserInviteCard userFragment={item} />}
        />
      </View>
    </View>
  );
};

interface UserSearchProps {
  queryRef: PreloadedQuery<UserSearchFriendsListQuery>;
}

export const UserSearch = ({ queryRef }: UserSearchProps) => {
  const query = usePreloadedQuery<UserSearchFriendsListQuery>(
    USER_FRIENDS_LIST_QUERY,
    queryRef
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <UserList user={query.user} />
    </SafeAreaView>
  );
};
