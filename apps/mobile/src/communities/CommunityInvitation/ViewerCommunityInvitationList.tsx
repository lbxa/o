import React from "react";
import { View } from "react-native";
import { graphql, usePaginationFragment } from "react-relay";

import type { ViewerCommunityInvitationList_viewer$key } from "@/__generated__/ViewerCommunityInvitationList_viewer.graphql";
import type { ViewerCommunityInvitationsPaginationQuery } from "@/__generated__/ViewerCommunityInvitationsPaginationQuery.graphql";

import { CommunityInvitationCard } from "./CommunityInvitationCard";

interface ViewerCommunityInvitationListProps {
  fragmentRef: ViewerCommunityInvitationList_viewer$key;
}

export const ViewerCommunityInvitationList = ({
  fragmentRef,
}: ViewerCommunityInvitationListProps) => {
  const { data } = usePaginationFragment<
    ViewerCommunityInvitationsPaginationQuery,
    ViewerCommunityInvitationList_viewer$key
  >(
    graphql`
      fragment ViewerCommunityInvitationList_viewer on Viewer
      @refetchable(queryName: "ViewerCommunityInvitationsPaginationQuery")
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 5 }
        cursor: { type: "String" }
      ) {
        communityInvitations(first: $count, after: $cursor)
          @connection(
            key: "ViewerCommunityInvitations_viewer_communityInvitations"
          ) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...CommunityInvitationCard_communityInvitation
            }
          }
        }
      }
    `,
    fragmentRef
  );

  return (
    <View>
      {data.communityInvitations.edges?.length && (
        <View className="py-sm">
          {data.communityInvitations.edges.map((node) => (
            <CommunityInvitationCard
              key={node.cursor}
              fragmentRef={node.node}
            />
          ))}
        </View>
      )}
    </View>
  );
};
