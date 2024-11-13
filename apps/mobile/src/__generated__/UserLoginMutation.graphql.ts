/**
 * @generated SignedSource<<67b7a92df652fd1734a817ba0281dfae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type AuthLoginInput = {
  email: string;
  password: string;
};
export type UserLoginMutation$variables = {
  authLoginInput: AuthLoginInput;
};
export type UserLoginMutation$data = {
  readonly authLogin: {
    readonly tokens: {
      readonly accessToken: string;
      readonly refreshToken: string;
    };
    readonly user: {
      readonly email: string | null | undefined;
      readonly firstName: string | null | undefined;
      readonly lastName: string | null | undefined;
    };
  };
};
export type UserLoginMutation = {
  response: UserLoginMutation$data;
  variables: UserLoginMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "authLoginInput"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "authLoginInput",
    "variableName": "authLoginInput"
  }
],
v2 = {
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
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UserLoginMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AuthLoginPayload",
        "kind": "LinkedField",
        "name": "authLogin",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserLoginMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AuthLoginPayload",
        "kind": "LinkedField",
        "name": "authLogin",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "33c567009fcf6681d5133513d5893d02",
    "id": null,
    "metadata": {},
    "name": "UserLoginMutation",
    "operationKind": "mutation",
    "text": "mutation UserLoginMutation(\n  $authLoginInput: AuthLoginInput!\n) {\n  authLogin(authLoginInput: $authLoginInput) {\n    tokens {\n      accessToken\n      refreshToken\n    }\n    user {\n      firstName\n      lastName\n      email\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1294887f116fb8e03996f58ec22a62fe";

export default node;
