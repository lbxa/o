import { graphql } from "react-relay";

export const USER_FRAGMENT = graphql`
  fragment UserFragment on User {
    id
    firstName
    lastName
    email
    handle
  }
`;
