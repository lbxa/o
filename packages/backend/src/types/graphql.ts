
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

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

export interface ChallengeCreateInput {
    name: string;
    description: string;
    communityId: string;
    startDate: DateTime;
    endDate: DateTime;
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

export interface Timestampable {
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export interface AuthLoginResponse {
    __typename?: 'AuthLoginResponse';
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface AuthCreateUserResponse {
    __typename?: 'AuthCreateUserResponse';
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface Tokens {
    __typename?: 'Tokens';
    accessToken: string;
    refreshToken: string;
}

export interface IMutation {
    __typename?: 'IMutation';
    authLogin(authLoginInput: AuthLoginInput): AuthLoginResponse | Promise<AuthLoginResponse>;
    authLogout(id: number): boolean | Promise<boolean>;
    authCreateUser(authCreateUserInput: AuthCreateUserInput): AuthCreateUserResponse | Promise<AuthCreateUserResponse>;
    authRefreshTokens(): Tokens | Promise<Tokens>;
    challengeCreate(challengeCreateInput: ChallengeCreateInput): Challenge | Promise<Challenge>;
    challengeUpdate(challengeUpdateInput: ChallengeUpdateInput): Challenge | Promise<Challenge>;
    challengeDelete(id: string): boolean | Promise<boolean>;
    challengeInvite(userId: string, challengeId: string): boolean | Promise<boolean>;
    challengeJoin(inviteId: string): Challenge | Promise<Challenge>;
    challengeLeave(id: string): boolean | Promise<boolean>;
    communityCreate(communityCreateInput: CommunityCreateInput): Community | Promise<Community>;
    communityUpdate(communityUpdateInput: CommunityUpdateInput): Community | Promise<Community>;
    communityDelete(id: string): boolean | Promise<boolean>;
    communityInvite(userId: string, communityId: string): boolean | Promise<boolean>;
    communityJoin(inviteId: number): Community | Promise<Community>;
    communityLeave(id: string): boolean | Promise<boolean>;
    userUpdate(userUpdateInput: UserUpdateInput): User | Promise<User>;
}

export interface Challenge extends Node, Timestampable {
    __typename?: 'Challenge';
    id: string;
    name: string;
    description?: Nullable<string>;
    community?: Nullable<Community>;
    startDate?: Nullable<DateTime>;
    endDate?: Nullable<DateTime>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    members?: Nullable<User[]>;
    memberships?: Nullable<ChallengeMembership[]>;
    invitations?: Nullable<ChallengeInvitation[]>;
}

export interface ChallengeMembership extends Node {
    __typename?: 'ChallengeMembership';
    id: string;
    user: User;
    community: Community;
    challenge: Challenge;
    joinedAt: DateTime;
}

export interface ChallengeInvitation extends Node, Timestampable {
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

export interface IQuery {
    __typename?: 'IQuery';
    challenge(id: string): Nullable<Challenge> | Promise<Nullable<Challenge>>;
    challenges(): Nullable<Challenge[]> | Promise<Nullable<Challenge[]>>;
    communityChallenges(communityId: string): Nullable<Challenge[]> | Promise<Nullable<Challenge[]>>;
    userChallenges(userId: string): Nullable<Challenge[]> | Promise<Nullable<Challenge[]>>;
    challengeInvitations(userId: string): Nullable<ChallengeInvitation[]> | Promise<Nullable<ChallengeInvitation[]>>;
    community(id: string): Nullable<Community> | Promise<Nullable<Community>>;
    communities(): Nullable<Community[]> | Promise<Nullable<Community[]>>;
    userCommunities(userId: string): Nullable<Community[]> | Promise<Nullable<Community[]>>;
    communityInvitations(userId: string): Nullable<Community[]> | Promise<Nullable<Community[]>>;
    health(): string | Promise<string>;
    node(id: string): Nullable<Node> | Promise<Nullable<Node>>;
    users(): Nullable<User[]> | Promise<Nullable<User[]>>;
    userValidateEmail(email: string): Nullable<ValidEmailResponse> | Promise<Nullable<ValidEmailResponse>>;
    userSearch(searchTerm?: Nullable<string>): Nullable<User[]> | Promise<Nullable<User[]>>;
    viewer(): Nullable<Viewer> | Promise<Nullable<Viewer>>;
}

export interface Community extends Node, Timestampable {
    __typename?: 'Community';
    id: string;
    name: string;
    isPublic?: Nullable<boolean>;
    isVerified?: Nullable<boolean>;
    users?: Nullable<Nullable<User>[]>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    members?: Nullable<User[]>;
    challenges?: Nullable<Challenge[]>;
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

export interface CommunityInvitation extends Node, Timestampable {
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

export interface User extends Node, Timestampable {
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
    communities?: Nullable<Community[]>;
    searchFriends?: Nullable<User[]>;
    memberships?: Nullable<CommunityMembership[]>;
    sentInvitations?: Nullable<CommunityInvitation[]>;
    receivedInvitations?: Nullable<CommunityInvitation[]>;
}

export interface ValidEmailResponse {
    __typename?: 'ValidEmailResponse';
    alreadyTaken: boolean;
}

export interface Viewer {
    __typename?: 'Viewer';
    user?: Nullable<User>;
    communities?: Nullable<Community[]>;
    challenges?: Nullable<Challenge[]>;
}

export type DateTime = Date;
type Nullable<T> = T | null;
