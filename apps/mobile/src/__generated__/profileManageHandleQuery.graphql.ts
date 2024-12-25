/**
 * @generated SignedSource<<aae0a9d5663c9a30ea47fb258586ebf6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type profileManageHandleQuery$variables = Record<PropertyKey, never>;
export type profileManageHandleQuery$data = {
  readonly viewer: {
    readonly user: {
      readonly handle: string | null | undefined;
      readonly id: string;
    } | null | undefined;
  } | null | undefined;
};
export type profileManageHandleQuery = {
  response: profileManageHandleQuery$data;
  variables: profileManageHandleQuery$variables;
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
      "name": "handle",
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
    "name": "profileManageHandleQuery",
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
    "name": "profileManageHandleQuery",
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
    "cacheID": "90ca71240ad562d416832e06138a5914",
    "id": null,
    "metadata": {},
    "name": "profileManageHandleQuery",
    "operationKind": "query",
    "text": "query profileManageHandleQuery {\n  viewer {\n    user {\n      id\n      handle\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "b9dc67c193d73be95cc83ffbb27ecc71";

export default node;
