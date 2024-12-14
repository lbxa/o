import { useMemo } from "react";
import type { Disposable, UseMutationConfig } from "react-relay";
import { graphql, useMutation } from "react-relay";

import type { useAddFriendMutation } from "@/__generated__/useAddFriendMutation.graphql";

export const useAddFriend = (): [
  (config: UseMutationConfig<useAddFriendMutation>) => Disposable,
  boolean,
] => {
  const [commitMutation, isMutationInFlight] =
    useMutation<useAddFriendMutation>(graphql`
      mutation useAddFriendMutation($friendId: ID!) {
        userRequestFriendship(friendId: $friendId) {
          id
          user {
            id
          }
          friend {
            id
          }
          status
          ...UserProfile_updatable_userFriendship
        }
      }
    `);

  return useMemo(
    () => [commitMutation, isMutationInFlight],
    [commitMutation, isMutationInFlight]
  );
};
