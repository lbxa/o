
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum ChallengeActivityType {
    REPETITIONS = "REPETITIONS",
    WEIGHTLIFTING = "WEIGHTLIFTING",
    TIME_BASED = "TIME_BASED",
    DISTANCE = "DISTANCE",
    SOCIAL = "SOCIAL"
}

export enum ChallengeActivityUnits {
    KILOGRAMS = "KILOGRAMS",
    POUNDS = "POUNDS",
    METRES = "METRES",
    FEET = "FEET",
    SECONDS = "SECONDS",
    MINUTES = "MINUTES",
    HOURS = "HOURS",
    MILES = "MILES",
    KILOMETRES = "KILOMETRES",
    PERCENT = "PERCENT",
    NONE = "NONE"
}

export enum ChallengeActivityGoal {
    LOWEST_NUMBER = "LOWEST_NUMBER",
    HIGHEST_NUMBER = "HIGHEST_NUMBER",
    SPECIFIC_TARGET = "SPECIFIC_TARGET",
    SHORTEST_TIME = "SHORTEST_TIME",
    LONGEST_TIME = "LONGEST_TIME",
    MOST_IMPROVED = "MOST_IMPROVED",
    SHORTEST_DISTANCE = "SHORTEST_DISTANCE",
    LONGEST_DISTANCE = "LONGEST_DISTANCE"
}

export enum ChallengeMode {
    BLIND_TRUST = "BLIND_TRUST",
    BUDDY_SYSTEM = "BUDDY_SYSTEM",
    VERIFIED_ONLY = "VERIFIED_ONLY"
}

export enum ChallengeCadence {
    NONE = "NONE",
    DAILY = "DAILY",
    WEEKLY = "WEEKLY",
    BIWEEKLY = "BIWEEKLY",
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY"
}

export enum InvitationStatus {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    DECLINED = "DECLINED"
}

export interface AuthLoginInput {
    email: string;
    password: string;
}

export interface AuthCreateUserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface ChallengeActivityResultCreateInput {
    challengeId: string;
    activityId: string;
    userId: string;
    result: number;
}

export interface ChallengeActivityCreateInput {
    type: ChallengeActivityType;
    goal: ChallengeActivityGoal;
    target?: Nullable<number>;
    unit: ChallengeActivityUnits;
}

export interface ChallengeCreateInput {
    name: string;
    description: string;
    communityId: string;
    startDate: DateTime;
    endDate: DateTime;
    mode: ChallengeMode;
    cadence: ChallengeCadence;
}

export interface ChallengeUpdateInput {
    id: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    startDate?: Nullable<DateTime>;
    endDate?: Nullable<DateTime>;
}

export interface CommunityCreateInput {
    name: string;
    isPublic: boolean;
}

export interface CommunityUpdateInput {
    id: string;
    name?: Nullable<string>;
    isPublic?: Nullable<boolean>;
}

export interface UserRecordCreateInput {
    userId: string;
    challengeId: string;
    activityId: string;
    activityResultId: string;
}

export interface UserStreakUpdateInput {
    id: string;
    currentStreak: number;
    longestStreak: number;
}

export interface UserUpdateInput {
    id: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    handle?: Nullable<string>;
    email?: Nullable<string>;
    bio?: Nullable<string>;
}

export interface Node {
    id: string;
}

export interface Timestamps {
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export interface Tokens {
    __typename?: 'Tokens';
    accessToken: string;
    refreshToken: string;
}

export interface AuthLoginPayload {
    __typename?: 'AuthLoginPayload';
    tokens: Tokens;
    user: User;
}

export interface AuthCreateUserPayload {
    __typename?: 'AuthCreateUserPayload';
    tokens: Tokens;
    user: User;
}

export interface IMutation {
    __typename?: 'IMutation';
    authLogin(authLoginInput: AuthLoginInput): AuthLoginPayload | Promise<AuthLoginPayload>;
    authLogout(): boolean | Promise<boolean>;
    authCreateUser(authCreateUserInput: AuthCreateUserInput): AuthCreateUserPayload | Promise<AuthCreateUserPayload>;
    authRefreshTokens(): Tokens | Promise<Tokens>;
    challengeActivityResultCreate(challengeActivityResultCreateInput: ChallengeActivityResultCreateInput): CreateChallengeActivityResultPayload | Promise<CreateChallengeActivityResultPayload>;
    challengeCreate(challengeCreateInput: ChallengeCreateInput, challengeActivityCreateInput: ChallengeActivityCreateInput): ChallengeCreatePayload | Promise<ChallengeCreatePayload>;
    challengeUpdate(challengeUpdateInput: ChallengeUpdateInput): Challenge | Promise<Challenge>;
    challengeDelete(id: string): boolean | Promise<boolean>;
    challengeInvite(userId: string, challengeId: string): boolean | Promise<boolean>;
    challengeJoin(inviteId: string): Challenge | Promise<Challenge>;
    challengeLeave(id: string): boolean | Promise<boolean>;
    communityCreate(communityCreateInput: CommunityCreateInput): CommunityCreatePayload | Promise<CommunityCreatePayload>;
    communityUpdate(communityUpdateInput: CommunityUpdateInput): Community | Promise<Community>;
    communityDelete(id: string): boolean | Promise<boolean>;
    communityInvite(userId: string, communityId: string): boolean | Promise<boolean>;
    communityInviteDecline(inviteId: string): CommunityInviteDeclinePayload | Promise<CommunityInviteDeclinePayload>;
    communityJoin(inviteId: string): CommunityJoinPayload | Promise<CommunityJoinPayload>;
    communityLeave(id: string): boolean | Promise<boolean>;
    createUserRecord(input: UserRecordCreateInput): UserRecord | Promise<UserRecord>;
    updateUserStreak(input: UserStreakUpdateInput): UserStreak | Promise<UserStreak>;
    userUpdate(userUpdateInput: UserUpdateInput): User | Promise<User>;
    userRequestFriendship(friendId: string): UserFriendship | Promise<UserFriendship>;
    userAcceptFriendship(friendId: string): UserFriendship | Promise<UserFriendship>;
    userDeclineFriendship(friendId: string): UserFriendship | Promise<UserFriendship>;
    userRemoveFriendship(friendId: string): UserFriendship | Promise<UserFriendship>;
}

export interface ChallengeActivityResult extends Node, Timestamps {
    __typename?: 'ChallengeActivityResult';
    id: string;
    user: User;
    activity: ChallengeActivity;
    result: number;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export interface ChallengeActivityResultEdge {
    __typename?: 'ChallengeActivityResultEdge';
    node: ChallengeActivityResult;
    cursor: string;
}

export interface ChallengeActivityResultConnection {
    __typename?: 'ChallengeActivityResultConnection';
    edges?: Nullable<ChallengeActivityResultEdge[]>;
    pageInfo: PageInfo;
}

export interface Challenge extends Node, Timestamps {
    __typename?: 'Challenge';
    activityTopResults?: Nullable<ChallengeActivityResultConnection>;
    activityTopMovers?: Nullable<ChallengeActivityResultConnection>;
    id: string;
    name: string;
    description?: Nullable<string>;
    community?: Nullable<Community>;
    startDate?: Nullable<DateTime>;
    endDate?: Nullable<DateTime>;
    mode?: Nullable<ChallengeMode>;
    cadence?: Nullable<ChallengeCadence>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    activity: ChallengeActivity;
    members?: Nullable<User[]>;
    memberCount?: Nullable<number>;
    memberships?: Nullable<ChallengeMembership[]>;
    invitations?: Nullable<ChallengeInvitation[]>;
}

export interface CreateChallengeActivityResultPayload {
    __typename?: 'CreateChallengeActivityResultPayload';
    challengeActivityResultEdge: ChallengeActivityResultEdge;
}

export interface IQuery {
    __typename?: 'IQuery';
    challengeActivityResults(challengeId: string, first?: Nullable<number>, after?: Nullable<string>): ChallengeActivityResultConnection | Promise<ChallengeActivityResultConnection>;
    challengeActivityTopResults(challengeId: string, first?: Nullable<number>, after?: Nullable<string>): ChallengeActivityResultConnection | Promise<ChallengeActivityResultConnection>;
    challenge(id: string): Nullable<Challenge> | Promise<Nullable<Challenge>>;
    challengeInvitations(userId: string): Nullable<ChallengeInvitation[]> | Promise<Nullable<ChallengeInvitation[]>>;
    health(): string | Promise<string>;
    node(id: string): Nullable<Node> | Promise<Nullable<Node>>;
    users(): Nullable<User[]> | Promise<Nullable<User[]>>;
    userValidateEmail(email: string): ValidEmailResponse | Promise<ValidEmailResponse>;
    userSearch(searchTerm?: Nullable<string>): Nullable<User[]> | Promise<Nullable<User[]>>;
    userProfile(id: string): Nullable<User> | Promise<Nullable<User>>;
    getFriendshipStatus(userId: string, friendId: string): Nullable<UserFriendshipStatus> | Promise<Nullable<UserFriendshipStatus>>;
    viewer(): Nullable<Viewer> | Promise<Nullable<Viewer>>;
}

export interface ChallengeActivity extends Node, Timestamps {
    __typename?: 'ChallengeActivity';
    id: string;
    challengeId?: Nullable<string>;
    type: ChallengeActivityType;
    goal: ChallengeActivityGoal;
    target?: Nullable<number>;
    unit: ChallengeActivityUnits;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export interface ChallengeMembership extends Node {
    __typename?: 'ChallengeMembership';
    id: string;
    user: User;
    community: Community;
    challenge: Challenge;
    joinedAt: DateTime;
}

export interface ChallengeInvitation extends Node, Timestamps {
    __typename?: 'ChallengeInvitation';
    id: string;
    challenge: Challenge;
    inviter: User;
    invitee: User;
    status: InvitationStatus;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    expiresAt: DateTime;
}

export interface ChallengeEdge {
    __typename?: 'ChallengeEdge';
    cursor: string;
    node: Challenge;
}

export interface ChallengeConnection {
    __typename?: 'ChallengeConnection';
    edges?: Nullable<ChallengeEdge[]>;
    pageInfo: PageInfo;
}

export interface ChallengeCreatePayload {
    __typename?: 'ChallengeCreatePayload';
    challengeEdge: ChallengeEdge;
}

export interface Community extends Node, Timestamps {
    __typename?: 'Community';
    id: string;
    name: string;
    owner?: Nullable<User>;
    isPublic?: Nullable<boolean>;
    isVerified?: Nullable<boolean>;
    users?: Nullable<User[]>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    members?: Nullable<UserConnection>;
    memberCount?: Nullable<number>;
    challenges?: Nullable<ChallengeConnection>;
    memberships?: Nullable<CommunityMembership[]>;
    invitations?: Nullable<CommunityInvitationConnection>;
}

export interface CommunityMembership extends Node {
    __typename?: 'CommunityMembership';
    id: string;
    user: User;
    community: Community;
    isAdmin: boolean;
    joinedAt: DateTime;
}

export interface CommunityInvitation extends Node, Timestamps {
    __typename?: 'CommunityInvitation';
    id: string;
    community: Community;
    inviter: User;
    invitee: User;
    status: InvitationStatus;
    createdAt: DateTime;
    updatedAt?: Nullable<DateTime>;
    expiresAt: DateTime;
}

export interface CommunityEdge {
    __typename?: 'CommunityEdge';
    cursor: string;
    node: Community;
}

export interface CommunityConnection {
    __typename?: 'CommunityConnection';
    edges?: Nullable<CommunityEdge[]>;
    pageInfo: PageInfo;
}

export interface CommunityInvitationEdge {
    __typename?: 'CommunityInvitationEdge';
    cursor: string;
    node: CommunityInvitation;
}

export interface CommunityInvitationConnection {
    __typename?: 'CommunityInvitationConnection';
    edges?: Nullable<CommunityInvitationEdge[]>;
    pageInfo: PageInfo;
}

export interface CommunityCreatePayload {
    __typename?: 'CommunityCreatePayload';
    communityEdge: CommunityEdge;
}

export interface CommunityJoinPayload {
    __typename?: 'CommunityJoinPayload';
    invitationId: string;
    communityEdge: CommunityEdge;
}

export interface CommunityInviteDeclinePayload {
    __typename?: 'CommunityInviteDeclinePayload';
    invitationId: string;
}

export interface PageInfo {
    __typename?: 'PageInfo';
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: Nullable<string>;
    endCursor?: Nullable<string>;
}

export interface UserRecord extends Node, Timestamps {
    __typename?: 'UserRecord';
    id: string;
    user: User;
    challenge: Challenge;
    activityResult: ChallengeActivityResult;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export interface UserStreak extends Node, Timestamps {
    __typename?: 'UserStreak';
    id: string;
    user?: Nullable<User>;
    currentStreak: number;
    longestStreak?: Nullable<number>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export interface User extends Node, Timestamps {
    __typename?: 'User';
    id: string;
    handle?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    bio?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
    avatarUrl?: Nullable<string>;
    refreshToken?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    streak?: Nullable<UserStreak>;
    followers?: Nullable<UserConnection>;
    following?: Nullable<UserConnection>;
    searchFriends?: Nullable<User[]>;
    buddyCount?: Nullable<number>;
    followerCount?: Nullable<number>;
    followingCount?: Nullable<number>;
    challengeActivityResultsCount?: Nullable<number>;
    followerRequests?: Nullable<UserFriendshipConnection>;
    followRequests?: Nullable<UserFriendshipConnection>;
}

export interface UserFriendship extends Node, Timestamps {
    __typename?: 'UserFriendship';
    id: string;
    user: User;
    friend: User;
    status: InvitationStatus;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export interface UserFriendshipStatus {
    __typename?: 'UserFriendshipStatus';
    outgoing?: Nullable<UserFriendship>;
    incoming?: Nullable<UserFriendship>;
    areMutualFriends: boolean;
}

export interface ValidEmailResponse {
    __typename?: 'ValidEmailResponse';
    alreadyTaken: boolean;
}

export interface UserEdge {
    __typename?: 'UserEdge';
    cursor: string;
    node: User;
}

export interface UserConnection {
    __typename?: 'UserConnection';
    edges?: Nullable<UserEdge[]>;
    pageInfo: PageInfo;
}

export interface UserFriendshipEdge {
    __typename?: 'UserFriendshipEdge';
    cursor: string;
    node: UserFriendship;
}

export interface UserFriendshipConnection {
    __typename?: 'UserFriendshipConnection';
    edges: UserFriendshipEdge[];
    pageInfo: PageInfo;
}

export interface Viewer extends Node {
    __typename?: 'Viewer';
    id: string;
    user?: Nullable<User>;
    community?: Nullable<Community>;
    communities?: CommunityConnection;
    communityInvitations?: CommunityInvitationConnection;
    challenges?: ChallengeConnection;
    challenge?: Nullable<Challenge>;
    homeFeed?: HomeFeedConnection;
}

export interface HomeFeedConnection {
    __typename?: 'HomeFeedConnection';
    edges: HomeFeedEdge[];
    pageInfo: PageInfo;
}

export interface HomeFeedEdge {
    __typename?: 'HomeFeedEdge';
    cursor: string;
    node: HomeFeedItem;
}

export type DateTime = Date;
export type HomeFeedItem = Challenge | UserRecord;
type Nullable<T> = T | null;
