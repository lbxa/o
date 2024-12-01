import { useEffect } from "react";
import { useQueryLoader } from "react-relay";

import type { UserSearchFriendsListQuery } from "@/__generated__/UserSearchFriendsListQuery.graphql";
import { UserSearch } from "@/users";
import { USER_SEARCH_QUERY } from "@/users/UserSearch";

export default function ChallengeInviteModal() {
  const [queryRef, loadQuery, disposeQuery] =
    useQueryLoader<UserSearchFriendsListQuery>(USER_SEARCH_QUERY);

  useEffect(() => {
    loadQuery({ searchTerm: "" });
    return () => disposeQuery();
  }, [loadQuery, disposeQuery]);

  return queryRef ? <UserSearch queryRef={queryRef} /> : null;
}
