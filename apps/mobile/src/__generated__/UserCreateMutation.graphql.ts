/**
 * @generated SignedSource<<2fbde0aafa9dc94e566bfc7de44e66fd>>
 * @lightSyntaxTransform
 * @nogrep
 */

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
      readonly __typename: "User";
      readonly __id: string;
      readonly email: string | null | undefined;
      readonly firstName: string | null | undefined;
      readonly id: string;
      readonly lastName: string | null | undefined;
      readonly " $fragmentSpreads": FragmentRefs<"UserCreateFragment_viewer_assignable">;
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
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v7 = {
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
                "name": "UserCreateFragment_viewer_assignable"
              },
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__id",
                "storageKey": null
              },
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          (v7/*: any*/)
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
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8f1814ec87a7a093783f3bbe648a6acd",
    "id": null,
    "metadata": {},
    "name": "UserCreateMutation",
    "operationKind": "mutation",
    "text": "mutation UserCreateMutation(\n  $userInput: AuthCreateUserInput!\n) {\n  authCreateUser(authCreateUserInput: $userInput) {\n    user {\n      ...UserCreateFragment_viewer_assignable\n      id\n      firstName\n      lastName\n      email\n    }\n    tokens {\n      accessToken\n      refreshToken\n    }\n  }\n}\n\nfragment UserCreateFragment_viewer_assignable on User {\n  __typename\n}\n"
  }
};
})();

(node as any).hash = "1ad97476cb8780ae0806f3672b6aefbe";

export default node;
