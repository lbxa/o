/**
 * @generated SignedSource<<35926451d51beb784768d53d8548ef97>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type useHasNotificationsQuery$variables = Record<PropertyKey, never>;
export type useHasNotificationsQuery$data = {
  readonly viewer: {
    readonly id: string;
    readonly user: {
      readonly followerRequests: {
        readonly edges: ReadonlyArray<{
          readonly cursor: string;
          readonly node: {
            readonly id: string;
          };
        }>;
      } | null | undefined;
      readonly id: string;
    } | null | undefined;
  } | null | undefined;
};
export type useHasNotificationsQuery = {
  response: useHasNotificationsQuery$data;
  variables: useHasNotificationsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "UserFriendshipEdge",
    "kind": "LinkedField",
    "name": "edges",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "cursor",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "UserFriendship",
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "PageInfo",
    "kind": "LinkedField",
    "name": "pageInfo",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "endCursor",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hasNextPage",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "useHasNotificationsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "alias": "followerRequests",
                "args": null,
                "concreteType": "UserFriendshipConnection",
                "kind": "LinkedField",
                "name": "__UserNotificationList_viewer_followerRequests_connection",
                "plural": false,
                "selections": (v1/*: any*/),
                "storageKey": null
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "useHasNotificationsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
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
                "args": (v2/*: any*/),
                "concreteType": "UserFriendshipConnection",
                "kind": "LinkedField",
                "name": "followerRequests",
                "plural": false,
                "selections": (v1/*: any*/),
                "storageKey": "followerRequests(first:10)"
              },
              {
                "alias": null,
                "args": (v2/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "UserNotificationList_viewer_followerRequests",
                "kind": "LinkedHandle",
                "name": "followerRequests"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9bfbe1a11061128841908b8e528daba0",
    "id": null,
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "forward",
          "path": [
            "viewer",
            "user",
            "followerRequests"
          ]
        }
      ]
    },
    "name": "useHasNotificationsQuery",
    "operationKind": "query",
    "text": "query useHasNotificationsQuery {\n  viewer {\n    id\n    user {\n      id\n      followerRequests(first: 10) {\n        edges {\n          cursor\n          node {\n            id\n            __typename\n          }\n        }\n        pageInfo {\n          endCursor\n          hasNextPage\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ec934b57018de159b71e0883b3825292";

export default node;
