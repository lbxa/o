import { useEffect } from "react";
import { useQueryLoader } from "react-relay";

import type { CommunityListQuery } from "@/__generated__/CommunityListQuery.graphql";
import { COMMUNITY_LIST_QUERY, CommunityList } from "@/communities";
import { Ozone } from "@/universe/molecules";

export default function CommunityHomeRoute() {
  const [communityListQueryRef, loadCommunityList, disposeCommunityList] =
    useQueryLoader<CommunityListQuery>(COMMUNITY_LIST_QUERY);

  useEffect(() => {
    loadCommunityList({});

    return () => disposeCommunityList();
  }, [disposeCommunityList, loadCommunityList]);

  return (
    <Ozone>
      {communityListQueryRef && (
        <CommunityList queryRef={communityListQueryRef} />
      )}
    </Ozone>
  );
}
