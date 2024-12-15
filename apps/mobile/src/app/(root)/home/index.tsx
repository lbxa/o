import React, { useEffect } from "react";
import { useQueryLoader } from "react-relay";

import type { HomeFeedQuery } from "@/__generated__/HomeFeedQuery.graphql";
import { AppRoot } from "@/root";
import { Ozone } from "@/universe/molecules";

import { HOME_FEED_QUERY, HomeFeed } from "../../../root/HomeFeed";

export default function Home() {
  const [queryRef, loadQuery, disposeQuery] =
    useQueryLoader<HomeFeedQuery>(HOME_FEED_QUERY);

  useEffect(() => {
    loadQuery({});
    return () => {
      disposeQuery();
    };
  }, [loadQuery, disposeQuery]);

  return (
    <AppRoot>
      <Ozone>{queryRef && <HomeFeed queryRef={queryRef} />}</Ozone>
    </AppRoot>
  );
}
