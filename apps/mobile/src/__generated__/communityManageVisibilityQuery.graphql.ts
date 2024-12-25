/**
 * @generated SignedSource<<6a01186978b96e93c1ec384b4d143a5b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type communityManageVisibilityQuery$variables = {
  communityId: string;
};
export type communityManageVisibilityQuery$data = {
  readonly viewer: {
    readonly community: {
      readonly id: string;
      readonly isPublic: boolean;
    } | null | undefined;
  } | null | undefined;
};
export type communityManageVisibilityQuery = {
  response: communityManageVisibilityQuery$data;
  variables: communityManageVisibilityQuery$variables;
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
  "name": "isPublic",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "communityManageVisibilityQuery",
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
    "name": "communityManageVisibilityQuery",
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
    "cacheID": "e876bbffa42741f973398df0faa462fd",
    "id": null,
    "metadata": {},
    "name": "communityManageVisibilityQuery",
    "operationKind": "query",
    "text": "query communityManageVisibilityQuery(\n  $communityId: ID!\n) {\n  viewer {\n    community(communityId: $communityId) {\n      id\n      isPublic\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "478f862f68acb98c00e9f277b7240d86";

export default node;
