/**
 * @generated SignedSource<<6c7525d710c9e085bdee5e923cfcb4c4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type useViewerIdQuery$variables = Record<PropertyKey, never>;
export type useViewerIdQuery$data = {
  readonly viewer: {
    readonly id: string;
  } | null | undefined;
};
export type useViewerIdQuery = {
  response: useViewerIdQuery$data;
  variables: useViewerIdQuery$variables;
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
    "name": "useViewerIdQuery",
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
    "name": "useViewerIdQuery",
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
    "cacheID": "7f919df30e47ab41f2c175def9213bac",
    "id": null,
    "metadata": {},
    "name": "useViewerIdQuery",
    "operationKind": "query",
    "text": "query useViewerIdQuery {\n  viewer {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "a7ca56371d9b8929f145eb7313f95de4";

export default node;
