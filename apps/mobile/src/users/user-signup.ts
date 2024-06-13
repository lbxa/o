import { graphql } from "react-relay";

export const UserFragment = graphql`
  fragment userSignupFragment on User {
    _id: id
    firstName
    lastName
    email
  }
`;

export const UserSignupMutation = graphql`
  mutation userSignupMutation($userInput: CreateUserInput!) {
    createUser(createUserInput: $userInput) {
      ...userSignupFragment
    }
  }
`;
