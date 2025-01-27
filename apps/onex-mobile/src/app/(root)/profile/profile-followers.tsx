import { Suspense, useEffect } from "react";
import { useQueryLoader } from "react-relay";

import type { FollowersListQuery } from "@/__generated__/FollowersListQuery.graphql";
import { Ozone } from "@/universe/molecules";
import { FollowersList } from "@/users/UserProfile";
import { FOLLOWERS_LIST_QUERY } from "@/users/UserProfile";
import { FollowersListSkeleton } from "@/users/UserProfile/FollowerList";

export default function ProfileFollowers() {
  const [queryRef, loadQuery, disposeQuery] =
    useQueryLoader<FollowersListQuery>(FOLLOWERS_LIST_QUERY);

  useEffect(() => {
    loadQuery({});

    return () => disposeQuery();
  }, [disposeQuery, loadQuery]);

  return (
    <Ozone>
      <Suspense fallback={<FollowersListSkeleton />}>
        {queryRef && <FollowersList queryRef={queryRef} />}
      </Suspense>
    </Ozone>
  );
}
