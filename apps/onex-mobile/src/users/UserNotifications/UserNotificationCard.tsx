import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.locale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "1s",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1m",
    MM: "%dm",
    y: "1y",
    yy: "%dy",
  },
});

import Cross from "@assets/icons/cross.svg";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { ConnectionHandler, graphql, useMutation } from "react-relay";
import { useFragment } from "react-relay";

import type { UserNotificationCard_notification$key } from "@/__generated__/UserNotificationCard_notification.graphql";
import type { UserNotificationCardAcceptFriendMutation } from "@/__generated__/UserNotificationCardAcceptFriendMutation.graphql";
import type { UserNotificationCardDeclineFriendMutation } from "@/__generated__/UserNotificationCardDeclineFriendMutation.graphql";
import { useOTheme } from "@/utils";

import { OButton, OText, OTouchable } from "../../universe/atoms";
import { UserAvatar } from "../UserAvatar";

interface UserNotificationCardProps {
  fragmentRef: UserNotificationCard_notification$key;
}

export const UserNotificationCard = ({
  fragmentRef,
}: UserNotificationCardProps) => {
  const router = useRouter();
  const { builtInColors } = useOTheme();
  const [_, setNetworkRequestStatus] = useState<
    "pending" | "success" | "error" | undefined
  >(undefined);
  const [commitAddMutation, isAddMutationInFlight] =
    useMutation<UserNotificationCardAcceptFriendMutation>(graphql`
      mutation UserNotificationCardAcceptFriendMutation(
        $friendId: ID!
        $connections: [ID!]!
      ) {
        userAcceptFriendship(friendId: $friendId) {
          id @deleteEdge(connections: $connections)
          status
        }
      }
    `);

  const [commitDeclineMutation, isDeclineMutationInFlight] =
    useMutation<UserNotificationCardDeclineFriendMutation>(graphql`
      mutation UserNotificationCardDeclineFriendMutation(
        $friendId: ID!
        $connections: [ID!]!
      ) {
        userDeclineFriendship(friendId: $friendId) {
          id @deleteEdge(connections: $connections)
          status
        }
      }
    `);

  const notification = useFragment<UserNotificationCard_notification$key>(
    graphql`
      fragment UserNotificationCard_notification on UserFriendship {
        id
        createdAt
        friend {
          id
        }
        user {
          id
          handle
          firstName
          lastName
        }
      }
    `,
    fragmentRef
  );

  const connections = [
    ConnectionHandler.getConnectionID(
      notification.friend.id,
      "UserNotificationList_viewer_followerRequests"
    ),
  ];

  const handleAcceptFriend = () => {
    commitAddMutation({
      variables: {
        friendId: notification.user.id,
        connections,
      },
      onCompleted: () => setNetworkRequestStatus("success"),
      onError: () => setNetworkRequestStatus("error"),
    });
  };

  const handleDeclineFriend = () => {
    commitDeclineMutation({
      variables: {
        friendId: notification.user.id,
        connections,
      },
      onCompleted: () => setNetworkRequestStatus("success"),
      onError: () => setNetworkRequestStatus("error"),
    });
  };

  const fullName = [
    notification.user.firstName,
    notification.user.lastName,
  ].join(" ");

  return (
    <OTouchable
      className="mb-md gap-md flex w-full flex-col"
      onPress={() => router.push(`/(modals)/${notification.user.id}`)}
    >
      <View className="gap-sm flex flex-row items-center">
        <UserAvatar user={notification.user} size="md" />
        <View className="flex flex-1 flex-col">
          <OText className="font-semibold" numberOfLines={2}>
            {notification.user.handle ?? fullName}
            <OText className="font-normal"> wants to follow you. </OText>
            {notification.createdAt && (
              <OText className="text-sm text-gray-500 dark:text-gray-300">
                {dayjs(notification.createdAt).fromNow(true)}
              </OText>
            )}
          </OText>
          {/* <UserMutuals mutuals={3} /> */}
        </View>
        <View className="gap-sm flex flex-row items-center">
          <OButton
            title="Confirm"
            loading={isAddMutationInFlight}
            type="primary"
            onPress={handleAcceptFriend}
          />
          <OTouchable onPress={handleDeclineFriend}>
            {isDeclineMutationInFlight ? (
              <ActivityIndicator size="small" color={builtInColors.gray[500]} />
            ) : (
              <Cross width={18} height={18} fill={builtInColors.gray[500]} />
            )}
          </OTouchable>
        </View>
      </View>
    </OTouchable>
  );
};
