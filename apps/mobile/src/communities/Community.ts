import { graphql } from "react-relay";

export const CommunityFragment = graphql`
  fragment CommunityFragment on Community {
    _id: id
    name
  }
`;
