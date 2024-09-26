import React, { useEffect } from "react";
import { useQueryLoader } from "react-relay";

import type { UserSearchFriendsListQuery } from "../../../__generated__/UserSearchFriendsListQuery.graphql";
import { USER_FRIENDS_LIST_QUERY, UserSearch } from "../../../users/UserSearch";

export default function CommunityInviteModal() {
  const [queryRef, loadQuery, disposeQuery] =
    useQueryLoader<UserSearchFriendsListQuery>(USER_FRIENDS_LIST_QUERY);

  useEffect(() => {
    loadQuery({});

    return () => disposeQuery();
  }, [disposeQuery, loadQuery]);

  if (!queryRef) return;

  return <UserSearch queryRef={queryRef} />;
}
