/* eslint-disable @stylistic/js/max-len */
import CrossIcon from "@assets/icons/cross.svg";
import TickIcon from "@assets/icons/tick.svg";
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
      "CommunityInvitationList_communityInvitations"
    ),
  ];

  const handleJoin = () => {
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

  const handleDecline = () => {
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
    <View className="z-10 flex-row items-center justify-between rounded-3xl bg-indigo p-sm">
      <View className="flex flex-1 flex-row items-center gap-sm">
        <View className="size-12 rounded-full border border-ivory bg-gray-400"></View>
        <View className="flex flex-col">
          <Text className="text-ivory">
            Welcome{" "}
            <Text className="font-bold">{invitation.invitee.firstName}</Text>
          </Text>
          <Text className="text-2xl font-bold text-ivory">{buttonText}</Text>
        </View>
      </View>
      <View className="flex flex-row items-center gap-sm">
        <OTouchable
          className="z-20 flex size-12 flex-row items-center justify-center rounded-full bg-ivory"
          onPress={handleJoin}
        >
          <TickIcon width={26} height={26} fill="#5955eb" />
        </OTouchable>
        <OTouchable
          className="z-20 flex size-12 flex-row items-center justify-center rounded-full bg-ivory"
          onPress={handleDecline}
        >
          <CrossIcon width={26} height={26} fill="#5955eb" />
        </OTouchable>
      </View>
    </View>
  );
};
