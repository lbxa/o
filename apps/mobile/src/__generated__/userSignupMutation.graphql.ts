/**
 * @generated SignedSource<<dd04b29e1fedc60e4f5dd5fdaf95ad4d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateUserInput = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};
export type userSignupMutation$variables = {
  userInput: CreateUserInput;
};
export type userSignupMutation$data = {
  readonly createUser: {
    readonly " $fragmentSpreads": FragmentRefs<"userSignupFragment">;
  };
};
export type userSignupMutation = {
  response: userSignupMutation$data;
  variables: userSignupMutation$variables;
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
    "name": "createUserInput",
    "variableName": "userInput"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "userSignupMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "createUser",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "userSignupFragment"
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
    "name": "userSignupMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "createUser",
        "plural": false,
        "selections": [
          {
            "alias": "_id",
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
    ]
  },
  "params": {
    "cacheID": "61c0a841b171de9a0eba6b59e67958ed",
    "id": null,
    "metadata": {},
    "name": "userSignupMutation",
    "operationKind": "mutation",
    "text": "mutation userSignupMutation(\n  $userInput: CreateUserInput!\n) {\n  createUser(createUserInput: $userInput) {\n    ...userSignupFragment\n  }\n}\n\nfragment userSignupFragment on User {\n  _id: id\n  firstName\n  lastName\n  email\n}\n"
  }
};
})();

(node as any).hash = "7f295254d4fe0d37781efcc04b7113d0";

export default node;
