
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateUserInput {
    firstName: string;
    lastName: string;
}

export interface UpdateUserInput {
    id: number;
    firstName: string;
    lastName: string;
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
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    verified?: Nullable<string>;
}

export interface IMutation {
    __typename?: 'IMutation';
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
}

type Nullable<T> = T | null;
