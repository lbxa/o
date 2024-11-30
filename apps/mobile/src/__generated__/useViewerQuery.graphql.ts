/**
 * @generated SignedSource<<407725f51e03b72886ab93721b6c7e43>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type useViewerQuery$variables = Record<PropertyKey, never>;
export type useViewerQuery$data = {
  readonly viewer: {
    readonly id: string;
  } | null | undefined;
};
export type useViewerQuery = {
  response: useViewerQuery$data;
  variables: useViewerQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "useViewerQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "RequiredField",
            "field": (v0/*: any*/),
            "action": "THROW"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "useViewerQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "70529b8c8eed68646acd43baae6a9397",
    "id": null,
    "metadata": {},
    "name": "useViewerQuery",
    "operationKind": "query",
    "text": "query useViewerQuery {\n  viewer {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "c074a45e4edd949ec3e3d4f970336e0f";

export default node;
