import { InvitationStatus } from "@o/api-gql";
import { useMemo, useState } from "react";
import { View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import {
  graphql,
  useFragment,
  useMutation,
  usePreloadedQuery,
} from "react-relay";

import type { UserProfile_user$key } from "@/__generated__/UserProfile_user.graphql";
import type { UserProfile_userFriendshipStatus$key } from "@/__generated__/UserProfile_userFriendshipStatus.graphql";
import type { UserProfileAddFriendMutation } from "@/__generated__/UserProfileAddFriendMutation.graphql";
import type { UserProfileQuery } from "@/__generated__/UserProfileQuery.graphql";
import type { OButtonType, OButtonVariant } from "@/universe/atoms";
import { OButton, OText } from "@/universe/atoms";
import { Ozone } from "@/universe/molecules";

import { UserAvatar } from "../UserAvatar";
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
  const [_, setNetworkRequestStatus] = useState<
    "pending" | "success" | "error" | undefined
  >(undefined);

  const [requestStatus, setRequestStatus] = useState<
    InvitationStatus | undefined
  >(undefined);

  const data = usePreloadedQuery<UserProfileQuery>(
    USER_PROFILE_QUERY,
    queryRef
  );

  const [commitAddMutation, isAddMutationInFlight] =
    useMutation<UserProfileAddFriendMutation>(graphql`
      mutation UserProfileAddFriendMutation($friendId: ID!) {
        userRequestFriendship(friendId: $friendId) {
          id
          status
        }
      }
    `);

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
        areMutualFriends
      }
    `,
    data.getFriendshipStatus
  );

  const getButtonConfig = (status?: InvitationStatus): ButtonConfig => {
    const statusChoice = status ?? friendshipStatus?.outgoing?.status;

    if (friendshipStatus?.areMutualFriends) {
      return {
        text: "Buddies",
        disabled: false,
        variant: "navy",
        type: "primary",
      };
    }

    // This doesn't make sense here since its third-person
    // view on another user's profile
    // switch (friendshipStatus?.incoming?.status) {
    //   case "PENDING":
    //     return {
    //       text: "Accept request",
    //       disabled: false,
    //       variant: "indigo",
    //       type: "secondary",
    //       onPress: handleAcceptFriend,
    //       loading: isAcceptMutationInFlight,
    //     };
    //   case "ACCEPTED":
    //     return {
    //       text: "Follow back",
    //       disabled: false,
    //       variant: "indigo",
    //       type: "primary",
    //       onPress: handleAcceptFriend,
    //       loading: isAcceptMutationInFlight,
    //     };
    //   default:
    //     break;
    // }

    switch (statusChoice) {
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
      onCompleted: () => setNetworkRequestStatus("success"),
      onError: () => setNetworkRequestStatus("error"),
      updater: (proxyStore, data) => {
        if (data?.userRequestFriendship) {
          setRequestStatus(InvitationStatus.Pending);
        }
      },
    });
  };

  const buttonConfig = useMemo(
    () => getButtonConfig(requestStatus),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      friendshipStatus?.outgoing?.status,
      friendshipStatus?.areMutualFriends,
      isAddMutationInFlight,
      requestStatus,
    ]
  );

  return (
    <Ozone>
      <View className="gap-lg px-md pb-md mx-auto flex flex-col items-center justify-center">
        {user && <UserAvatar user={user} className="mb-md" size="lg" />}
        {user && <UserProfileStats user={user} />}
        <View className="gap-sm flex flex-col items-center">
          <OText className="text-3xl font-bold">
            {user?.firstName} {user?.lastName}
          </OText>
          {user?.handle && <OText>{user.handle}</OText>}
          {user?.bio && <OText>{user.bio}</OText>}
        </View>
      </View>
      <View className="mt-md px-md">
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
