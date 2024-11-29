/* eslint-disable @stylistic/js/max-len */

import CrossIcon from "@assets/icons/cross.svg";
import { Text, View } from "react-native";
import {
  ConnectionHandler,
  graphql,
  useFragment,
  useMutation,
} from "react-relay";

import type { CommunityInvitationAcceptCard_communityInvitation$key } from "@/__generated__/CommunityInvitationAcceptCard_communityInvitation.graphql";
import type { CommunityInvitationAcceptCard_communityJoinMutation } from "@/__generated__/CommunityInvitationAcceptCard_communityJoinMutation.graphql";
import { OTouchable } from "@/universe/atoms";

interface CommunityInvitationAcceptCardProps {
  fragmentRef: CommunityInvitationAcceptCard_communityInvitation$key;
}

export const CommunityInvitationAcceptCard = ({
  fragmentRef,
}: CommunityInvitationAcceptCardProps) => {
  const [commitMutation, isMutationInFlight] =
    useMutation<CommunityInvitationAcceptCard_communityJoinMutation>(graphql`
      mutation CommunityInvitationAcceptCard_communityJoinMutation(
        $inviteId: ID!
      ) {
        communityJoin(inviteId: $inviteId) {
          communityEdge {
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
      fragment CommunityInvitationAcceptCard_communityInvitation on CommunityInvitation {
        id
        invitee {
          id
          firstName
        }
        inviter {
          id
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
      },
      // onCompleted: () => {
      //   router.replace("/(root)/community");
      // },
      updater: (proxyStore, data) => {
        if (!data?.communityJoin.communityEdge) {
          throw new Error("No community edge created");
        }

        const viewer = proxyStore.getRoot().getLinkedRecord("viewer");
        if (!viewer) {
          throw new Error("Viewer not found");
        }

        const connectionRecord = ConnectionHandler.getConnection(
          viewer,
          "CommunityList_viewer_communities"
        );

        if (!connectionRecord) {
          throw new Error("Connection record not found");
        }

        const payload = proxyStore.getRootField("communityJoin");
        const communityEdge = payload.getLinkedRecord("communityEdge");

        const newEdge = ConnectionHandler.createEdge(
          proxyStore,
          connectionRecord,
          communityEdge,
          "CommunityEdge"
        );

        ConnectionHandler.insertEdgeBefore(connectionRecord, newEdge);

        /**
         * Remove the invitations from the cache once the user accepts
         */
        // const ViewerCommunityInvitationsConnectionRecord =
        //   ConnectionHandler.getConnection(
        //     viewer,
        //     "ViewerCommunityInvitations_viewer_communityInvitations"
        //   );

        // if (!ViewerCommunityInvitationsConnectionRecord) {
        //   throw new Error(
        //     "Viewer community invitations connection record not found"
        //   );
        // }

        // ConnectionHandler.deleteNode(
        //   ViewerCommunityInvitationsConnectionRecord,
        //   invitation.id
        // );

        // const CommunityInvitationsConnectionRecord =
        //   ConnectionHandler.getConnection(
        //     viewer,
        //     "CommunityInvitations_viewer_invitations"
        //   );

        // if (!CommunityInvitationsConnectionRecord) {
        //   throw new Error("Community invitations connection record not found");
        // }

        // ConnectionHandler.deleteNode(
        //   CommunityInvitationsConnectionRecord,
        //   invitation.id
        // );
      },
    });
  };

  const handleDeny = () => {
    console.log("deny");
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
            Welcome{" "}
            <Text className="font-bold">{invitation.invitee.firstName}</Text>
          </Text>
          <Text className="text-ivory text-2xl font-bold">
            Accept invitation
          </Text>
        </View>
      </View>
      <OTouchable className="z-20" onPress={handleDeny}>
        <CrossIcon width={24} height={24} fill="ivory" />
      </OTouchable>
    </OTouchable>
  );
};
