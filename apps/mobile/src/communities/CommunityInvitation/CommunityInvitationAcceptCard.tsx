/* eslint-disable @stylistic/js/max-len */
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import {
  ConnectionHandler,
  graphql,
  useFragment,
  useMutation,
} from "react-relay";

import type { CommunityInvitationAcceptCard_communityJoinMutation } from "@/__generated__/CommunityInvitationAcceptCard_communityJoinMutation.graphql";
import type { CommunityInvitationAcceptCard_invitations$key } from "@/__generated__/CommunityInvitationAcceptCard_invitations.graphql";
import { OTouchable } from "@/universe/atoms";
import { useViewerId } from "@/users/hooks";

import { CommunityInvitationDeclineButton } from "./CommunityInvitationDeclineButton";
import { useCommunityInviteDecline } from "./hooks";

interface CommunityInvitationAcceptCardProps {
  fragmentRef: CommunityInvitationAcceptCard_invitations$key;
}

export const CommunityInvitationAcceptCard = ({
  fragmentRef,
}: CommunityInvitationAcceptCardProps) => {
  const viewerId = useViewerId();
  const router = useRouter();
  const [commitJoinMutation, isJoinMutationInFlight] =
    useMutation<CommunityInvitationAcceptCard_communityJoinMutation>(graphql`
      mutation CommunityInvitationAcceptCard_communityJoinMutation(
        $inviteId: ID!
        $inviteConnections: [ID!]!
        $communityConnections: [ID!]!
      ) {
        communityJoin(inviteId: $inviteId) {
          invitationId @deleteEdge(connections: $inviteConnections)
          communityEdge @prependEdge(connections: $communityConnections) {
            cursor
            node {
              ...CommunityCard_community
            }
          }
        }
      }
    `);

  const {
    commitMutation: commitDeclineMutation,
    isMutationInFlight: isDeclineMutationInFlight,
  } = useCommunityInviteDecline();

  const invitation = useFragment(
    graphql`
      fragment CommunityInvitationAcceptCard_invitations on CommunityInvitation {
        id
        invitee {
          id
          firstName
        }
        community {
          id
          name
        }
      }
    `,
    fragmentRef
  );

  const inviteConnections = [
    ConnectionHandler.getConnectionID(
      invitation.community.id,
      "CommunityInvitationsAcceptList_invitations"
    ),
    ConnectionHandler.getConnectionID(
      viewerId,
      "ViewerCommunityInvitationList_communityInvitations"
    ),
  ];

  const handleClick = () => {
    commitJoinMutation({
      variables: {
        inviteId: invitation.id,
        inviteConnections,
        communityConnections: [
          ConnectionHandler.getConnectionID(
            viewerId,
            "CommunityList_viewer_communities"
          ),
        ],
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const handleDeny = () => {
    return commitDeclineMutation({
      variables: {
        inviteId: invitation.id,
        inviteConnections,
      },
      onCompleted: () => {
        router.replace("/(root)/community");
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const buttonText = isJoinMutationInFlight
    ? "Accepting..."
    : isDeclineMutationInFlight
      ? "Denying..."
      : "Accept invitation";

  return (
    <OTouchable
      className="bg-indigo p-sm z-10 flex-row items-center justify-between rounded-3xl"
      onPress={handleClick}
    >
      <View className="gap-sm flex flex-1 flex-row items-center">
        <View className="border-ivory size-12 rounded-full border bg-gray-400"></View>
        <View className="flex flex-col">
          <Text className="text-ivory">
            Welcome{" "}
            <Text className="font-bold">{invitation.invitee.firstName}</Text>
          </Text>
          <Text className="text-ivory text-2xl font-bold">{buttonText}</Text>
        </View>
      </View>
      <CommunityInvitationDeclineButton onDecline={handleDeny} />
    </OTouchable>
  );
};
