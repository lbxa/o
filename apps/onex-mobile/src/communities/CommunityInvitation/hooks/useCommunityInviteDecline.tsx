/* eslint-disable @stylistic/js/max-len */
import type { Disposable, UseMutationConfig } from "react-relay";
import { graphql, useMutation } from "react-relay";

import type { useCommunityInviteDecline_communityInviteDeclineMutation } from "@/__generated__/useCommunityInviteDecline_communityInviteDeclineMutation.graphql";

export const useCommunityInviteDecline = (): {
  commitMutation: (
    config: UseMutationConfig<useCommunityInviteDecline_communityInviteDeclineMutation>
  ) => Disposable;
  isMutationInFlight: boolean;
} => {
  const [commitMutation, isMutationInFlight] =
    useMutation<useCommunityInviteDecline_communityInviteDeclineMutation>(
      graphql`
        mutation useCommunityInviteDecline_communityInviteDeclineMutation(
          $inviteId: ID!
          $inviteConnections: [ID!]!
        ) {
          communityInviteDecline(inviteId: $inviteId) {
            invitationId @deleteEdge(connections: $inviteConnections)
          }
        }
      `
    );

  return { commitMutation, isMutationInFlight };
};
