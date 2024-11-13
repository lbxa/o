import { graphql } from "react-relay";

export const CHALLENGE_ACTIVITY_FRAGMENT = graphql`
  fragment ChallengeActivityFragment on ChallengeActivity {
    id
    type
    measurement
    goal
    unit
    target
  }
`;
