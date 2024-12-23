import { Suspense, useEffect } from "react";
import { useQueryLoader } from "react-relay";

import type { UserManageQuery } from "@/__generated__/UserManageQuery.graphql";
import { USER_MANAGE_QUERY, UserManage } from "@/users";
import { UserManageSkeleton } from "@/users/UserRoot/UserManage/UserManage.skeleton";

export default function CommunityManageRoute() {
  const [queryRef, loadQuery, disposeQuery] =
    useQueryLoader<UserManageQuery>(USER_MANAGE_QUERY);

  useEffect(() => {
    loadQuery({});
    return () => disposeQuery();
  }, [disposeQuery, loadQuery]);

  return (
    <Suspense fallback={<UserManageSkeleton />}>
      {queryRef && <UserManage queryRef={queryRef} />}
    </Suspense>
  );
}
