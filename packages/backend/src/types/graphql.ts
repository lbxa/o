
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

export interface AuthCreateNewTokensResponse {
    __typename?: 'AuthCreateNewTokensResponse';
    accessToken: string;
    refreshToken: string;
}

export interface IMutation {
    __typename?: 'IMutation';
    authLogin(authLoginInput: AuthLoginInput): AuthLoginResponse | Promise<AuthLoginResponse>;
    authLogout(id: number): boolean | Promise<boolean>;
    authCreateUser(authCreateUserInput: AuthCreateUserInput): AuthCreateUserResponse | Promise<AuthCreateUserResponse>;
    authCreateNewTokens(): AuthCreateNewTokensResponse | Promise<AuthCreateNewTokensResponse>;
    communityCreate(communityCreateInput: CommunityCreateInput): Community | Promise<Community>;
    communityUpdate(communityUpdateInput: CommunityUpdateInput): Community | Promise<Community>;
    communityDelete(id: string): boolean | Promise<boolean>;
    communityInvite(userId: string, communityId: string): boolean | Promise<boolean>;
    communityJoin(inviteId: number): Community | Promise<Community>;
    communityLeave(id: string): boolean | Promise<boolean>;
    userUpdate(userUpdateInput: UserUpdateInput): User | Promise<User>;
}

export interface Community extends Node, Timestampable {
    __typename?: 'Community';
    id: string;
    name: string;
    isPublic: boolean;
    users?: Nullable<Nullable<User>[]>;
    createdAt: DateTime;
    updatedAt?: Nullable<DateTime>;
    members?: Nullable<User[]>;
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

export interface IQuery {
    __typename?: 'IQuery';
    community(id: string): Nullable<Community> | Promise<Nullable<Community>>;
    communities(): Nullable<Community[]> | Promise<Nullable<Community[]>>;
    userCommunities(userId: string): Nullable<Community[]> | Promise<Nullable<Community[]>>;
    communityInvitations(userId: string): Nullable<Community[]> | Promise<Nullable<Community[]>>;
    health(): string | Promise<string>;
    node(id: string): Nullable<Node> | Promise<Nullable<Node>>;
    user(): User | Promise<User>;
    users(): Nullable<User[]> | Promise<Nullable<User[]>>;
    activeUser(): Nullable<User> | Promise<Nullable<User>>;
    userValidateEmail(email: string): Nullable<ValidEmailResponse> | Promise<Nullable<ValidEmailResponse>>;
    userSearch(searchTerm?: Nullable<string>): Nullable<User[]> | Promise<Nullable<User[]>>;
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
    searchFriends?: User[];
    memberships?: Nullable<CommunityMembership[]>;
    sentInvitations?: Nullable<CommunityInvitation[]>;
    receivedInvitations?: Nullable<CommunityInvitation[]>;
}

export interface ValidEmailResponse {
    __typename?: 'ValidEmailResponse';
    alreadyTaken: boolean;
}

export type DateTime = Date;
type Nullable<T> = T | null;
