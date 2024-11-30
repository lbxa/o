/* eslint-disable @stylistic/js/max-len */
import CrossIcon from "@assets/icons/cross.svg";
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

interface CommunityInvitationAcceptCardProps {
  fragmentRef: CommunityInvitationAcceptCard_invitations$key;
}

export const CommunityInvitationAcceptCard = ({
  fragmentRef,
}: CommunityInvitationAcceptCardProps) => {
  const viewerId = useViewerId();
  const [commitMutation, isMutationInFlight] =
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

  const handleClick = () => {
    commitMutation({
      variables: {
        inviteId: invitation.id,
        inviteConnections: [
          ConnectionHandler.getConnectionID(
            invitation.community.id,
            "CommunityInvitationsAcceptList_invitations"
          ),
          ConnectionHandler.getConnectionID(
            viewerId,
            "ViewerCommunityInvitationList_communityInvitations"
          ),
        ],
        communityConnections: [
          ConnectionHandler.getConnectionID(
            viewerId,
            "CommunityList_viewer_communities"
          ),
        ],
      },
      // onCompleted: () => {
      //   router.replace("/(root)/community");
      // },
      onError: (error) => {
        console.error(error);
      },
      updater: (proxyStore, data) => {
        if (!data?.communityJoin.communityEdge) {
          throw new Error("No community edge created");
        }
      },
    });
  };

  const handleDeny = () => {
    console.log("deny");
  };

  const acceptButtonText = isMutationInFlight
    ? "Accepting..."
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
          <Text className="text-ivory text-2xl font-bold">
            {acceptButtonText}
          </Text>
        </View>
      </View>
      <OTouchable className="z-20" onPress={handleDeny}>
        <CrossIcon width={24} height={24} fill="ivory" />
      </OTouchable>
    </OTouchable>
  );
};
