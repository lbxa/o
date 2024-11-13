/**
 * @generated SignedSource<<7cfb1606e0d3a54c63d5275f3c36b76c>>
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
      readonly id: string;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "authLoginInput",
        "variableName": "authLoginInput"
      }
    ],
    "concreteType": "AuthLoginPayload",
    "kind": "LinkedField",
    "name": "authLogin",
    "plural": false,
    "selections": [
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
      },
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
    "name": "UserLoginMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserLoginMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "605e7e1ce9aa4b43cea69d01b85c8f41",
    "id": null,
    "metadata": {},
    "name": "UserLoginMutation",
    "operationKind": "mutation",
    "text": "mutation UserLoginMutation(\n  $authLoginInput: AuthLoginInput!\n) {\n  authLogin(authLoginInput: $authLoginInput) {\n    tokens {\n      accessToken\n      refreshToken\n    }\n    user {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ee3346ff9041d821e038cfca3f73db48";

export default node;
