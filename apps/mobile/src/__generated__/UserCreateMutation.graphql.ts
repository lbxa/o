/**
 * @generated SignedSource<<a9ec6510335b145a7729214260e83f7f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
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
      readonly " $fragmentSpreads": FragmentRefs<"UserFragment">;
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
    "kind": "Variable",
    "name": "authCreateUserInput",
    "variableName": "userInput"
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UserCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
                "args": null,
                "kind": "FragmentSpread",
                "name": "UserFragment"
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/)
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
    "name": "UserCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "handle",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f42856b200199e4005dbe5ac9982e06e",
    "id": null,
    "metadata": {},
    "name": "UserCreateMutation",
    "operationKind": "mutation",
    "text": "mutation UserCreateMutation(\n  $userInput: AuthCreateUserInput!\n) {\n  authCreateUser(authCreateUserInput: $userInput) {\n    user {\n      ...UserFragment\n      id\n    }\n    tokens {\n      accessToken\n      refreshToken\n    }\n  }\n}\n\nfragment UserFragment on User {\n  id\n  firstName\n  lastName\n  email\n  handle\n}\n"
  }
};
})();

(node as any).hash = "a0050c837947a131865451aeb0fd937b";

export default node;
