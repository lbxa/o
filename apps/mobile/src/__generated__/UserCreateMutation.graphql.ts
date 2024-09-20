/**
 * @generated SignedSource<<20bf7868143eb27a3e867249db11d0fe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
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
];
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
        "concreteType": "AuthCreateUserResponse",
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
    "name": "UserCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AuthCreateUserResponse",
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3aa8d3d021b473a31adfb241a2940197",
    "id": null,
    "metadata": {},
    "name": "UserCreateMutation",
    "operationKind": "mutation",
    "text": "mutation UserCreateMutation(\n  $userInput: AuthCreateUserInput!\n) {\n  authCreateUser(authCreateUserInput: $userInput) {\n    user {\n      ...UserFragment\n      id\n    }\n  }\n}\n\nfragment UserFragment on User {\n  id\n  firstName\n  lastName\n  email\n}\n"
  }
};
})();

(node as any).hash = "3d674a3dcbc8696da658c34785442b55";

export default node;
