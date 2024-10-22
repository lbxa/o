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
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  mutation ChallengeCreateMutation(\n    $challengeCreateInput: ChallengeCreateInput!\n  ) {\n    challengeCreate(challengeCreateInput: $challengeCreateInput) {\n      name\n      description\n    }\n  }\n": types.ChallengeCreateMutationDocument,
    "\n  fragment ChallengeFragment on Challenge {\n    id\n    name\n    description\n    startDate\n    endDate\n  }\n": types.ChallengeFragmentFragmentDoc,
    "\n  query ChallengeDetailsQuery($id: ID!) {\n    challenge(id: $id) {\n      name\n      ...ChallengeFragment\n    }\n  }\n": types.ChallengeDetailsQueryDocument,
    "\n  mutation CommunityCreateMutation(\n    $communityCreateInput: CommunityCreateInput!\n  ) {\n    communityCreate(communityCreateInput: $communityCreateInput) {\n      name\n      isPublic\n    }\n  }\n": types.CommunityCreateMutationDocument,
    "\n  fragment CommunityFragment on Community {\n    id\n    name\n    isVerified\n  }\n": types.CommunityFragmentFragmentDoc,
    "\n  fragment CommunityListFragment on Viewer\n  @refetchable(queryName: \"CommunityListRefetchQuery\") {\n    communities {\n      ...CommunityFragment\n    }\n  }\n": types.CommunityListFragmentFragmentDoc,
    "\n  query CommunityListQuery {\n    viewer {\n      ...CommunityListFragment\n    }\n  }\n": types.CommunityListQueryDocument,
    "\n  fragment CommunityChallenges_challenges on Viewer\n  @refetchable(queryName: \"CommunityChallengesRefreshQuery\")\n  @argumentDefinitions(communityId: { type: \"ID!\" }) {\n    challenges(communityId: $communityId) {\n      ...ChallengeFragment\n    }\n  }\n": types.CommunityChallenges_ChallengesFragmentDoc,
    "\n  query CommunityDetailsQuery($id: ID!) {\n    community(id: $id) {\n      name\n      ...CommunityFragment\n    }\n  }\n": types.CommunityDetailsQueryDocument,
    "\n  query CommunityRootQuery($communityId: ID!) {\n    # community(id: $communityId) {\n    #   ...CommunityChallenges_community\n    # }\n    viewer {\n      ...CommunityChallenges_challenges @arguments(communityId: $communityId)\n    }\n  }\n": types.CommunityRootQueryDocument,
    "\n  query CommunitySearchQuery($id: ID!) {\n    community(id: $id) {\n      ...CommunityFragment\n    }\n  }\n": types.CommunitySearchQueryDocument,
    "\n  query UserCreateValidateEmailQuery($email: String!) {\n    userValidateEmail(email: $email) {\n      alreadyTaken\n    }\n  }\n": types.UserCreateValidateEmailQueryDocument,
    "\n  mutation UserCreateMutation($userInput: AuthCreateUserInput!) {\n    authCreateUser(authCreateUserInput: $userInput) {\n      user {\n        ...UserFragment\n      }\n      accessToken\n    }\n  }\n": types.UserCreateMutationDocument,
    "\n  fragment UserFragment on User {\n    id\n    firstName\n    lastName\n    email\n    handle\n  }\n": types.UserFragmentFragmentDoc,
    "\n  mutation UserLoginMutation($authLoginInput: AuthLoginInput!) {\n    authLogin(authLoginInput: $authLoginInput) {\n      accessToken\n      refreshToken\n      user {\n        firstName\n        lastName\n        email\n      }\n    }\n  }\n": types.UserLoginMutationDocument,
    "\n  mutation UserInviteCardMutation($userId: ID!, $communityId: ID!) {\n    communityInvite(userId: $userId, communityId: $communityId)\n  }\n": types.UserInviteCardMutationDocument,
    "\n  fragment UserSearchFriendsFragment on Viewer\n  @refetchable(queryName: \"UserSearchRefetchQuery\")\n  @argumentDefinitions(searchTerm: { type: \"String\", defaultValue: null }) {\n    user {\n      searchFriends(searchTerm: $searchTerm) {\n        ...UserFragment\n      }\n    }\n  }\n": types.UserSearchFriendsFragmentFragmentDoc,
    "\n  query UserSearchFriendsListQuery($searchTerm: String) {\n    viewer {\n      ...UserSearchFriendsFragment @arguments(searchTerm: $searchTerm)\n    }\n  }\n": types.UserSearchFriendsListQueryDocument,
    "\n  query ViewerQuery {\n    viewer {\n      ...ViewerFragment\n    }\n  }\n": types.ViewerQueryDocument,
    "\n  fragment ViewerFragment on Viewer\n  @refetchable(queryName: \"ViewerRefetchQuery\") {\n    user {\n      ...UserFragment\n    }\n  }\n": types.ViewerFragmentFragmentDoc,
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
export function graphql(source: "\n  mutation ChallengeCreateMutation(\n    $challengeCreateInput: ChallengeCreateInput!\n  ) {\n    challengeCreate(challengeCreateInput: $challengeCreateInput) {\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  mutation ChallengeCreateMutation(\n    $challengeCreateInput: ChallengeCreateInput!\n  ) {\n    challengeCreate(challengeCreateInput: $challengeCreateInput) {\n      name\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ChallengeFragment on Challenge {\n    id\n    name\n    description\n    startDate\n    endDate\n  }\n"): (typeof documents)["\n  fragment ChallengeFragment on Challenge {\n    id\n    name\n    description\n    startDate\n    endDate\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ChallengeDetailsQuery($id: ID!) {\n    challenge(id: $id) {\n      name\n      ...ChallengeFragment\n    }\n  }\n"): (typeof documents)["\n  query ChallengeDetailsQuery($id: ID!) {\n    challenge(id: $id) {\n      name\n      ...ChallengeFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CommunityCreateMutation(\n    $communityCreateInput: CommunityCreateInput!\n  ) {\n    communityCreate(communityCreateInput: $communityCreateInput) {\n      name\n      isPublic\n    }\n  }\n"): (typeof documents)["\n  mutation CommunityCreateMutation(\n    $communityCreateInput: CommunityCreateInput!\n  ) {\n    communityCreate(communityCreateInput: $communityCreateInput) {\n      name\n      isPublic\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CommunityFragment on Community {\n    id\n    name\n    isVerified\n  }\n"): (typeof documents)["\n  fragment CommunityFragment on Community {\n    id\n    name\n    isVerified\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CommunityListFragment on Viewer\n  @refetchable(queryName: \"CommunityListRefetchQuery\") {\n    communities {\n      ...CommunityFragment\n    }\n  }\n"): (typeof documents)["\n  fragment CommunityListFragment on Viewer\n  @refetchable(queryName: \"CommunityListRefetchQuery\") {\n    communities {\n      ...CommunityFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CommunityListQuery {\n    viewer {\n      ...CommunityListFragment\n    }\n  }\n"): (typeof documents)["\n  query CommunityListQuery {\n    viewer {\n      ...CommunityListFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CommunityChallenges_challenges on Viewer\n  @refetchable(queryName: \"CommunityChallengesRefreshQuery\")\n  @argumentDefinitions(communityId: { type: \"ID!\" }) {\n    challenges(communityId: $communityId) {\n      ...ChallengeFragment\n    }\n  }\n"): (typeof documents)["\n  fragment CommunityChallenges_challenges on Viewer\n  @refetchable(queryName: \"CommunityChallengesRefreshQuery\")\n  @argumentDefinitions(communityId: { type: \"ID!\" }) {\n    challenges(communityId: $communityId) {\n      ...ChallengeFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CommunityDetailsQuery($id: ID!) {\n    community(id: $id) {\n      name\n      ...CommunityFragment\n    }\n  }\n"): (typeof documents)["\n  query CommunityDetailsQuery($id: ID!) {\n    community(id: $id) {\n      name\n      ...CommunityFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CommunityRootQuery($communityId: ID!) {\n    # community(id: $communityId) {\n    #   ...CommunityChallenges_community\n    # }\n    viewer {\n      ...CommunityChallenges_challenges @arguments(communityId: $communityId)\n    }\n  }\n"): (typeof documents)["\n  query CommunityRootQuery($communityId: ID!) {\n    # community(id: $communityId) {\n    #   ...CommunityChallenges_community\n    # }\n    viewer {\n      ...CommunityChallenges_challenges @arguments(communityId: $communityId)\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CommunitySearchQuery($id: ID!) {\n    community(id: $id) {\n      ...CommunityFragment\n    }\n  }\n"): (typeof documents)["\n  query CommunitySearchQuery($id: ID!) {\n    community(id: $id) {\n      ...CommunityFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserCreateValidateEmailQuery($email: String!) {\n    userValidateEmail(email: $email) {\n      alreadyTaken\n    }\n  }\n"): (typeof documents)["\n  query UserCreateValidateEmailQuery($email: String!) {\n    userValidateEmail(email: $email) {\n      alreadyTaken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UserCreateMutation($userInput: AuthCreateUserInput!) {\n    authCreateUser(authCreateUserInput: $userInput) {\n      user {\n        ...UserFragment\n      }\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation UserCreateMutation($userInput: AuthCreateUserInput!) {\n    authCreateUser(authCreateUserInput: $userInput) {\n      user {\n        ...UserFragment\n      }\n      accessToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserFragment on User {\n    id\n    firstName\n    lastName\n    email\n    handle\n  }\n"): (typeof documents)["\n  fragment UserFragment on User {\n    id\n    firstName\n    lastName\n    email\n    handle\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UserLoginMutation($authLoginInput: AuthLoginInput!) {\n    authLogin(authLoginInput: $authLoginInput) {\n      accessToken\n      refreshToken\n      user {\n        firstName\n        lastName\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UserLoginMutation($authLoginInput: AuthLoginInput!) {\n    authLogin(authLoginInput: $authLoginInput) {\n      accessToken\n      refreshToken\n      user {\n        firstName\n        lastName\n        email\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UserInviteCardMutation($userId: ID!, $communityId: ID!) {\n    communityInvite(userId: $userId, communityId: $communityId)\n  }\n"): (typeof documents)["\n  mutation UserInviteCardMutation($userId: ID!, $communityId: ID!) {\n    communityInvite(userId: $userId, communityId: $communityId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserSearchFriendsFragment on Viewer\n  @refetchable(queryName: \"UserSearchRefetchQuery\")\n  @argumentDefinitions(searchTerm: { type: \"String\", defaultValue: null }) {\n    user {\n      searchFriends(searchTerm: $searchTerm) {\n        ...UserFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment UserSearchFriendsFragment on Viewer\n  @refetchable(queryName: \"UserSearchRefetchQuery\")\n  @argumentDefinitions(searchTerm: { type: \"String\", defaultValue: null }) {\n    user {\n      searchFriends(searchTerm: $searchTerm) {\n        ...UserFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserSearchFriendsListQuery($searchTerm: String) {\n    viewer {\n      ...UserSearchFriendsFragment @arguments(searchTerm: $searchTerm)\n    }\n  }\n"): (typeof documents)["\n  query UserSearchFriendsListQuery($searchTerm: String) {\n    viewer {\n      ...UserSearchFriendsFragment @arguments(searchTerm: $searchTerm)\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ViewerQuery {\n    viewer {\n      ...ViewerFragment\n    }\n  }\n"): (typeof documents)["\n  query ViewerQuery {\n    viewer {\n      ...ViewerFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ViewerFragment on Viewer\n  @refetchable(queryName: \"ViewerRefetchQuery\") {\n    user {\n      ...UserFragment\n    }\n  }\n"): (typeof documents)["\n  fragment ViewerFragment on Viewer\n  @refetchable(queryName: \"ViewerRefetchQuery\") {\n    user {\n      ...UserFragment\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;