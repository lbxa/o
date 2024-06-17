import { graphql } from "react-relay";

export const UserFragment = graphql`
  fragment UserFragment on User {
    _id: id
    firstName
    lastName
    email
  }
`;
