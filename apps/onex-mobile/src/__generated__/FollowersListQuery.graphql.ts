/**
 * @generated SignedSource<<8330b0ad7c83d546f2644ab504e2554c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type FollowersListQuery$variables = Record<PropertyKey, never>;
export type FollowersListQuery$data = {
  readonly viewer: {
    readonly id: string;
    readonly user: {
      readonly " $fragmentSpreads": FragmentRefs<"FollowersList_user">;
    } | null | undefined;
  } | null | undefined;
};
export type FollowersListQuery = {
  response: FollowersListQuery$data;
  variables: FollowersListQuery$variables;
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
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "handle",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FollowersListQuery",
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
              {
                "args": [
                  {
                    "kind": "Literal",
                    "name": "count",
                    "value": 10
                  }
                ],
                "kind": "FragmentSpread",
                "name": "FollowersList_user"
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
    "name": "FollowersListQuery",
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
                "args": (v1/*: any*/),
                "concreteType": "UserConnection",
                "kind": "LinkedField",
                "name": "followers",
                "plural": false,
                "selections": [
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
                        "name": "startCursor",
                        "storageKey": null
                      },
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
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserEdge",
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
                        "concreteType": "User",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v0/*: any*/),
                          (v2/*: any*/),
                          (v3/*: any*/),
                          (v4/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "avatarUrl",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "UserStreak",
                            "kind": "LinkedField",
                            "name": "streak",
                            "plural": false,
                            "selections": [
                              (v0/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "currentStreak",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "mutualCount",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "User",
                            "kind": "LinkedField",
                            "name": "firstMutualFriend",
                            "plural": false,
                            "selections": [
                              (v0/*: any*/),
                              (v2/*: any*/),
                              (v3/*: any*/),
                              (v4/*: any*/)
                            ],
                            "storageKey": null
                          },
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
                  }
                ],
                "storageKey": "followers(first:10)"
              },
              {
                "alias": null,
                "args": (v1/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "FollowersList_user_followers",
                "kind": "LinkedHandle",
                "name": "followers"
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
    "cacheID": "f24e8196f2d175c528c7c86a2e42e700",
    "id": null,
    "metadata": {},
    "name": "FollowersListQuery",
    "operationKind": "query",
    "text": "query FollowersListQuery {\n  viewer {\n    id\n    user {\n      ...FollowersList_user_1KmBw7\n      id\n    }\n  }\n}\n\nfragment FollowersList_user_1KmBw7 on User {\n  id\n  followers(first: 10) {\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ...UserProfileRow_user\n        id\n        __typename\n      }\n    }\n  }\n}\n\nfragment UserProfileRow_user on User {\n  id\n  firstName\n  lastName\n  handle\n  avatarUrl\n  streak {\n    id\n    currentStreak\n  }\n  mutualCount\n  firstMutualFriend {\n    id\n    firstName\n    lastName\n    handle\n  }\n}\n"
  }
};
})();

(node as any).hash = "8bae9e7ed9516972d37c87c7fb85011a";

export default node;
