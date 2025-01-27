/**
 * @generated SignedSource<<4aa7fc29f9a77413d6d1ba8930a156f6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type CommunityManageQuery$variables = {
  communityId: string;
};
export type CommunityManageQuery$data = {
  readonly viewer: {
    readonly community: {
      readonly " $fragmentSpreads": FragmentRefs<"CommunityManage_community">;
    } | null | undefined;
  } | null | undefined;
};
export type CommunityManageQuery = {
  response: CommunityManageQuery$data;
  variables: CommunityManageQuery$variables;
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CommunityManageQuery",
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
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "CommunityManage_community"
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
    "name": "CommunityManageQuery",
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
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isPublic",
                "storageKey": null
              }
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
    "cacheID": "ba5d2c2f6f54668e465c03fe77e4d27b",
    "id": null,
    "metadata": {},
    "name": "CommunityManageQuery",
    "operationKind": "query",
    "text": "query CommunityManageQuery(\n  $communityId: ID!\n) {\n  viewer {\n    community(communityId: $communityId) {\n      ...CommunityManage_community\n      id\n    }\n    id\n  }\n}\n\nfragment CommunityManage_community on Community {\n  id\n  name\n  isPublic\n}\n"
  }
};
})();

(node as any).hash = "74d4a63f6821d289330f725b45ca7933";

export default node;
