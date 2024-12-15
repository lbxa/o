import { usePaginationFragment } from "react-relay";
import { graphql } from "react-relay";

import type { CommunityInvitationListPaginationQuery } from "@/__generated__/CommunityInvitationListPaginationQuery.graphql";
import type { useCommunityInvitationsPagination_viewer$key } from "@/__generated__/useCommunityInvitationsPagination_viewer.graphql";

export const useCommunityInvitationsPagination = (
  viewer: useCommunityInvitationsPagination_viewer$key | null | undefined
) => {
  const { data, refetch, loadNext, hasNext, isLoadingNext } =
    usePaginationFragment<
      CommunityInvitationListPaginationQuery,
      useCommunityInvitationsPagination_viewer$key
    >(
      graphql`
        fragment useCommunityInvitationsPagination_viewer on Viewer
        @refetchable(queryName: "CommunityInvitationListPaginationQuery")
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 5 }
          cursor: { type: "String" }
        ) {
          communityInvitations(first: $count, after: $cursor)
            @connection(key: "CommunityInvitationList_communityInvitations") {
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
      viewer
    );

  return { data, refetch, loadNext, hasNext, isLoadingNext };
};
