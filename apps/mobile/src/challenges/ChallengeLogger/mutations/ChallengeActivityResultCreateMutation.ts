import { graphql } from "react-relay";

export const CHALLENGE_ACTIVITY_RESULT_CREATE_MUTATION = graphql`
  mutation ChallengeActivityResultCreateMutation(
    $input: ChallengeActivityResultCreateInput!
  ) {
    challengeActivityResultCreate(challengeActivityResultCreateInput: $input) {
      challengeActivityResultEdge {
        node {
          id
          result
        }
      }
    }
  }
`;
