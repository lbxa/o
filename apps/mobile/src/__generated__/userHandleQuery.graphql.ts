/**
 * @generated SignedSource<<1f9afb3b324cbbc4237e20bcce42b72c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type userHandleQuery$variables = Record<PropertyKey, never>;
export type userHandleQuery$data = {
  readonly viewer: {
    readonly user: {
      readonly handle: string | null | undefined;
      readonly id: string;
    } | null | undefined;
  } | null | undefined;
};
export type userHandleQuery = {
  response: userHandleQuery$data;
  variables: userHandleQuery$variables;
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
    "name": "userHandleQuery",
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
    "name": "userHandleQuery",
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
    "cacheID": "6862287468285d5d3e6332bb12e4042b",
    "id": null,
    "metadata": {},
    "name": "userHandleQuery",
    "operationKind": "query",
    "text": "query userHandleQuery {\n  viewer {\n    user {\n      id\n      handle\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "f57a8f06b6a35614bbe7efed4432fc8c";

export default node;
