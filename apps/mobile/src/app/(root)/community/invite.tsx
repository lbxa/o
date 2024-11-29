import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQueryLoader } from "react-relay";

import type { UserSearchFriendsListQuery } from "@/__generated__/UserSearchFriendsListQuery.graphql";
import { USER_SEARCH_QUERY, UserSearch } from "@/users/UserSearch";

export default function CommunityInviteModal() {
  const [queryRef, loadQuery, disposeQuery] =
    useQueryLoader<UserSearchFriendsListQuery>(USER_SEARCH_QUERY);

  useEffect(() => {
    loadQuery({ searchTerm: "" });
    return () => disposeQuery();
  }, [loadQuery, disposeQuery]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {queryRef && <UserSearch queryRef={queryRef} />}
    </SafeAreaView>
  );
}
