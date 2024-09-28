/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date custom scalar type */
  DateTime: { input: any; output: any; }
};

export type AuthCreateUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type AuthCreateUserResponse = {
  __typename?: 'AuthCreateUserResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: User;
};

export type AuthLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type AuthLoginResponse = {
  __typename?: 'AuthLoginResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: User;
};

export type Challenge = Node & Timestampable & {
  __typename?: 'Challenge';
  community: Community;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  invitations?: Maybe<Array<ChallengeInvitation>>;
  members?: Maybe<Array<User>>;
  memberships?: Maybe<Array<ChallengeMembership>>;
  name: Scalars['String']['output'];
  startDate: Scalars['DateTime']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ChallengeCreateInput = {
  communityId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  endDate: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
  startDate: Scalars['DateTime']['input'];
};

export type ChallengeInvitation = Node & Timestampable & {
  __typename?: 'ChallengeInvitation';
  challenge: Challenge;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  invitee: User;
  inviter: User;
  status: InvitationStatus;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ChallengeMembership = Node & {
  __typename?: 'ChallengeMembership';
  challenge: Challenge;
  community: Community;
  id: Scalars['ID']['output'];
  joinedAt: Scalars['DateTime']['output'];
  user: User;
};

export type ChallengeUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Community = Node & Timestampable & {
  __typename?: 'Community';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  invitations?: Maybe<Array<CommunityInvitation>>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  members?: Maybe<Array<User>>;
  memberships?: Maybe<Array<CommunityMembership>>;
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type CommunityCreateInput = {
  isPublic: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type CommunityInvitation = Node & Timestampable & {
  __typename?: 'CommunityInvitation';
  community: Community;
  createdAt: Scalars['DateTime']['output'];
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  invitee: User;
  inviter: User;
  status: InvitationStatus;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CommunityMembership = Node & {
  __typename?: 'CommunityMembership';
  community: Community;
  id: Scalars['ID']['output'];
  isAdmin: Scalars['Boolean']['output'];
  joinedAt: Scalars['DateTime']['output'];
  user: User;
};

export type CommunityUpdateInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export enum InvitationStatus {
  Accepted = 'ACCEPTED',
  Declined = 'DECLINED',
  Pending = 'PENDING'
}

export type Mutation = {
  __typename?: 'Mutation';
  authCreateUser: AuthCreateUserResponse;
  authLogin: AuthLoginResponse;
  authLogout: Scalars['Boolean']['output'];
  authRefreshTokens: Tokens;
  challengeCreate: Challenge;
  challengeDelete: Scalars['Boolean']['output'];
  challengeInvite: Scalars['Boolean']['output'];
  challengeJoin: Challenge;
  challengeLeave: Scalars['Boolean']['output'];
  challengeUpdate: Challenge;
  communityCreate: Community;
  communityDelete: Scalars['Boolean']['output'];
  communityInvite: Scalars['Boolean']['output'];
  communityJoin: Community;
  communityLeave: Scalars['Boolean']['output'];
  communityUpdate: Community;
  userUpdate: User;
};


export type MutationAuthCreateUserArgs = {
  authCreateUserInput: AuthCreateUserInput;
};


export type MutationAuthLoginArgs = {
  authLoginInput: AuthLoginInput;
};


export type MutationAuthLogoutArgs = {
  id: Scalars['Int']['input'];
};


export type MutationChallengeCreateArgs = {
  challengeCreateInput: ChallengeCreateInput;
};


export type MutationChallengeDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationChallengeInviteArgs = {
  challengeId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationChallengeJoinArgs = {
  inviteId: Scalars['ID']['input'];
};


export type MutationChallengeLeaveArgs = {
  id: Scalars['ID']['input'];
};


export type MutationChallengeUpdateArgs = {
  challengeUpdateInput: ChallengeUpdateInput;
};


export type MutationCommunityCreateArgs = {
  communityCreateInput: CommunityCreateInput;
};


export type MutationCommunityDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCommunityInviteArgs = {
  communityId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationCommunityJoinArgs = {
  inviteId: Scalars['Int']['input'];
};


export type MutationCommunityLeaveArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCommunityUpdateArgs = {
  communityUpdateInput: CommunityUpdateInput;
};


export type MutationUserUpdateArgs = {
  userUpdateInput: UserUpdateInput;
};

export type Node = {
  id: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  challenge?: Maybe<Challenge>;
  challengeInvitations?: Maybe<Array<ChallengeInvitation>>;
  challenges?: Maybe<Array<Challenge>>;
  communities?: Maybe<Array<Community>>;
  community?: Maybe<Community>;
  communityChallenges?: Maybe<Array<Challenge>>;
  communityInvitations?: Maybe<Array<Community>>;
  health: Scalars['String']['output'];
  node?: Maybe<Node>;
  userChallenges?: Maybe<Array<Challenge>>;
  userCommunities?: Maybe<Array<Community>>;
  userSearch?: Maybe<Array<User>>;
  userValidateEmail?: Maybe<ValidEmailResponse>;
  users?: Maybe<Array<User>>;
  viewer?: Maybe<Viewer>;
};


export type QueryChallengeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryChallengeInvitationsArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryCommunityArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCommunityChallengesArgs = {
  communityId: Scalars['ID']['input'];
};


export type QueryCommunityInvitationsArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserChallengesArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryUserCommunitiesArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryUserSearchArgs = {
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserValidateEmailArgs = {
  email: Scalars['String']['input'];
};

export type Timestampable = {
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Tokens = {
  __typename?: 'Tokens';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type User = Node & Timestampable & {
  __typename?: 'User';
  communities?: Maybe<Array<Community>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  friends?: Maybe<Array<User>>;
  handle?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  memberships?: Maybe<Array<CommunityMembership>>;
  password?: Maybe<Scalars['String']['output']>;
  receivedInvitations?: Maybe<Array<CommunityInvitation>>;
  searchFriends?: Maybe<Array<User>>;
  sentInvitations?: Maybe<Array<CommunityInvitation>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type UserSearchFriendsArgs = {
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};

export type UserUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  handle?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
};

export type ValidEmailResponse = {
  __typename?: 'ValidEmailResponse';
  alreadyTaken: Scalars['Boolean']['output'];
};

export type Viewer = {
  __typename?: 'Viewer';
  user?: Maybe<User>;
};

export type CommunityDetailsQueryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CommunityDetailsQueryQuery = { __typename?: 'Query', community?: (
    { __typename?: 'Community' }
    & { ' $fragmentRefs'?: { 'CommunityFragmentFragment': CommunityFragmentFragment } }
  ) | null };

export type ChallengeCreateMutationMutationVariables = Exact<{
  challengeCreateInput: ChallengeCreateInput;
}>;


export type ChallengeCreateMutationMutation = { __typename?: 'Mutation', challengeCreate: { __typename?: 'Challenge', name: string, description?: string | null } };

export type CommunityCreateMutationMutationVariables = Exact<{
  communityCreateInput: CommunityCreateInput;
}>;


export type CommunityCreateMutationMutation = { __typename?: 'Mutation', communityCreate: { __typename?: 'Community', name: string, isPublic?: boolean | null } };

export type CommunityFragmentFragment = { __typename?: 'Community', id: string, name: string } & { ' $fragmentName'?: 'CommunityFragmentFragment' };

export type CommunityList__QueryFragment = { __typename?: 'Query', communities?: Array<(
    { __typename?: 'Community' }
    & { ' $fragmentRefs'?: { 'CommunityFragmentFragment': CommunityFragmentFragment } }
  )> | null } & { ' $fragmentName'?: 'CommunityList__QueryFragment' };

export type CommunityListQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type CommunityListQueryQuery = (
  { __typename?: 'Query' }
  & { ' $fragmentRefs'?: { 'CommunityList__QueryFragment': CommunityList__QueryFragment } }
);

export type CommunitySearchQueryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CommunitySearchQueryQuery = { __typename?: 'Query', community?: (
    { __typename?: 'Community' }
    & { ' $fragmentRefs'?: { 'CommunityFragmentFragment': CommunityFragmentFragment } }
  ) | null };

export type UserCreateValidateEmailQueryQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type UserCreateValidateEmailQueryQuery = { __typename?: 'Query', userValidateEmail?: { __typename?: 'ValidEmailResponse', alreadyTaken: boolean } | null };

export type UserCreateMutationMutationVariables = Exact<{
  userInput: AuthCreateUserInput;
}>;


export type UserCreateMutationMutation = { __typename?: 'Mutation', authCreateUser: { __typename?: 'AuthCreateUserResponse', accessToken: string, user: (
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
    ) } };

export type UserFragmentFragment = { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email?: string | null, handle?: string | null } & { ' $fragmentName'?: 'UserFragmentFragment' };

export type UserLoginMutationMutationVariables = Exact<{
  authLoginInput: AuthLoginInput;
}>;


export type UserLoginMutationMutation = { __typename?: 'Mutation', authLogin: { __typename?: 'AuthLoginResponse', accessToken: string, refreshToken: string, user: { __typename?: 'User', firstName?: string | null, lastName?: string | null, email?: string | null } } };

export type UserInviteCardMutationMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  communityId: Scalars['ID']['input'];
}>;


export type UserInviteCardMutationMutation = { __typename?: 'Mutation', communityInvite: boolean };

export type UserSearchFriendsFragmentFragment = { __typename?: 'Viewer', user?: { __typename?: 'User', searchFriends?: Array<(
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
    )> | null } | null } & { ' $fragmentName'?: 'UserSearchFriendsFragmentFragment' };

export type UserSearchFriendsListQueryQueryVariables = Exact<{
  searchTerm?: InputMaybe<Scalars['String']['input']>;
}>;


export type UserSearchFriendsListQueryQuery = { __typename?: 'Query', viewer?: (
    { __typename?: 'Viewer' }
    & { ' $fragmentRefs'?: { 'UserSearchFriendsFragmentFragment': UserSearchFriendsFragmentFragment } }
  ) | null };

export type ViewerQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerQueryQuery = { __typename?: 'Query', viewer?: (
    { __typename?: 'Viewer' }
    & { ' $fragmentRefs'?: { 'ViewerFragmentFragment': ViewerFragmentFragment } }
  ) | null };

export type ViewerFragmentFragment = { __typename?: 'Viewer', user?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
  ) | null } & { ' $fragmentName'?: 'ViewerFragmentFragment' };

export const CommunityFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommunityFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Community"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<CommunityFragmentFragment, unknown>;
export const CommunityList__QueryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommunityList__query"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"refetchable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryName"},"value":{"kind":"StringValue","value":"CommunityListRefetchQuery","block":false}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"communities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommunityFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommunityFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Community"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<CommunityList__QueryFragment, unknown>;
export const UserFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}}]} as unknown as DocumentNode<UserFragmentFragment, unknown>;
export const UserSearchFriendsFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSearchFriendsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Viewer"}},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"refetchable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryName"},"value":{"kind":"StringValue","value":"UserSearchRefetchQuery","block":false}}]},{"kind":"Directive","name":{"kind":"Name","value":"argumentDefinitions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"String","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"defaultValue"},"value":{"kind":"NullValue"}}]}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchFriends"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}}]} as unknown as DocumentNode<UserSearchFriendsFragmentFragment, unknown>;
export const ViewerFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Viewer"}},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"refetchable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryName"},"value":{"kind":"StringValue","value":"ViewerRefetchQuery","block":false}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}}]} as unknown as DocumentNode<ViewerFragmentFragment, unknown>;
export const CommunityDetailsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CommunityDetailsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"community"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommunityFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommunityFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Community"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<CommunityDetailsQueryQuery, CommunityDetailsQueryQueryVariables>;
export const ChallengeCreateMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChallengeCreateMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"challengeCreateInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChallengeCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"challengeCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"challengeCreateInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"challengeCreateInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<ChallengeCreateMutationMutation, ChallengeCreateMutationMutationVariables>;
export const CommunityCreateMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CommunityCreateMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"communityCreateInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CommunityCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"communityCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"communityCreateInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"communityCreateInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}}]}}]}}]} as unknown as DocumentNode<CommunityCreateMutationMutation, CommunityCreateMutationMutationVariables>;
export const CommunityListQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CommunityListQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommunityList__query"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommunityFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Community"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommunityList__query"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"refetchable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryName"},"value":{"kind":"StringValue","value":"CommunityListRefetchQuery","block":false}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"communities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommunityFragment"}}]}}]}}]} as unknown as DocumentNode<CommunityListQueryQuery, CommunityListQueryQueryVariables>;
export const CommunitySearchQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CommunitySearchQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"community"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommunityFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommunityFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Community"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<CommunitySearchQueryQuery, CommunitySearchQueryQueryVariables>;
export const UserCreateValidateEmailQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserCreateValidateEmailQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userValidateEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alreadyTaken"}}]}}]}}]} as unknown as DocumentNode<UserCreateValidateEmailQueryQuery, UserCreateValidateEmailQueryQueryVariables>;
export const UserCreateMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserCreateMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthCreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authCreateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"authCreateUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}}]} as unknown as DocumentNode<UserCreateMutationMutation, UserCreateMutationMutationVariables>;
export const UserLoginMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserLoginMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authLoginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthLoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"authLoginInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authLoginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<UserLoginMutationMutation, UserLoginMutationMutationVariables>;
export const UserInviteCardMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserInviteCardMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"communityId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"communityInvite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"communityId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"communityId"}}}]}]}}]} as unknown as DocumentNode<UserInviteCardMutationMutation, UserInviteCardMutationMutationVariables>;
export const UserSearchFriendsListQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserSearchFriendsListQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserSearchFriendsFragment"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"arguments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}}]}]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSearchFriendsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Viewer"}},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"refetchable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryName"},"value":{"kind":"StringValue","value":"UserSearchRefetchQuery","block":false}}]},{"kind":"Directive","name":{"kind":"Name","value":"argumentDefinitions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"String","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"defaultValue"},"value":{"kind":"NullValue"}}]}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchFriends"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}}]}}]} as unknown as DocumentNode<UserSearchFriendsListQueryQuery, UserSearchFriendsListQueryQueryVariables>;
export const ViewerQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ViewerQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ViewerFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Viewer"}},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"refetchable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryName"},"value":{"kind":"StringValue","value":"ViewerRefetchQuery","block":false}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}}]} as unknown as DocumentNode<ViewerQueryQuery, ViewerQueryQueryVariables>;