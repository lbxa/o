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

export type AuthLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type ChallengeActivityCreateInput = {
  goal: ChallengeActivityGoal;
  measurement: ChallengeActivityMeasurement;
  target?: InputMaybe<Scalars['Int']['input']>;
  type: ChallengeActivityType;
  unit: ChallengeActivityUnits;
};

export enum ChallengeActivityGoal {
  HighestNumber = 'HIGHEST_NUMBER',
  LongestTime = 'LONGEST_TIME',
  LowestNumber = 'LOWEST_NUMBER',
  MostImproved = 'MOST_IMPROVED',
  ShortestTime = 'SHORTEST_TIME',
  SpecificTarget = 'SPECIFIC_TARGET'
}

export enum ChallengeActivityMeasurement {
  Counting = 'COUNTING',
  Duration = 'DURATION',
  Improvement = 'IMPROVEMENT'
}

export enum ChallengeActivityType {
  Distance = 'DISTANCE',
  Repetitions = 'REPETITIONS',
  Social = 'SOCIAL',
  TimeBased = 'TIME_BASED',
  Weightlifting = 'WEIGHTLIFTING'
}

export enum ChallengeActivityUnits {
  Ft = 'FT',
  Hours = 'HOURS',
  Kg = 'KG',
  Km = 'KM',
  Lb = 'LB',
  M = 'M',
  Mi = 'MI',
  Minutes = 'MINUTES',
  None = 'NONE',
  Percent = 'PERCENT',
  Seconds = 'SECONDS'
}

export enum ChallengeCadence {
  Biweekly = 'BIWEEKLY',
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
  None = 'NONE',
  Weekly = 'WEEKLY',
  Yearly = 'YEARLY'
}

export type ChallengeCreateInput = {
  cadence: ChallengeCadence;
  communityId: Scalars['ID']['input'];
  description: Scalars['String']['input'];
  endDate: Scalars['DateTime']['input'];
  mode: ChallengeMode;
  name: Scalars['String']['input'];
  startDate: Scalars['DateTime']['input'];
};

export enum ChallengeMode {
  BlindTrust = 'BLIND_TRUST',
  VerifiedOnly = 'VERIFIED_ONLY'
}

export type ChallengeUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CommunityCreateInput = {
  isPublic: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
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

export type UserUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  handle?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
};

export type ChallengeCreateMutationMutationVariables = Exact<{
  challengeCreateInput: ChallengeCreateInput;
}>;


export type ChallengeCreateMutationMutation = { __typename?: 'Mutation', challengeCreate: { __typename?: 'Challenge', name: string, description?: string | null } };

export type ChallengeFragmentFragment = { __typename?: 'Challenge', id: string, name: string, description?: string | null, startDate?: any | null, endDate?: any | null } & { ' $fragmentName'?: 'ChallengeFragmentFragment' };

export type ChallengeDetailsQueryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ChallengeDetailsQueryQuery = { __typename?: 'Query', challenge?: (
    { __typename?: 'Challenge', name: string }
    & { ' $fragmentRefs'?: { 'ChallengeFragmentFragment': ChallengeFragmentFragment } }
  ) | null };

export type CommunityCreateMutationMutationVariables = Exact<{
  communityCreateInput: CommunityCreateInput;
}>;


export type CommunityCreateMutationMutation = { __typename?: 'Mutation', communityCreate: { __typename?: 'Community', name: string, isPublic?: boolean | null } };

export type CommunityFragmentFragment = { __typename?: 'Community', id: string, name: string, isVerified?: boolean | null } & { ' $fragmentName'?: 'CommunityFragmentFragment' };

export type CommunityListFragmentFragment = { __typename?: 'Viewer', communities?: Array<(
    { __typename?: 'Community' }
    & { ' $fragmentRefs'?: { 'CommunityFragmentFragment': CommunityFragmentFragment } }
  )> | null } & { ' $fragmentName'?: 'CommunityListFragmentFragment' };

export type CommunityListQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type CommunityListQueryQuery = { __typename?: 'Query', viewer?: (
    { __typename?: 'Viewer' }
    & { ' $fragmentRefs'?: { 'CommunityListFragmentFragment': CommunityListFragmentFragment } }
  ) | null };

export type CommunityChallenges_CommunityFragment = { __typename?: 'Community', id: string, challenges?: Array<(
    { __typename?: 'Challenge' }
    & { ' $fragmentRefs'?: { 'ChallengeFragmentFragment': ChallengeFragmentFragment } }
  )> | null } & { ' $fragmentName'?: 'CommunityChallenges_CommunityFragment' };

export type CommunityDetailsQueryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CommunityDetailsQueryQuery = { __typename?: 'Query', community?: (
    { __typename?: 'Community', name: string }
    & { ' $fragmentRefs'?: { 'CommunityFragmentFragment': CommunityFragmentFragment } }
  ) | null };

export type CommunityRootQueryQueryVariables = Exact<{
  communityId: Scalars['ID']['input'];
}>;


export type CommunityRootQueryQuery = { __typename?: 'Query', community?: (
    { __typename?: 'Community' }
    & { ' $fragmentRefs'?: { 'CommunityChallenges_CommunityFragment': CommunityChallenges_CommunityFragment } }
  ) | null };

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

export const CommunityFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommunityFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Community"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}}]} as unknown as DocumentNode<CommunityFragmentFragment, unknown>;
export const CommunityListFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommunityListFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Viewer"}},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"refetchable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryName"},"value":{"kind":"StringValue","value":"CommunityListRefetchQuery","block":false}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"communities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommunityFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommunityFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Community"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}}]} as unknown as DocumentNode<CommunityListFragmentFragment, unknown>;
export const ChallengeFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChallengeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Challenge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]} as unknown as DocumentNode<ChallengeFragmentFragment, unknown>;
export const CommunityChallenges_CommunityFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommunityChallenges_community"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Community"}},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"refetchable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryName"},"value":{"kind":"StringValue","value":"CommunityChallengesRefreshQuery","block":false}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"challenges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChallengeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChallengeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Challenge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]} as unknown as DocumentNode<CommunityChallenges_CommunityFragment, unknown>;
export const UserFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}}]} as unknown as DocumentNode<UserFragmentFragment, unknown>;
export const UserSearchFriendsFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSearchFriendsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Viewer"}},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"refetchable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryName"},"value":{"kind":"StringValue","value":"UserSearchRefetchQuery","block":false}}]},{"kind":"Directive","name":{"kind":"Name","value":"argumentDefinitions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"String","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"defaultValue"},"value":{"kind":"NullValue"}}]}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchFriends"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}}]} as unknown as DocumentNode<UserSearchFriendsFragmentFragment, unknown>;
export const ViewerFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Viewer"}},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"refetchable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryName"},"value":{"kind":"StringValue","value":"ViewerRefetchQuery","block":false}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}}]} as unknown as DocumentNode<ViewerFragmentFragment, unknown>;
export const ChallengeCreateMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChallengeCreateMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"challengeCreateInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChallengeCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"challengeCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"challengeCreateInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"challengeCreateInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<ChallengeCreateMutationMutation, ChallengeCreateMutationMutationVariables>;
export const ChallengeDetailsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ChallengeDetailsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"challenge"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChallengeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChallengeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Challenge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]} as unknown as DocumentNode<ChallengeDetailsQueryQuery, ChallengeDetailsQueryQueryVariables>;
export const CommunityCreateMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CommunityCreateMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"communityCreateInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CommunityCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"communityCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"communityCreateInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"communityCreateInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}}]}}]}}]} as unknown as DocumentNode<CommunityCreateMutationMutation, CommunityCreateMutationMutationVariables>;
export const CommunityListQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CommunityListQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommunityListFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommunityFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Community"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommunityListFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Viewer"}},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"refetchable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryName"},"value":{"kind":"StringValue","value":"CommunityListRefetchQuery","block":false}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"communities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommunityFragment"}}]}}]}}]} as unknown as DocumentNode<CommunityListQueryQuery, CommunityListQueryQueryVariables>;
export const CommunityDetailsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CommunityDetailsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"community"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommunityFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommunityFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Community"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}}]} as unknown as DocumentNode<CommunityDetailsQueryQuery, CommunityDetailsQueryQueryVariables>;
export const CommunityRootQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CommunityRootQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"communityId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"community"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"communityId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommunityChallenges_community"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChallengeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Challenge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommunityChallenges_community"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Community"}},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"refetchable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryName"},"value":{"kind":"StringValue","value":"CommunityChallengesRefreshQuery","block":false}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"challenges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChallengeFragment"}}]}}]}}]} as unknown as DocumentNode<CommunityRootQueryQuery, CommunityRootQueryQueryVariables>;
export const CommunitySearchQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CommunitySearchQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"community"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommunityFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommunityFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Community"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}}]} as unknown as DocumentNode<CommunitySearchQueryQuery, CommunitySearchQueryQueryVariables>;
export const UserCreateValidateEmailQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserCreateValidateEmailQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userValidateEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alreadyTaken"}}]}}]}}]} as unknown as DocumentNode<UserCreateValidateEmailQueryQuery, UserCreateValidateEmailQueryQueryVariables>;
export const UserCreateMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserCreateMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthCreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authCreateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"authCreateUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}}]} as unknown as DocumentNode<UserCreateMutationMutation, UserCreateMutationMutationVariables>;
export const UserLoginMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserLoginMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authLoginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthLoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"authLoginInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authLoginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<UserLoginMutationMutation, UserLoginMutationMutationVariables>;
export const UserInviteCardMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserInviteCardMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"communityId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"communityInvite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"communityId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"communityId"}}}]}]}}]} as unknown as DocumentNode<UserInviteCardMutationMutation, UserInviteCardMutationMutationVariables>;
export const UserSearchFriendsListQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserSearchFriendsListQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserSearchFriendsFragment"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"arguments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}}]}]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSearchFriendsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Viewer"}},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"refetchable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryName"},"value":{"kind":"StringValue","value":"UserSearchRefetchQuery","block":false}}]},{"kind":"Directive","name":{"kind":"Name","value":"argumentDefinitions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"String","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"defaultValue"},"value":{"kind":"NullValue"}}]}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchFriends"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}}]}}]} as unknown as DocumentNode<UserSearchFriendsListQueryQuery, UserSearchFriendsListQueryQueryVariables>;
export const ViewerQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ViewerQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ViewerFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Viewer"}},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"refetchable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryName"},"value":{"kind":"StringValue","value":"ViewerRefetchQuery","block":false}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}}]} as unknown as DocumentNode<ViewerQueryQuery, ViewerQueryQueryVariables>;