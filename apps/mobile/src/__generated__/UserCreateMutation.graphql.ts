/**
 * @generated SignedSource<<528de59a6451860fe602d10abf0c1c14>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type AuthCreateUserInput = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};
export type UserCreateMutation$variables = {
  userInput: AuthCreateUserInput;
};
export type UserCreateMutation$data = {
  readonly authCreateUser: {
    readonly tokens: {
      readonly accessToken: string;
      readonly refreshToken: string;
    };
    readonly user: {
      readonly email: string | null | undefined;
      readonly firstName: string | null | undefined;
      readonly id: string;
      readonly lastName: string | null | undefined;
    };
  };
};
export type UserCreateMutation = {
  response: UserCreateMutation$data;
  variables: UserCreateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userInput"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "authCreateUserInput",
        "variableName": "userInput"
      }
    ],
    "concreteType": "AuthCreateUserPayload",
    "kind": "LinkedField",
    "name": "authCreateUser",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "firstName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "lastName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Tokens",
        "kind": "LinkedField",
        "name": "tokens",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "accessToken",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "refreshToken",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UserCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "da71e17f099ee12f6dc291f6b719409f",
    "id": null,
    "metadata": {},
    "name": "UserCreateMutation",
    "operationKind": "mutation",
    "text": "mutation UserCreateMutation(\n  $userInput: AuthCreateUserInput!\n) {\n  authCreateUser(authCreateUserInput: $userInput) {\n    user {\n      id\n      firstName\n      lastName\n      email\n    }\n    tokens {\n      accessToken\n      refreshToken\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "dfc26f51f0f2bdb3a5af1ff767058052";

export default node;
