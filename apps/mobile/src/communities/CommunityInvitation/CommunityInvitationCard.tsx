/* eslint-disable @stylistic/js/max-len */
import VerifiedIcon from "@assets/icons/verified-badge.svg";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { ConnectionHandler, graphql, useFragment } from "react-relay";

import type { CommunityInvitationCard_communityInvitation$key } from "@/__generated__/CommunityInvitationCard_communityInvitation.graphql";
import { useZustStore } from "@/state";
import { OTouchable } from "@/universe/atoms/OTouchable";
import { useViewerId } from "@/users/hooks";

import { CommunityInvitationDeclineButton } from "./CommunityInvitationDeclineButton";
import { useCommunityInviteDecline } from "./hooks";

interface CommunityInvitationCardProps {
  fragmentRef: CommunityInvitationCard_communityInvitation$key;
}

export const CommunityInvitationCard = ({
  fragmentRef,
}: CommunityInvitationCardProps) => {
  const router = useRouter();
  const viewerId = useViewerId();
  const { setSelectedCommunity } = useZustStore();
  const { commitMutation } = useCommunityInviteDecline();
  const invitation = useFragment(
    graphql`
      fragment CommunityInvitationCard_communityInvitation on CommunityInvitation {
        id
        inviter {
          id
          firstName
          lastName
        }
        community {
          id
          name
          isVerified
        }
      }
    `,
    fragmentRef
  );

  const inviteConnections = [
    ConnectionHandler.getConnectionID(
      viewerId,
      "ViewerCommunityInvitationList_communityInvitations"
    ),
  ];

  const acceptListConnection = ConnectionHandler.getConnectionID(
    invitation.community.id,
    "CommunityInvitationsAcceptList_invitations"
  );

  if (acceptListConnection) {
    inviteConnections.push(acceptListConnection);
  }

  const handleClick = () => {
    setSelectedCommunity(invitation.community);
    router.push(`/community/${invitation.community.id}`);
  };

  const handleDeny = () => {
    commitMutation({
      variables: {
        inviteId: invitation.id,
        inviteConnections,
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <OTouchable
      className="bg-indigo p-sm z-10 flex-row items-center justify-between rounded-3xl"
      onPress={handleClick}
    >
      <View className="gap-sm flex flex-1 flex-row items-center">
        <View className="border-ivory size-12 rounded-full border bg-gray-400"></View>
        <View className="flex flex-col">
          <Text className="text-ivory">
            <Text className="font-bold">{invitation.inviter.firstName}</Text>{" "}
            has invited you to join
          </Text>
          <View className="gap-sm flex flex-row items-center">
            <Text
              className="text-ivory w-10/12 text-2xl font-bold"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {invitation.community.name}
            </Text>
            <View>
              {invitation.community.isVerified && (
                <VerifiedIcon width={18} height={18} fill="ivory" />
              )}
            </View>
          </View>
        </View>
      </View>
      <CommunityInvitationDeclineButton onDecline={handleDeny} />
    </OTouchable>
  );
};
