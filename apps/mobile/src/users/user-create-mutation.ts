import { graphql } from "react-relay";

export const UserCreateMutation = graphql`
  mutation userCreateMutation($userInput: CreateUserInput!) {
    createUser(createUserInput: $userInput) {
      _id: id
      firstName
      lastName
      email
    }
  }
`;
