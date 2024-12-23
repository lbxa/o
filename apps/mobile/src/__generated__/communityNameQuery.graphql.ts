/**
 * @generated SignedSource<<b3c95bc2b6ab1e05815312846df608b5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type communityNameQuery$variables = {
  communityId: string;
};
export type communityNameQuery$data = {
  readonly viewer: {
    readonly community: {
      readonly id: string;
      readonly name: string;
    } | null | undefined;
  } | null | undefined;
};
export type communityNameQuery = {
  response: communityNameQuery$data;
  variables: communityNameQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "communityId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "communityId",
    "variableName": "communityId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "communityNameQuery",
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
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "Community",
            "kind": "LinkedField",
            "name": "community",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "RequiredField",
                "field": (v3/*: any*/),
                "action": "THROW"
              }
            ],
            "storageKey": null
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
    "name": "communityNameQuery",
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
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "Community",
            "kind": "LinkedField",
            "name": "community",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "144adfff18207517c8fccfb674db832a",
    "id": null,
    "metadata": {},
    "name": "communityNameQuery",
    "operationKind": "query",
    "text": "query communityNameQuery(\n  $communityId: ID!\n) {\n  viewer {\n    community(communityId: $communityId) {\n      id\n      name\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "fff2ba4ba0032feacfb1f2f1878943fa";

export default node;
