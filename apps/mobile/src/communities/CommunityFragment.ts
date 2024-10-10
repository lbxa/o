import { graphql } from "react-relay";

export const COMMUNITY_FRAGMENT = graphql`
  fragment CommunityFragment on Community {
    id
    name
    isVerified
  }
`;
