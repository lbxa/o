import { useMemo } from "react";
import type { Disposable, UseMutationConfig } from "react-relay";
import { graphql, useMutation } from "react-relay";

import type { useChallengeActivityResultCreateMutation } from "@/__generated__/useChallengeActivityResultCreateMutation.graphql";

export const useChallengeActivityResultCreate = (): [
  (
    config: UseMutationConfig<useChallengeActivityResultCreateMutation>
  ) => Disposable,
  boolean,
] => {
  const [commitMutation, isMutationInFlight] =
    useMutation<useChallengeActivityResultCreateMutation>(graphql`
      mutation useChallengeActivityResultCreateMutation(
        $input: ChallengeActivityResultCreateInput!
      ) {
        challengeActivityResultCreate(
          challengeActivityResultCreateInput: $input
        ) {
          challengeActivityResultEdge {
            node {
              id
              result
            }
          }
        }
      }
    `);

  return useMemo(
    () => [commitMutation, isMutationInFlight],
    [commitMutation, isMutationInFlight]
  );
};
