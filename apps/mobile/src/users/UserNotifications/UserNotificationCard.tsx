import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { ConnectionHandler, graphql, useMutation } from "react-relay";
import { useFragment } from "react-relay";

import type { UserNotificationCard_notification$key } from "@/__generated__/UserNotificationCard_notification.graphql";
import type { UserNotificationCardAcceptFriendMutation } from "@/__generated__/UserNotificationCardAcceptFriendMutation.graphql";
import type { UserNotificationCardDeclineFriendMutation } from "@/__generated__/UserNotificationCardDeclineFriendMutation.graphql";

import { OButton, OText, OTouchable } from "../../universe/atoms";
import { UserAvatar } from "../UserAvatar";
import { UserMutuals } from "./UserMutuals";

interface UserNotificationCardProps {
  fragmentRef: UserNotificationCard_notification$key;
}

export const UserNotificationCard = ({
  fragmentRef,
}: UserNotificationCardProps) => {
  const router = useRouter();
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

  return (
    <View className="mb-lg flex w-full flex-col gap-md">
      <OTouchable
        className="flex flex-row items-center gap-sm"
        onPress={() => router.push(`/(modals)/${notification.user.id}`)}
      >
        <UserAvatar user={notification.user} size="md" />
        <View className="flex flex-1 flex-col">
          <View className="flex flex-row items-center justify-between">
            <OText className="text-xl font-semibold">
              {notification.user.firstName} {notification.user.lastName}
            </OText>
            {notification.createdAt && (
              <OText className="ml-auto text-sm">
                {dayjs(notification.createdAt).fromNow()}
              </OText>
            )}
          </View>
          <UserMutuals mutuals={3} />
        </View>
      </OTouchable>
      <View className="flex w-full flex-row gap-md">
        <OButton
          title="Confirm"
          loading={isAddMutationInFlight}
          type="primary"
          className="grow"
          onPress={handleAcceptFriend}
        />
        <OButton
          title="Cancel"
          loading={isDeclineMutationInFlight}
          variant="gray"
          type="secondary"
          className="grow"
          onPress={handleDeclineFriend}
        />
      </View>
    </View>
  );
};
