/**
 * @generated SignedSource<<48deb9e9deda00baf52d57189e392d23>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type profileManageBioQuery$variables = Record<PropertyKey, never>;
export type profileManageBioQuery$data = {
  readonly viewer: {
    readonly user: {
      readonly bio: string | null | undefined;
      readonly id: string;
    } | null | undefined;
  } | null | undefined;
};
export type profileManageBioQuery = {
  response: profileManageBioQuery$data;
  variables: profileManageBioQuery$variables;
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
    "name": "profileManageBioQuery",
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
    "name": "profileManageBioQuery",
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
    "cacheID": "88e50ca289694e22dcab4923379eaf7c",
    "id": null,
    "metadata": {},
    "name": "profileManageBioQuery",
    "operationKind": "query",
    "text": "query profileManageBioQuery {\n  viewer {\n    user {\n      id\n      bio\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "2396009c0d3cb2710d517246f15fccca";

export default node;
