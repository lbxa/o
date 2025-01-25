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
  allMembers?: Maybe<UserConnection>;
  cadence?: Maybe<ChallengeCadence>;
  community?: Maybe<Community>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  /**
   * The UI displays a member summary as: x, y and n others. Hence
   * the firstMember and secondMember fields
   */
  firstMember?: Maybe<User>;
  id: Scalars['ID']['output'];
  invitations?: Maybe<Array<ChallengeInvitation>>;
  memberCount?: Maybe<Scalars['Int']['output']>;
  memberships?: Maybe<Array<ChallengeMembership>>;
  mode?: Maybe<ChallengeMode>;
  name: Scalars['String']['output'];
  secondMember?: Maybe<User>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type ChallengeActivityTopMoversArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type ChallengeActivityTopResultsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type ChallengeAllMembersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
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
  LongestDistance = 'LONGEST_DISTANCE',
  LongestTime = 'LONGEST_TIME',
  LowestNumber = 'LOWEST_NUMBER',
  MostImproved = 'MOST_IMPROVED',
  ShortestDistance = 'SHORTEST_DISTANCE',
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
  result: Scalars['Float']['output'];
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
  result: Scalars['Float']['input'];
  userId: Scalars['ID']['input'];
};

export type ChallengeActivityResultEdge = {
  __typename?: 'ChallengeActivityResultEdge';
  cursor: Scalars['String']['output'];
  node: ChallengeActivityResult;
};

/**
 * Top movers are the users with the largest relative
 * movement for a given activity.
 */
export type ChallengeActivityTopMover = Node & Timestamps & {
  __typename?: 'ChallengeActivityTopMover';
  activity: ChallengeActivity;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  /** A percentage - not a float */
  result: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
};

export type ChallengeActivityTopMoverConnection = {
  __typename?: 'ChallengeActivityTopMoverConnection';
  edges?: Maybe<Array<ChallengeActivityTopMoverEdge>>;
  pageInfo: PageInfo;
};

export type ChallengeActivityTopMoverEdge = {
  __typename?: 'ChallengeActivityTopMoverEdge';
  cursor: Scalars['String']['output'];
  node: ChallengeActivityTopMover;
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
  allMembers?: Maybe<UserConnection>;
  challenges?: Maybe<ChallengeConnection>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  firstMember?: Maybe<User>;
  id: Scalars['ID']['output'];
  invitations?: Maybe<CommunityInvitationConnection>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  isVerified?: Maybe<Scalars['Boolean']['output']>;
  memberCount?: Maybe<Scalars['Int']['output']>;
  memberships?: Maybe<Array<CommunityMembership>>;
  name: Scalars['String']['output'];
  owner?: Maybe<User>;
  secondMember?: Maybe<User>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  users?: Maybe<Array<User>>;
};


export type CommunityAllMembersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
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

export type CommunityInviteDeclinePayload = {
  __typename?: 'CommunityInviteDeclinePayload';
  invitationId: Scalars['ID']['output'];
};

export type CommunityJoinPayload = {
  __typename?: 'CommunityJoinPayload';
  communityEdge: CommunityEdge;
  invitationId: Scalars['ID']['output'];
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
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CreateChallengeActivityResultPayload = {
  __typename?: 'CreateChallengeActivityResultPayload';
  challengeActivityResultEdge: ChallengeActivityResultEdge;
};

export type HomeFeedConnection = {
  __typename?: 'HomeFeedConnection';
  edges: Array<HomeFeedEdge>;
  pageInfo: PageInfo;
};

export type HomeFeedEdge = {
  __typename?: 'HomeFeedEdge';
  cursor: Scalars['String']['output'];
  node: HomeFeedItem;
};

export type HomeFeedItem = Challenge | UserRecord;

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
  communityInviteDecline: CommunityInviteDeclinePayload;
  communityJoin: CommunityJoinPayload;
  communityLeave: Scalars['Boolean']['output'];
  communityUpdate: Community;
  createUserRecord: UserRecord;
  updateUserStreak: UserStreak;
  /** Accept a friendship */
  userAcceptFriendship: UserFriendship;
  /** Decline a friendship */
  userDeclineFriendship: UserFriendship;
  /** Remove a friendship */
  userRemoveFriendship: UserFriendship;
  /** Request a friendship */
  userRequestFriendship: UserFriendship;
  /** Update a user */
  userUpdate: User;
};


export type MutationAuthCreateUserArgs = {
  authCreateUserInput: AuthCreateUserInput;
};


export type MutationAuthLoginArgs = {
  authLoginInput: AuthLoginInput;
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


export type MutationCommunityInviteDeclineArgs = {
  inviteId: Scalars['ID']['input'];
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


export type MutationCreateUserRecordArgs = {
  input: UserRecordCreateInput;
};


export type MutationUpdateUserStreakArgs = {
  input: UserStreakUpdateInput;
};


export type MutationUserAcceptFriendshipArgs = {
  friendId: Scalars['ID']['input'];
};


export type MutationUserDeclineFriendshipArgs = {
  friendId: Scalars['ID']['input'];
};


export type MutationUserRemoveFriendshipArgs = {
  friendId: Scalars['ID']['input'];
};


export type MutationUserRequestFriendshipArgs = {
  friendId: Scalars['ID']['input'];
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
  challengeActivityTopMovers: ChallengeActivityResultConnection;
  challengeActivityTopResults: ChallengeActivityResultConnection;
  challengeInvitations?: Maybe<Array<ChallengeInvitation>>;
  /** Is the current user friends with this user? */
  getFriendshipStatus?: Maybe<UserFriendshipStatus>;
  health: Scalars['String']['output'];
  node?: Maybe<Node>;
  /** Fetch the user profile of any user by ID */
  userProfile?: Maybe<User>;
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


export type QueryChallengeActivityTopMoversArgs = {
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


export type QueryGetFriendshipStatusArgs = {
  friendId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserProfileArgs = {
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
  avatarUrl?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  buddyCount?: Maybe<Scalars['Int']['output']>;
  challengeActivityResultsCount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  /** Requests to be followed by this user */
  followRequests?: Maybe<UserFriendshipConnection>;
  followerCount?: Maybe<Scalars['Int']['output']>;
  /** Requests to follow this user */
  followerRequests?: Maybe<UserFriendshipConnection>;
  /** If they have any followers... */
  followers?: Maybe<UserConnection>;
  /** If they follow any users... */
  following?: Maybe<UserConnection>;
  followingCount?: Maybe<Scalars['Int']['output']>;
  handle?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  searchFriends?: Maybe<Array<User>>;
  /** The streak of consecutive days that the user has completed a challenge. */
  streak?: Maybe<UserStreak>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


/** A user of the app */
export type UserFollowRequestsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


/** A user of the app */
export type UserFollowerRequestsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


/** A user of the app */
export type UserSearchFriendsArgs = {
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges?: Maybe<Array<UserEdge>>;
  pageInfo: PageInfo;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String']['output'];
  node: User;
};

export type UserFriendship = Node & Timestamps & {
  __typename?: 'UserFriendship';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  friend: User;
  id: Scalars['ID']['output'];
  status: InvitationStatus;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
};

export type UserFriendshipConnection = {
  __typename?: 'UserFriendshipConnection';
  edges: Array<UserFriendshipEdge>;
  pageInfo: PageInfo;
};

export type UserFriendshipEdge = {
  __typename?: 'UserFriendshipEdge';
  cursor: Scalars['String']['output'];
  node: UserFriendship;
};

/**
 * Represents the bidirectional friendship status between two users.
 * When building social graphs, it's important to track both directions
 * of a relationship since friendships can be asymmetric (e.g. pending requests).
 */
export type UserFriendshipStatus = {
  __typename?: 'UserFriendshipStatus';
  /**
   * Whether these users are mutual friends (both have accepted the friendship).
   * True only if both outgoing and incoming friendships exist and are ACCEPTED.
   */
  areMutualFriends: Scalars['Boolean']['output'];
  /**
   * The incoming friendship status from the target user to the viewer.
   * Will be null if no friendship request exists in this direction.
   */
  incoming?: Maybe<UserFriendship>;
  /**
   * The outgoing friendship status from the viewer to the target user.
   * Will be null if no friendship request exists in this direction.
   */
  outgoing?: Maybe<UserFriendship>;
};

/**
 * Represents a record of a user's activity in a specific challenge.
 * This tracks individual challenge activity results for the user.
 */
export type UserRecord = Node & Timestamps & {
  __typename?: 'UserRecord';
  /** The result of the activity */
  activityResult: ChallengeActivityResult;
  /** The challenge this record is associated with */
  challenge: Challenge;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
};

export type UserRecordCreateInput = {
  activityId: Scalars['ID']['input'];
  activityResultId: Scalars['ID']['input'];
  challengeId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

/**
 * Represents the streak of consecutive days that a user has completed a challenge.
 * It can be any challenge from any community.
 */
export type UserStreak = Node & Timestamps & {
  __typename?: 'UserStreak';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** The current streak of consecutive days that the user has completed a challenge */
  currentStreak: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  /** The longest streak of consecutive days that the user has completed a challenge */
  longestStreak?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type UserStreakUpdateInput = {
  currentStreak: Scalars['Int']['input'];
  id: Scalars['ID']['input'];
  longestStreak: Scalars['Int']['input'];
};

export type UserUpdateInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
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
  homeFeed: HomeFeedConnection;
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


/** The currently logged in user */
export type ViewerHomeFeedArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};
