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
  DateTime: { input: any; output: any; }
};

export type AuthCreateUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type AuthCreateUserPayload = {
  __typename?: 'AuthCreateUserPayload';
  tokens: Tokens;
  user: User;
};

export type AuthLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

/** Login payload */
export type AuthLoginPayload = {
  __typename?: 'AuthLoginPayload';
  /** Access to the refresh tokens */
  tokens: Tokens;
  /** The user that has been logged in */
  user: User;
};

export type Challenge = Node & Timestamps & {
  __typename?: 'Challenge';
  activity: ChallengeActivity;
  activityTopMovers?: Maybe<ChallengeActivityResultConnection>;
  activityTopResults?: Maybe<ChallengeActivityResultConnection>;
  cadence?: Maybe<ChallengeCadence>;
  community?: Maybe<Community>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  invitations?: Maybe<Array<ChallengeInvitation>>;
  members?: Maybe<Array<User>>;
  memberships?: Maybe<Array<ChallengeMembership>>;
  mode?: Maybe<ChallengeMode>;
  name: Scalars['String']['output'];
  startDate?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type ChallengeActivityTopMoversArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  challengeId?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type ChallengeActivityTopResultsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  challengeId?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type ChallengeActivity = Node & Timestamps & {
  __typename?: 'ChallengeActivity';
  challengeId?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  goal: ChallengeActivityGoal;
  id: Scalars['ID']['output'];
  target?: Maybe<Scalars['Int']['output']>;
  type: ChallengeActivityType;
  unit: ChallengeActivityUnits;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ChallengeActivityCreateInput = {
  goal: ChallengeActivityGoal;
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

/**
 * Results for a challenge activity are recorded per user per activity.
 * In the future we may want to support multiple activities per challenge.
 *
 * There can be multiple results per activity per user.
 */
export type ChallengeActivityResult = Node & Timestamps & {
  __typename?: 'ChallengeActivityResult';
  activity: ChallengeActivity;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  result: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
};

export type ChallengeActivityResultConnection = {
  __typename?: 'ChallengeActivityResultConnection';
  edges?: Maybe<Array<ChallengeActivityResultEdge>>;
  pageInfo: PageInfo;
};

export type ChallengeActivityResultCreateInput = {
  activityId: Scalars['ID']['input'];
  challengeId: Scalars['ID']['input'];
  result: Scalars['Int']['input'];
  userId: Scalars['ID']['input'];
};

export type ChallengeActivityResultEdge = {
  __typename?: 'ChallengeActivityResultEdge';
  cursor: Scalars['String']['output'];
  node: ChallengeActivityResult;
};

export enum ChallengeActivityType {
  Distance = 'DISTANCE',
  Repetitions = 'REPETITIONS',
  Social = 'SOCIAL',
  TimeBased = 'TIME_BASED',
  Weightlifting = 'WEIGHTLIFTING'
}

export enum ChallengeActivityUnits {
  Feet = 'FEET',
  Hours = 'HOURS',
  Kilograms = 'KILOGRAMS',
  Kilometres = 'KILOMETRES',
  Metres = 'METRES',
  Miles = 'MILES',
  Minutes = 'MINUTES',
  None = 'NONE',
  Percent = 'PERCENT',
  Pounds = 'POUNDS',
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

export type ChallengeConnection = {
  __typename?: 'ChallengeConnection';
  edges?: Maybe<Array<ChallengeEdge>>;
  pageInfo: PageInfo;
};

export type ChallengeCreateInput = {
  cadence: ChallengeCadence;
  communityId: Scalars['ID']['input'];
  description: Scalars['String']['input'];
  endDate: Scalars['DateTime']['input'];
  mode: ChallengeMode;
  name: Scalars['String']['input'];
  startDate: Scalars['DateTime']['input'];
};

export type ChallengeCreatePayload = {
  __typename?: 'ChallengeCreatePayload';
  challengeEdge: ChallengeEdge;
};

export type ChallengeEdge = {
  __typename?: 'ChallengeEdge';
  cursor: Scalars['String']['output'];
  node: Challenge;
};

export type ChallengeInvitation = Node & Timestamps & {
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

export enum ChallengeMode {
  BlindTrust = 'BLIND_TRUST',
  BuddySystem = 'BUDDY_SYSTEM',
  VerifiedOnly = 'VERIFIED_ONLY'
}

export type ChallengeUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Community = Node & Timestamps & {
  __typename?: 'Community';
  challenges?: Maybe<ChallengeConnection>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  invitations?: Maybe<CommunityInvitationConnection>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  isVerified?: Maybe<Scalars['Boolean']['output']>;
  members?: Maybe<Array<User>>;
  memberships?: Maybe<Array<CommunityMembership>>;
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type CommunityChallengesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type CommunityInvitationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type CommunityConnection = {
  __typename?: 'CommunityConnection';
  edges?: Maybe<Array<CommunityEdge>>;
  pageInfo: PageInfo;
};

export type CommunityCreateInput = {
  isPublic: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type CommunityCreatePayload = {
  __typename?: 'CommunityCreatePayload';
  communityEdge: CommunityEdge;
};

export type CommunityEdge = {
  __typename?: 'CommunityEdge';
  cursor: Scalars['String']['output'];
  node: Community;
};

export type CommunityInvitation = Node & Timestamps & {
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

export type CommunityInvitationConnection = {
  __typename?: 'CommunityInvitationConnection';
  edges?: Maybe<Array<CommunityInvitationEdge>>;
  pageInfo: PageInfo;
};

export type CommunityInvitationEdge = {
  __typename?: 'CommunityInvitationEdge';
  cursor: Scalars['String']['output'];
  node: CommunityInvitation;
};

export type CommunityJoinPayload = {
  __typename?: 'CommunityJoinPayload';
  communityEdge: CommunityEdge;
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

export type CreateChallengeActivityResultPayload = {
  __typename?: 'CreateChallengeActivityResultPayload';
  challengeActivityResultEdge: ChallengeActivityResultEdge;
};

export enum InvitationStatus {
  Accepted = 'ACCEPTED',
  Declined = 'DECLINED',
  Pending = 'PENDING'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new user */
  authCreateUser: AuthCreateUserPayload;
  /** Login to the application */
  authLogin: AuthLoginPayload;
  /** Logout from the application */
  authLogout: Scalars['Boolean']['output'];
  /** Refresh the access and refresh tokens */
  authRefreshTokens: Tokens;
  challengeActivityResultCreate: CreateChallengeActivityResultPayload;
  challengeCreate: ChallengeCreatePayload;
  challengeDelete: Scalars['Boolean']['output'];
  challengeInvite: Scalars['Boolean']['output'];
  challengeJoin: Challenge;
  challengeLeave: Scalars['Boolean']['output'];
  challengeUpdate: Challenge;
  communityCreate: CommunityCreatePayload;
  communityDelete: Scalars['Boolean']['output'];
  communityInvite: Scalars['Boolean']['output'];
  communityJoin: CommunityJoinPayload;
  communityLeave: Scalars['Boolean']['output'];
  communityUpdate: Community;
  /** Update a user */
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


export type MutationChallengeActivityResultCreateArgs = {
  challengeActivityResultCreateInput: ChallengeActivityResultCreateInput;
};


export type MutationChallengeCreateArgs = {
  challengeActivityCreateInput: ChallengeActivityCreateInput;
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
  inviteId: Scalars['ID']['input'];
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

/**
 * GraphQL Spec pagination information
 * https://relay.dev/graphql/connections.htm#sec-Connection-Types.Fields.PageInfo
 */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Last node of the edges */
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  /** First node of the edges */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  challenge?: Maybe<Challenge>;
  challengeActivityResults: ChallengeActivityResultConnection;
  challengeActivityTopResults: ChallengeActivityResultConnection;
  challengeInvitations?: Maybe<Array<ChallengeInvitation>>;
  health: Scalars['String']['output'];
  node?: Maybe<Node>;
  /** Search for users by name */
  userSearch?: Maybe<Array<User>>;
  /** Validate if an email is already taken */
  userValidateEmail: ValidEmailResponse;
  /** All users */
  users?: Maybe<Array<User>>;
  viewer?: Maybe<Viewer>;
};


export type QueryChallengeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryChallengeActivityResultsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  challengeId: Scalars['ID']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryChallengeActivityTopResultsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  challengeId: Scalars['ID']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryChallengeInvitationsArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserSearchArgs = {
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserValidateEmailArgs = {
  email: Scalars['String']['input'];
};

export type Timestamps = {
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

/** Tokens are the access and refresh tokens for the user */
export type Tokens = {
  __typename?: 'Tokens';
  /** Access tokens expire more frequently for stronger security measures */
  accessToken: Scalars['String']['output'];
  /** Refresh token is stored safely for user to refresh access token */
  refreshToken: Scalars['String']['output'];
};

/** A user of the app */
export type User = Node & Timestamps & {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  /** If they have any... */
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


/** A user of the app */
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

/** The currently logged in user */
export type Viewer = Node & {
  __typename?: 'Viewer';
  challenge?: Maybe<Challenge>;
  challenges: ChallengeConnection;
  communities: CommunityConnection;
  community?: Maybe<Community>;
  communityInvitations: CommunityInvitationConnection;
  /** Alias for user id */
  id: Scalars['ID']['output'];
  /** Only one active user can be logged in at a time */
  user?: Maybe<User>;
};


/** The currently logged in user */
export type ViewerChallengeArgs = {
  challengeId: Scalars['ID']['input'];
};


/** The currently logged in user */
export type ViewerChallengesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  communityId: Scalars['ID']['input'];
  first: Scalars['Int']['input'];
};


/** The currently logged in user */
export type ViewerCommunitiesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};


/** The currently logged in user */
export type ViewerCommunityArgs = {
  communityId: Scalars['ID']['input'];
};


/** The currently logged in user */
export type ViewerCommunityInvitationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};
