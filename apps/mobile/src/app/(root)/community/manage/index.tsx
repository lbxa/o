import { Suspense, useEffect } from "react";
import { useQueryLoader } from "react-relay";

import type { CommunityManageQuery } from "@/__generated__/CommunityManageQuery.graphql";
import {
  COMMUNITY_MANAGE_QUERY,
  CommunityManage,
} from "@/communities/CommunityRoot/CommunityManage";
import { CommunityManageSkeleton } from "@/communities/CommunityRoot/CommunityManage";
import { useZustStore } from "@/state";

export default function CommunityManagePage() {
  const communityId = useZustStore((state) => state.selectedCommunity?.id);
  const [queryRef, loadQuery, disposeQuery] =
    useQueryLoader<CommunityManageQuery>(COMMUNITY_MANAGE_QUERY);

  useEffect(() => {
    if (communityId) {
      loadQuery({ communityId });
    }
    return () => disposeQuery();
  }, [communityId, disposeQuery, loadQuery]);

  return (
    <Suspense fallback={<CommunityManageSkeleton />}>
      {queryRef && <CommunityManage queryRef={queryRef} />}
    </Suspense>
  );
}
