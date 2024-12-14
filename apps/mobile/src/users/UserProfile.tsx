/* eslint-disable @stylistic/js/max-len */
import CameraIcon from "@assets/icons/camera.svg";
import { useState } from "react";
import { Text, View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import { graphql, useFragment, usePreloadedQuery } from "react-relay";

import type { UserProfile_updatable_userFriendship$key } from "@/__generated__/UserProfile_updatable_userFriendship.graphql";
import type { UserProfile_user$key } from "@/__generated__/UserProfile_user.graphql";
import type { UserProfile_userFriendshipStatus$key } from "@/__generated__/UserProfile_userFriendshipStatus.graphql";
import type { UserProfileQuery } from "@/__generated__/UserProfileQuery.graphql";
import type { OButtonType, OButtonVariant } from "@/universe/atoms";
import { OButton, OTouchable } from "@/universe/atoms";
import { Ozone } from "@/universe/molecules";

import { useAcceptFriend, useAddFriend } from "./mutations";
import { UserProfileStats } from "./UserProfileStats";

interface ButtonConfig {
  text: string;
  disabled: boolean;
  variant: OButtonVariant;
  type: OButtonType;
  loading?: boolean;
  onPress?: () => void;
}

export const USER_PROFILE_QUERY = graphql`
  query UserProfileQuery($userId: ID!, $viewerId: ID!) {
    userProfile(id: $userId) {
      ...UserProfile_user
    }
    getFriendshipStatus(userId: $viewerId, friendId: $userId) {
      ...UserProfile_userFriendshipStatus
    }
  }
`;

interface UserProfileProps {
  queryRef: PreloadedQuery<UserProfileQuery>;
}

export const UserProfile = ({ queryRef }: UserProfileProps) => {
  const [_, setRequestStatus] = useState<
    "pending" | "success" | "error" | null
  >(null);
  const data = usePreloadedQuery<UserProfileQuery>(
    USER_PROFILE_QUERY,
    queryRef
  );

  const [commitAddMutation, isAddMutationInFlight] = useAddFriend();
  const [commitAcceptMutation, isAcceptMutationInFlight] = useAcceptFriend();

  const user = useFragment<UserProfile_user$key>(
    graphql`
      fragment UserProfile_user on User {
        id
        firstName
        lastName
        handle
        bio
        ...UserProfileStats_user
      }
    `,
    data.userProfile
  );

  const friendshipStatus = useFragment<UserProfile_userFriendshipStatus$key>(
    graphql`
      fragment UserProfile_userFriendshipStatus on UserFriendshipStatus {
        outgoing {
          id
          status
        }
        incoming {
          id
          status
        }
        areMutualFriends
      }
    `,
    data.getFriendshipStatus
  );

  const getButtonConfig = (): ButtonConfig => {
    if (friendshipStatus?.areMutualFriends) {
      return {
        text: "Buddies",
        disabled: false,
        variant: "navy",
        type: "primary",
      };
    }

    switch (friendshipStatus?.incoming?.status) {
      case "PENDING":
        return {
          text: "Accept request",
          disabled: false,
          variant: "indigo",
          type: "secondary",
          onPress: handleAcceptFriend,
          loading: isAcceptMutationInFlight,
        };
      case "ACCEPTED":
        return {
          text: "Follow back",
          disabled: false,
          variant: "indigo",
          type: "primary",
          onPress: handleAcceptFriend,
          loading: isAcceptMutationInFlight,
        };
      default:
        break;
    }

    switch (friendshipStatus?.outgoing?.status) {
      case "PENDING":
        return {
          text: "Request Sent",
          disabled: true,
          variant: "gray",
          type: "secondary",
        };
      case "ACCEPTED":
        return {
          text: "Following",
          disabled: false,
          variant: "indigo",
          type: "primary",
        };
      default:
        break;
    }

    return {
      text: "Follow",
      disabled: false,
      variant: "indigo",
      type: "secondary",
      onPress: handleAddFriend,
      loading: isAddMutationInFlight,
    };
  };

  const handleAddFriend = () => {
    if (!user?.id) return;

    commitAddMutation({
      variables: { friendId: user.id },
      onCompleted: () => setRequestStatus("success"),
      onError: () => setRequestStatus("error"),
      updater: (proxyStore, data) => {
        if (!data?.userRequestFriendship) {
          throw new Error("Failed to add friend");
        }

        const { updatableData } =
          proxyStore.readUpdatableFragment<UserProfile_updatable_userFriendship$key>(
            graphql`
              fragment UserProfile_updatable_userFriendship on UserFriendship
              @updatable {
                id
                status
              }
            `,
            data.userRequestFriendship
          );

        updatableData.status = "PENDING";
      },
    });
  };

  const handleAcceptFriend = () => {
    if (!user?.id) return;

    commitAcceptMutation({
      variables: { friendId: user.id },
      onCompleted: () => setRequestStatus("success"),
      onError: () => setRequestStatus("error"),
    });
  };

  console.log(friendshipStatus);

  const buttonConfig = getButtonConfig();

  return (
    <Ozone>
      <View className="px-md pb-md gap-lg mx-auto flex flex-col items-center justify-center">
        <OTouchable className="mb-md flex size-[200px] rounded-full bg-gray-300">
          <View className="m-auto">
            <CameraIcon width={45} height={45} fill={"grey"} />
          </View>
        </OTouchable>
        {user && <UserProfileStats user={user} />}
        <View className="gap-sm flex flex-col items-center">
          <Text className="text-3xl font-bold">
            {user?.firstName + " " + user?.lastName}
          </Text>
          {user?.handle && <Text>{user.handle}</Text>}
          {user?.bio && <Text>{user.bio}</Text>}
        </View>
      </View>
      <View className="mt-lg px-md">
        <OButton
          title={buttonConfig.text}
          disabled={buttonConfig.disabled}
          variant={buttonConfig.variant}
          type={buttonConfig.type}
          loading={buttonConfig.loading}
          onPress={buttonConfig.onPress}
        />
      </View>
    </Ozone>
  );
};
