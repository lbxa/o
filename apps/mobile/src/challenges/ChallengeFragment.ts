import { graphql } from "react-relay";

export const CHALLENGE_FRAGMENT = graphql`
  fragment ChallengeFragment on Challenge {
    id
    name
    description
    startDate
    endDate
  }
`;
