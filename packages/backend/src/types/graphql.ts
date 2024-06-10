/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* eslint-disable */

export interface UserLoginInput {
    email: string;
    password: string;
}

export interface CreateUserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface UpdateUserInput {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export interface IMutation {
    __typename?: 'IMutation';
    login(userLoginInput: UserLoginInput): Nullable<User> | Promise<Nullable<User>>;
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
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
