/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment CommunityFragment on Community {\n    _id: id\n    name\n  }\n": types.CommunityFragmentFragmentDoc,
    "\n  mutation CommunityCreateMutation(\n    $communityCreateInput: CommunityCreateInput!\n  ) {\n    communityCreate(communityCreateInput: $communityCreateInput) {\n      name\n    }\n  }\n": types.CommunityCreateMutationDocument,
    "\n  fragment UserFragment on User {\n    _id: id\n    firstName\n    lastName\n    email\n  }\n": types.UserFragmentFragmentDoc,
    "\n  query UserCreateValidateEmailQuery($email: String!) {\n    userValidateEmail(email: $email) {\n      alreadyTaken\n    }\n  }\n": types.UserCreateValidateEmailQueryDocument,
    "\n  mutation UserCreateMutation($userInput: AuthCreateUserInput!) {\n    authCreateUser(authCreateUserInput: $userInput) {\n      user {\n        ...UserFragment\n      }\n    }\n  }\n": types.UserCreateMutationDocument,
    "\n  mutation UserLoginMutation($authLoginInput: AuthLoginInput!) {\n    authLogin(authLoginInput: $authLoginInput) {\n      accessToken\n      refreshToken\n    }\n  }\n": types.UserLoginMutationDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CommunityFragment on Community {\n    _id: id\n    name\n  }\n"): (typeof documents)["\n  fragment CommunityFragment on Community {\n    _id: id\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CommunityCreateMutation(\n    $communityCreateInput: CommunityCreateInput!\n  ) {\n    communityCreate(communityCreateInput: $communityCreateInput) {\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CommunityCreateMutation(\n    $communityCreateInput: CommunityCreateInput!\n  ) {\n    communityCreate(communityCreateInput: $communityCreateInput) {\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserFragment on User {\n    _id: id\n    firstName\n    lastName\n    email\n  }\n"): (typeof documents)["\n  fragment UserFragment on User {\n    _id: id\n    firstName\n    lastName\n    email\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserCreateValidateEmailQuery($email: String!) {\n    userValidateEmail(email: $email) {\n      alreadyTaken\n    }\n  }\n"): (typeof documents)["\n  query UserCreateValidateEmailQuery($email: String!) {\n    userValidateEmail(email: $email) {\n      alreadyTaken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UserCreateMutation($userInput: AuthCreateUserInput!) {\n    authCreateUser(authCreateUserInput: $userInput) {\n      user {\n        ...UserFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UserCreateMutation($userInput: AuthCreateUserInput!) {\n    authCreateUser(authCreateUserInput: $userInput) {\n      user {\n        ...UserFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UserLoginMutation($authLoginInput: AuthLoginInput!) {\n    authLogin(authLoginInput: $authLoginInput) {\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation UserLoginMutation($authLoginInput: AuthLoginInput!) {\n    authLogin(authLoginInput: $authLoginInput) {\n      accessToken\n      refreshToken\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;