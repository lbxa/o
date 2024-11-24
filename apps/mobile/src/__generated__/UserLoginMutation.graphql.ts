/**
 * @generated SignedSource<<a44785d54a5fffa3b7d14d02b3bc22bf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
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
      readonly __typename: "User";
      readonly __id: string;
      readonly email: string | null | undefined;
      readonly firstName: string | null | undefined;
      readonly id: string;
      readonly lastName: string | null | undefined;
      readonly " $fragmentSpreads": FragmentRefs<"UserLoginFragment_viewer_assignable">;
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
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v7 = {
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
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "UserLoginFragment_viewer_assignable"
              },
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__id",
                "storageKey": null
              },
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/)
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
              (v6/*: any*/),
              (v7/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ddc65c1a248df1fce92b0bd9e587bc60",
    "id": null,
    "metadata": {},
    "name": "UserLoginMutation",
    "operationKind": "mutation",
    "text": "mutation UserLoginMutation(\n  $authLoginInput: AuthLoginInput!\n) {\n  authLogin(authLoginInput: $authLoginInput) {\n    tokens {\n      accessToken\n      refreshToken\n    }\n    user {\n      ...UserLoginFragment_viewer_assignable\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n}\n\nfragment UserLoginFragment_viewer_assignable on User {\n  __typename\n}\n"
  }
};
})();

(node as any).hash = "3e3e56815f6f32f43d6b037fdd7b6f9e";

export default node;
