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
        count: { type: "Int", defaultValue: 1 }
        cursor: { type: "String" }
      ) {
        invitations(first: $count, after: $cursor)
          @connection(key: "CommunityInvitationsAcceptList_invitations") {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...CommunityInvitationAcceptCard_invitations
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
        <View className="gap-md py-sm pb-mb flex flex-col">
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
