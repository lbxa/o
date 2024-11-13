import { useMemo } from "react";
import type { UseMutationConfig } from "react-relay";
import { graphql, useMutation } from "react-relay";

import type { ChallengeActivityResultCreateMutation } from "@/__generated__/ChallengeActivityResultCreateMutation.graphql";

const CHALLENGE_ACTIVITY_RESULT_CREATE_MUTATION = graphql`
  mutation ChallengeActivityResultCreateMutation(
    $input: ChallengeActivityResultCreateInput!
  ) {
    challengeActivityResultCreate(challengeActivityResultCreateInput: $input) {
      id
      result
    }
  }
`;

export const useChallengeActivityResultCreateMutation = (): [
  (
    config: UseMutationConfig<ChallengeActivityResultCreateMutation>
  ) => Disposable,
  boolean,
] => {
  const [commitMutation, isMutationInFlight] =
    useMutation<ChallengeActivityResultCreateMutation>(
      CHALLENGE_ACTIVITY_RESULT_CREATE_MUTATION
    );

  return useMemo(
    () => [commitMutation, isMutationInFlight],
    [commitMutation, isMutationInFlight]
  );
};
