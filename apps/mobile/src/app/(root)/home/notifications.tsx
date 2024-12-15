import React, { useEffect } from "react";
import { useQueryLoader } from "react-relay";

import type { UserNotificationListQuery } from "@/__generated__/UserNotificationListQuery.graphql";
import { Ozone } from "@/universe/molecules";
import { USER_NOTIFICATION_LIST_QUERY, UserNotificationList } from "@/users";

export default function NotificationsPage() {
  const [queryRef, loadQuery, disposeQuery] =
    useQueryLoader<UserNotificationListQuery>(USER_NOTIFICATION_LIST_QUERY);

  useEffect(() => {
    loadQuery({}, { fetchPolicy: "store-and-network" });
    return () => disposeQuery();
  }, [disposeQuery, loadQuery]);

  return (
    <Ozone>{queryRef && <UserNotificationList queryRef={queryRef} />}</Ozone>
  );
}
