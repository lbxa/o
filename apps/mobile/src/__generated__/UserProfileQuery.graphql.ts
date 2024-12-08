/**
 * @generated SignedSource<<755ddc29589184a78ff987d9e1d62d7e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type UserProfileQuery$variables = {
  userId: string;
};
export type UserProfileQuery$data = {
  readonly userProfile: {
    readonly " $fragmentSpreads": FragmentRefs<"UserProfile_user">;
  } | null | undefined;
};
export type UserProfileQuery = {
  response: UserProfileQuery$data;
  variables: UserProfileQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "userId"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UserProfileQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "userProfile",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UserProfile_user"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserProfileQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "userProfile",
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
            "name": "handle",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "bio",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c5ce4ea6f39375880e3380910a829f9c",
    "id": null,
    "metadata": {},
    "name": "UserProfileQuery",
    "operationKind": "query",
    "text": "query UserProfileQuery(\n  $userId: ID!\n) {\n  userProfile(id: $userId) {\n    ...UserProfile_user\n    id\n  }\n}\n\nfragment UserProfile_user on User {\n  id\n  firstName\n  lastName\n  handle\n  bio\n}\n"
  }
};
})();

(node as any).hash = "b81d7f6792f7bca8888a7d82c814d8bc";

export default node;
