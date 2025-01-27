import { useMemo } from "react";
import type { Disposable, UseMutationConfig } from "react-relay";
import { graphql, useMutation } from "react-relay";

import type { useAcceptFriendMutation } from "@/__generated__/useAcceptFriendMutation.graphql";

export const useAcceptFriend = (): [
  (config: UseMutationConfig<useAcceptFriendMutation>) => Disposable,
  boolean,
] => {
  const [commitMutation, isMutationInFlight] =
    useMutation<useAcceptFriendMutation>(graphql`
      mutation useAcceptFriendMutation($friendId: ID!) {
        userAcceptFriendship(friendId: $friendId) {
          id
          user {
            id
          }
          friend {
            id
          }
          status
        }
      }
    `);

  return useMemo(
    () => [commitMutation, isMutationInFlight],
    [commitMutation, isMutationInFlight]
  );
};
