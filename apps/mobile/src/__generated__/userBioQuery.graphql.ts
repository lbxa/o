/**
 * @generated SignedSource<<64b5364c6aa3378bc1626ff72ddf3f1d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type userBioQuery$variables = Record<PropertyKey, never>;
export type userBioQuery$data = {
  readonly viewer: {
    readonly user: {
      readonly bio: string | null | undefined;
      readonly id: string;
    } | null | undefined;
  } | null | undefined;
};
export type userBioQuery = {
  response: userBioQuery$data;
  variables: userBioQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "user",
  "plural": false,
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "bio",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "userBioQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "userBioQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a52bd2f9b1d8a69dc1e30c44360154f8",
    "id": null,
    "metadata": {},
    "name": "userBioQuery",
    "operationKind": "query",
    "text": "query userBioQuery {\n  viewer {\n    user {\n      id\n      bio\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "65dd0aa8114d6f8b5489264a611201e9";

export default node;
