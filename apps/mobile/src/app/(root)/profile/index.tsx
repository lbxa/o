import { useEffect } from "react";
import { useQueryLoader } from "react-relay";

import type { ViewerProfileQuery } from "@/__generated__/ViewerProfileQuery.graphql";
import { VIEWER_PROFILE_QUERY, ViewerProfile } from "@/users";

export default function Profile() {
  const [queryRef, loadQuery, disposeQuery] =
    useQueryLoader<ViewerProfileQuery>(VIEWER_PROFILE_QUERY);

  useEffect(() => {
    loadQuery({});
    return () => disposeQuery();
  }, [loadQuery, disposeQuery]);

  return queryRef && <ViewerProfile queryRef={queryRef} />;
}
