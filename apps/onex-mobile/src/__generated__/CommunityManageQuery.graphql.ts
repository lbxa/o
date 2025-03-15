/**
 * @generated SignedSource<<e42330c40da14789138ea04d2222973b>>
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
              },
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "size",
                    "value": "LARGE"
                  }
                ],
                "kind": "ScalarField",
                "name": "imageUrl",
                "storageKey": "imageUrl(size:\"LARGE\")"
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
    "cacheID": "9616da5d25853be2c70acda66b843359",
    "id": null,
    "metadata": {},
    "name": "CommunityManageQuery",
    "operationKind": "query",
    "text": "query CommunityManageQuery(\n  $communityId: ID!\n) {\n  viewer {\n    community(communityId: $communityId) {\n      ...CommunityManage_community\n      id\n    }\n    id\n  }\n}\n\nfragment CommunityManage_community on Community {\n  id\n  name\n  isPublic\n  imageUrl(size: LARGE)\n}\n"
  }
};
})();

(node as any).hash = "74d4a63f6821d289330f725b45ca7933";

export default node;
