/* eslint-disable @stylistic/js/max-len */
import type { Disposable, UseMutationConfig } from "react-relay";
import { graphql, useMutation } from "react-relay";

import type { useCommunityInviteDeny_communityInviteDenyMutation } from "@/__generated__/useCommunityInviteDeny_communityInviteDenyMutation.graphql";

export const useCommunityInviteDeny = (): {
  commitMutation: (
    config: UseMutationConfig<useCommunityInviteDeny_communityInviteDenyMutation>
  ) => Disposable;
  isMutationInFlight: boolean;
} => {
  const [commitMutation, isMutationInFlight] =
    useMutation<useCommunityInviteDeny_communityInviteDenyMutation>(graphql`
      mutation useCommunityInviteDeny_communityInviteDenyMutation(
        $inviteId: ID!
        $inviteConnections: [ID!]!
      ) {
        communityInviteDeny(inviteId: $inviteId) {
          invitationId @deleteEdge(connections: $inviteConnections)
        }
      }
    `);

  return { commitMutation, isMutationInFlight };
};
