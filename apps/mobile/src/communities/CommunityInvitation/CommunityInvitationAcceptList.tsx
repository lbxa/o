import React from "react";
import { View } from "react-native";
import { graphql, usePaginationFragment } from "react-relay";

import type { CommunityInvitationAcceptList_community$key } from "@/__generated__/CommunityInvitationAcceptList_community.graphql";
import type { CommunityInvitationsPaginationQuery } from "@/__generated__/CommunityInvitationsPaginationQuery.graphql";

import { CommunityInvitationAcceptCard } from "./CommunityInvitationAcceptCard";

interface CommunityInvitationAcceptListProps {
  fragmentRef: CommunityInvitationAcceptList_community$key;
}

export const CommunityInvitationAcceptList = ({
  fragmentRef,
}: CommunityInvitationAcceptListProps) => {
  const { data } = usePaginationFragment<
    CommunityInvitationsPaginationQuery,
    CommunityInvitationAcceptList_community$key
  >(
    graphql`
      fragment CommunityInvitationAcceptList_community on Community
      @refetchable(queryName: "CommunityInvitationsPaginationQuery")
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 5 }
        cursor: { type: "String" }
      ) {
        invitations(first: $count, after: $cursor)
          @connection(key: "CommunityInvitations_viewer_invitations") {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...CommunityInvitationAcceptCard_communityInvitation
            }
          }
        }
      }
    `,
    fragmentRef
  );

  return (
    <View>
      {data.invitations?.edges && data.invitations.edges.length > 0 && (
        <View className="py-sm">
          {data.invitations.edges.map((node) => (
            <CommunityInvitationAcceptCard
              key={node.cursor}
              fragmentRef={node.node}
            />
          ))}
        </View>
      )}
    </View>
  );
};
