import SearchIcon from "@assets/icons/search.svg";
import { PrimaryTextInputControl } from "@universe/atoms";
import debounce from "debounce";
import { Link } from "expo-router";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import {
  graphql,
  usePreloadedQuery,
  useRefetchableFragment,
} from "react-relay";

import type { UserSearchFriendsFragment$key } from "../../__generated__/UserSearchFriendsFragment.graphql";
import type { UserSearchFriendsListQuery } from "../../__generated__/UserSearchFriendsListQuery.graphql";
import type { UserSearchRefetchQuery } from "../../__generated__/UserSearchRefetchQuery.graphql";
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

export const USER_FRIENDS_LIST_QUERY = graphql`
  query UserSearchFriendsListQuery($searchTerm: String) {
    viewer {
      ...UserSearchFriendsFragment @arguments(searchTerm: $searchTerm)
    }
  }
`;

interface UserListProps {
  viewer: UserSearchFriendsFragment$key;
}
const UserList = ({ viewer }: UserListProps) => {
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [data, refetch] = useRefetchableFragment<
    UserSearchRefetchQuery,
    UserSearchFriendsFragment$key
  >(USER_FRIENDS_LIST_FRAGMENT, viewer);

  // TODO implement deboucing once flickering issue is resolved
  // const debouncedSearch = useCallback(
  //   debounce((term: string) => {
  //     startTransition(() => {
  //       refetch(
  //         { searchTerm: term },
  //         { fetchPolicy: "store-and-network", UNSTABLE_renderPolicy: "partial" }
  //       );
  //     });
  //   }, 300),
  //   []
  // );

  useEffect(() => {
    console.log("UserList mounted");
    return () => {
      console.log("UserList unmounted");
    };
  }, []);

  const handleSearchChange = useCallback(
    (term: string) => {
      setSearchQuery(term);
      refetch(
        { searchTerm: term },
        {
          fetchPolicy: "store-and-network",
          UNSTABLE_renderPolicy: "partial",
        }
      );
      // debouncedSearch(text);
    },
    [refetch]
  );

  return (
    <View className="px-md flex-1">
      <View className="h-full">
        <View className="mb-sm flex w-full flex-row items-center">
          <View className="mb-md bg-ivory px-sm flex w-full flex-1 flex-row items-center rounded-lg">
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
        {isPending && <Text className="text-center">Loading...</Text>}
        <FlatList
          data={data.user?.searchFriends}
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
      {query.viewer && <UserList viewer={query.viewer} />}
    </SafeAreaView>
  );
};
