/* eslint-disable @stylistic/js/max-len */
import CrossIcon from "@assets/icons/cross.svg";
import VerifiedIcon from "@assets/icons/verified-badge.svg";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { ConnectionHandler, graphql, useFragment } from "react-relay";

import type { CommunityInvitationCard_communityInvitation$key } from "@/__generated__/CommunityInvitationCard_communityInvitation.graphql";
import { useZustStore } from "@/state";
import { OTouchable } from "@/universe/atoms/OTouchable";
import { useViewerId } from "@/users/hooks";

import { useCommunityInviteDeny } from "./hooks";

interface CommunityInvitationCardProps {
  fragmentRef: CommunityInvitationCard_communityInvitation$key;
}

export const CommunityInvitationCard = ({
  fragmentRef,
}: CommunityInvitationCardProps) => {
  const router = useRouter();
  const viewerId = useViewerId();
  const { setSelectedCommunity } = useZustStore();
  const { commitMutation } = useCommunityInviteDeny();
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
      className="z-10 flex-row items-center justify-between rounded-3xl bg-indigo p-sm"
      onPress={handleClick}
    >
      <View className="flex flex-1 flex-row items-center gap-sm">
        <View className="size-12 rounded-full border border-ivory bg-gray-400"></View>
        <View className="flex flex-col">
          <Text className="text-ivory">
            <Text className="font-bold">{invitation.inviter.firstName}</Text>{" "}
            has invited you to join
          </Text>
          <View className="flex flex-row items-center gap-sm">
            <Text className="text-2xl font-bold text-ivory">
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
      <OTouchable className="z-20" onPress={handleDeny}>
        <CrossIcon width={24} height={24} fill="ivory" />
      </OTouchable>
    </OTouchable>
  );
};
