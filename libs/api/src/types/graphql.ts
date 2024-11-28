
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

export enum ChallengeActivityMeasurement {
    COUNTING = "COUNTING",
    DURATION = "DURATION",
    IMPROVEMENT = "IMPROVEMENT"
}

export enum ChallengeActivityGoal {
    LOWEST_NUMBER = "LOWEST_NUMBER",
    HIGHEST_NUMBER = "HIGHEST_NUMBER",
    SPECIFIC_TARGET = "SPECIFIC_TARGET",
    SHORTEST_TIME = "SHORTEST_TIME",
    LONGEST_TIME = "LONGEST_TIME",
    MOST_IMPROVED = "MOST_IMPROVED"
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
    measurement: ChallengeActivityMeasurement;
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
}

export interface UserUpdateInput {
    id: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    handle?: Nullable<string>;
    email?: Nullable<string>;
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
    authLogout(id: number): boolean | Promise<boolean>;
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
    communityJoin(inviteId: number): Community | Promise<Community>;
    communityLeave(id: string): boolean | Promise<boolean>;
    userUpdate(userUpdateInput: UserUpdateInput): User | Promise<User>;
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
    communityInvitations(userId: string): Nullable<Community[]> | Promise<Nullable<Community[]>>;
    health(): string | Promise<string>;
    node(id: string): Nullable<Node> | Promise<Nullable<Node>>;
    users(): Nullable<User[]> | Promise<Nullable<User[]>>;
    userValidateEmail(email: string): ValidEmailResponse | Promise<ValidEmailResponse>;
    userSearch(searchTerm?: Nullable<string>): Nullable<User[]> | Promise<Nullable<User[]>>;
    viewer(): Nullable<Viewer> | Promise<Nullable<Viewer>>;
}

export interface ChallengeActivity extends Node, Timestamps {
    __typename?: 'ChallengeActivity';
    id: string;
    challengeId?: Nullable<string>;
    type: ChallengeActivityType;
    measurement: ChallengeActivityMeasurement;
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
    isPublic?: Nullable<boolean>;
    isVerified?: Nullable<boolean>;
    users?: Nullable<Nullable<User>[]>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    members?: Nullable<User[]>;
    challenges?: Nullable<ChallengeConnection>;
    memberships?: Nullable<CommunityMembership[]>;
    invitations?: Nullable<CommunityInvitation[]>;
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

export interface CommunityCreatePayload {
    __typename?: 'CommunityCreatePayload';
    communityEdge: CommunityEdge;
}

export interface PageInfo {
    __typename?: 'PageInfo';
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: Nullable<string>;
    endCursor?: Nullable<string>;
}

export interface User extends Node, Timestamps {
    __typename?: 'User';
    id: string;
    handle?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    friends?: Nullable<User[]>;
    searchFriends?: Nullable<User[]>;
    memberships?: Nullable<CommunityMembership[]>;
    sentInvitations?: Nullable<CommunityInvitation[]>;
    receivedInvitations?: Nullable<CommunityInvitation[]>;
}

export interface ValidEmailResponse {
    __typename?: 'ValidEmailResponse';
    alreadyTaken: boolean;
}

export interface Viewer extends Node {
    __typename?: 'Viewer';
    id: string;
    user?: Nullable<User>;
    community?: Nullable<Community>;
    communities?: CommunityConnection;
    challenges?: ChallengeConnection;
    challenge?: Nullable<Challenge>;
}

export type DateTime = Date;
type Nullable<T> = T | null;
