/**
 * @generated SignedSource<<e6eaed07e5348ebab7bb713682290b5d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type bioQuery$variables = Record<PropertyKey, never>;
export type bioQuery$data = {
  readonly viewer: {
    readonly user: {
      readonly bio: string | null | undefined;
      readonly id: string;
    } | null | undefined;
  } | null | undefined;
};
export type bioQuery = {
  response: bioQuery$data;
  variables: bioQuery$variables;
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
    "name": "bioQuery",
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
    "name": "bioQuery",
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
    "cacheID": "04dfe450a31ed8a61277663157b4c4f9",
    "id": null,
    "metadata": {},
    "name": "bioQuery",
    "operationKind": "query",
    "text": "query bioQuery {\n  viewer {\n    user {\n      id\n      bio\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "830ef47a4a4d2eb2daf02fdb7869dbc2";

export default node;
