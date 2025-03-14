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

import { OButton, OText, OTouchable, Timestamp } from "../../universe/atoms";
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
          avatarUrl
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
      className="mb-md flex w-full flex-col gap-md"
      onPress={() => router.push(`/(modals)/${notification.user.id}`)}
    >
      <View className="flex flex-row items-center gap-sm">
        <UserAvatar user={notification.user} size="md" />
        <View className="flex flex-1 flex-col">
          <OText className="font-semibold" numberOfLines={2}>
            {notification.user.handle ?? fullName}
            <OText className="font-normal"> wants to follow you. </OText>
            {notification.createdAt && (
              <Timestamp timestamp={notification.createdAt} size="sm" />
            )}
          </OText>
          {/* <UserMutuals mutuals={3} /> */}
        </View>
        <View className="flex flex-row items-center gap-sm">
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
