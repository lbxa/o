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
};

export type AuthCreateNewTokensResponse = {
  __typename?: 'AuthCreateNewTokensResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
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

export type Community = {
  __typename?: 'Community';
  events?: Maybe<Array<Maybe<Event>>>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type CommunityCreateInput = {
  name: Scalars['String']['input'];
};

export type CommunityUpdateInput = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Event = {
  __typename?: 'Event';
  community?: Maybe<Community>;
  field?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type EventCreateInput = {
  communityId: Scalars['Int']['input'];
  field?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  authCreateNewTokens: AuthCreateNewTokensResponse;
  authCreateUser: AuthCreateUserResponse;
  authLogin: AuthLoginResponse;
  authLogout: Scalars['Boolean']['output'];
  communityCreate: Community;
  communityDelete?: Maybe<Community>;
  communityJoin: Community;
  communityLeave: Community;
  communityUpdate: Community;
  eventCreate: Event;
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


export type MutationCommunityCreateArgs = {
  communityCreateInput: CommunityCreateInput;
};


export type MutationCommunityDeleteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationCommunityJoinArgs = {
  communityId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationCommunityLeaveArgs = {
  communityId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationCommunityUpdateArgs = {
  communityUpdateInput: CommunityUpdateInput;
};


export type MutationEventCreateArgs = {
  eventCreateInput: EventCreateInput;
};


export type MutationUserUpdateArgs = {
  userUpdateInput: UserUpdateInput;
};

export type Post = {
  __typename?: 'Post';
  content: Scalars['String']['output'];
  id: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  communities?: Maybe<Array<Community>>;
  community?: Maybe<Community>;
  communityEvents?: Maybe<Array<Maybe<Event>>>;
  health: Scalars['String']['output'];
  user?: Maybe<User>;
  userValidateEmail?: Maybe<ValidEmailResponse>;
};


export type QueryCommunityArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCommunityEventsArgs = {
  communityId: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserValidateEmailArgs = {
  email: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  handle?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
};

export type UserUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  handle?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
};

export type ValidEmailResponse = {
  __typename?: 'ValidEmailResponse';
  alreadyTaken: Scalars['Boolean']['output'];
};

export type CommunityFragmentFragment = { __typename?: 'Community', name: string, _id: number } & { ' $fragmentName'?: 'CommunityFragmentFragment' };

export type CommunityCreateMutationMutationVariables = Exact<{
  communityCreateInput: CommunityCreateInput;
}>;


export type CommunityCreateMutationMutation = { __typename?: 'Mutation', communityCreate: { __typename?: 'Community', name: string } };

export type CommunityListQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type CommunityListQueryQuery = { __typename?: 'Query', communities?: Array<{ __typename?: 'Community', name: string, _id: number }> | null };

export type UserFragmentFragment = { __typename?: 'User', firstName?: string | null, lastName?: string | null, email?: string | null, _id?: number | null } & { ' $fragmentName'?: 'UserFragmentFragment' };

export type UserCreateValidateEmailQueryQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type UserCreateValidateEmailQueryQuery = { __typename?: 'Query', userValidateEmail?: { __typename?: 'ValidEmailResponse', alreadyTaken: boolean } | null };

export type UserCreateMutationMutationVariables = Exact<{
  userInput: AuthCreateUserInput;
}>;


export type UserCreateMutationMutation = { __typename?: 'Mutation', authCreateUser: { __typename?: 'AuthCreateUserResponse', user: (
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
    ) } };

export type UserLoginMutationMutationVariables = Exact<{
  authLoginInput: AuthLoginInput;
}>;


export type UserLoginMutationMutation = { __typename?: 'Mutation', authLogin: { __typename?: 'AuthLoginResponse', accessToken: string, refreshToken: string } };

export const CommunityFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommunityFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Community"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"_id"},"name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<CommunityFragmentFragment, unknown>;
export const UserFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"_id"},"name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<UserFragmentFragment, unknown>;
export const CommunityCreateMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CommunityCreateMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"communityCreateInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CommunityCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"communityCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"communityCreateInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"communityCreateInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CommunityCreateMutationMutation, CommunityCreateMutationMutationVariables>;
export const CommunityListQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CommunityListQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"communities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"_id"},"name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CommunityListQueryQuery, CommunityListQueryQueryVariables>;
export const UserCreateValidateEmailQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserCreateValidateEmailQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userValidateEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alreadyTaken"}}]}}]}}]} as unknown as DocumentNode<UserCreateValidateEmailQueryQuery, UserCreateValidateEmailQueryQueryVariables>;
export const UserCreateMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserCreateMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthCreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authCreateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"authCreateUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"_id"},"name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<UserCreateMutationMutation, UserCreateMutationMutationVariables>;
export const UserLoginMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserLoginMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authLoginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthLoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"authLoginInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authLoginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<UserLoginMutationMutation, UserLoginMutationMutationVariables>;