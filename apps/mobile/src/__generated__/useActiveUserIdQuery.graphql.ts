/**
 * @generated SignedSource<<dde071c3753c025a59408434dbd37e05>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type useActiveUserIdQuery$variables = Record<PropertyKey, never>;
export type useActiveUserIdQuery$data = {
  readonly viewer: {
    readonly user: {
      readonly id: string;
    } | null | undefined;
  };
};
export type useActiveUserIdQuery = {
  response: useActiveUserIdQuery$data;
  variables: useActiveUserIdQuery$variables;
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
    (v0/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "useActiveUserIdQuery",
    "selections": [
      {
        "kind": "RequiredField",
        "field": {
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
        },
        "action": "THROW"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "useActiveUserIdQuery",
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
    "cacheID": "5c7ee0357a74104286d6edb1d8dcf00a",
    "id": null,
    "metadata": {},
    "name": "useActiveUserIdQuery",
    "operationKind": "query",
    "text": "query useActiveUserIdQuery {\n  viewer {\n    user {\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "311ab00dce2386b5faab39a8006999b6";

export default node;
