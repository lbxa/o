
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
    userUpdate(userUpdateInput: UserUpdateInput): User | Promise<User>;
}

export interface Post {
    __typename?: 'Post';
    id: number;
    content: string;
}

export interface IQuery {
    __typename?: 'IQuery';
    health(): string | Promise<string>;
    user(id: number): Nullable<User> | Promise<Nullable<User>>;
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

type Nullable<T> = T | null;
