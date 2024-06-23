
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

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
}

export interface CommunityUpdateInput {
    id: number;
    name?: Nullable<string>;
}

export interface EventCreateInput {
    name: string;
    field?: Nullable<string>;
    communityId: number;
}

export interface UserUpdateInput {
    id: number;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    handle?: Nullable<string>;
    email?: Nullable<string>;
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
    communityDelete(id: number): Nullable<Community> | Promise<Nullable<Community>>;
    eventCreate(eventCreateInput: EventCreateInput): Event | Promise<Event>;
    communityJoin(userId: number, communityId: number): Community | Promise<Community>;
    communityLeave(userId: number, communityId: number): Community | Promise<Community>;
    userUpdate(userUpdateInput: UserUpdateInput): User | Promise<User>;
}

export interface Community {
    __typename?: 'Community';
    id: number;
    name: string;
    users?: Nullable<Nullable<User>[]>;
    events?: Nullable<Nullable<Event>[]>;
}

export interface Event {
    __typename?: 'Event';
    id?: Nullable<number>;
    name?: Nullable<string>;
    field?: Nullable<string>;
    community?: Nullable<Community>;
}

export interface IQuery {
    __typename?: 'IQuery';
    community(id: number): Nullable<Community> | Promise<Nullable<Community>>;
    communities(): Nullable<Community[]> | Promise<Nullable<Community[]>>;
    communityEvents(communityId: number): Nullable<Nullable<Event>[]> | Promise<Nullable<Nullable<Event>[]>>;
    health(): string | Promise<string>;
    user(id: number): Nullable<User> | Promise<Nullable<User>>;
    userValidateEmail(email: string): Nullable<ValidEmailResponse> | Promise<Nullable<ValidEmailResponse>>;
}

export interface Post {
    __typename?: 'Post';
    id: number;
    content: string;
}

export interface User {
    __typename?: 'User';
    id?: Nullable<number>;
    handle?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export interface ValidEmailResponse {
    __typename?: 'ValidEmailResponse';
    alreadyTaken: boolean;
}

type Nullable<T> = T | null;
