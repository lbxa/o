import { Suspense, useEffect } from "react";
import { useQueryLoader } from "react-relay";

import type { ViewerProfileQuery } from "@/__generated__/ViewerProfileQuery.graphql";
import {
  VIEWER_PROFILE_QUERY,
  ViewerProfile,
  ViewerProfileSkeleton,
} from "@/users/ViewerProfile";

export default function Profile() {
  const [queryRef, loadQuery, disposeQuery] =
    useQueryLoader<ViewerProfileQuery>(VIEWER_PROFILE_QUERY);

  useEffect(() => {
    loadQuery({});
    return () => disposeQuery();
  }, [disposeQuery, loadQuery]);

  return (
    <Suspense fallback={<ViewerProfileSkeleton />}>
      {queryRef && <ViewerProfile queryRef={queryRef} />}
    </Suspense>
  );
}
