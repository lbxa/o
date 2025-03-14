/**
 * @generated SignedSource<<af26f5283f59682d3d5a014d40cd8e92>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type HomeFeedPaginationQuery$variables = {
  count?: number | null | undefined;
  cursor?: string | null | undefined;
};
export type HomeFeedPaginationQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"HomeFeed_viewer">;
  } | null | undefined;
};
export type HomeFeedPaginationQuery = {
  response: HomeFeedPaginationQuery$data;
  variables: HomeFeedPaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": 10,
    "kind": "LocalArgument",
    "name": "count"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "goal",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "unit",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "target",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v10 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "firstThreeMembers",
    "plural": true,
    "selections": [
      (v1/*: any*/),
      (v8/*: any*/),
      (v9/*: any*/),
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
        "name": "avatarUrl",
        "storageKey": "avatarUrl(size:\"LARGE\")"
      }
    ],
    "storageKey": null
  }
],
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "Challenge",
  "kind": "LinkedField",
  "name": "challenge",
  "plural": false,
  "selections": [
    (v1/*: any*/),
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "memberCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ChallengeActivity",
      "kind": "LinkedField",
      "name": "activity",
      "plural": false,
      "selections": [
        (v1/*: any*/),
        (v4/*: any*/),
        (v5/*: any*/),
        (v6/*: any*/),
        (v7/*: any*/)
      ],
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": (v10/*: any*/),
          "type": "Community",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v10/*: any*/),
          "type": "Challenge",
          "abstractKey": null
        }
      ],
      "type": "Node",
      "abstractKey": "__isNode"
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeFeedPaginationQuery",
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
            "args": [
              {
                "kind": "Variable",
                "name": "count",
                "variableName": "count"
              },
              {
                "kind": "Variable",
                "name": "cursor",
                "variableName": "cursor"
              }
            ],
            "kind": "FragmentSpread",
            "name": "HomeFeed_viewer"
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
    "name": "HomeFeedPaginationQuery",
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
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "HomeFeedConnection",
            "kind": "LinkedField",
            "name": "homeFeed",
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
                "concreteType": "HomeFeedEdge",
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
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
                      {
                        "kind": "TypeDiscriminator",
                        "abstractKey": "__isHomeFeedItem"
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v1/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "daysUntilStart",
                            "storageKey": null
                          },
                          (v11/*: any*/)
                        ],
                        "type": "StartingSoonChallenge",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v1/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "daysUntilEnd",
                            "storageKey": null
                          },
                          (v11/*: any*/)
                        ],
                        "type": "EndingSoonChallenge",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "User",
                            "kind": "LinkedField",
                            "name": "user",
                            "plural": false,
                            "selections": [
                              (v1/*: any*/),
                              (v8/*: any*/),
                              (v9/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "avatarUrl",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Challenge",
                            "kind": "LinkedField",
                            "name": "challenge",
                            "plural": false,
                            "selections": [
                              (v1/*: any*/),
                              (v3/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ChallengeActivity",
                                "kind": "LinkedField",
                                "name": "activity",
                                "plural": false,
                                "selections": [
                                  (v1/*: any*/),
                                  (v6/*: any*/),
                                  (v5/*: any*/),
                                  (v4/*: any*/),
                                  (v7/*: any*/)
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Community",
                                "kind": "LinkedField",
                                "name": "community",
                                "plural": false,
                                "selections": [
                                  (v1/*: any*/),
                                  (v3/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "isVerified",
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
                            "concreteType": "ChallengeActivityResult",
                            "kind": "LinkedField",
                            "name": "activityResult",
                            "plural": false,
                            "selections": [
                              (v1/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "formattedResult",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "UserRecord",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v1/*: any*/)
                        ],
                        "type": "Node",
                        "abstractKey": "__isNode"
                      }
                    ],
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
            "args": (v2/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "HomeFeed_viewer_homeFeed",
            "kind": "LinkedHandle",
            "name": "homeFeed"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "917f4bb4b8455dd220b8eebdebd7b5c7",
    "id": null,
    "metadata": {},
    "name": "HomeFeedPaginationQuery",
    "operationKind": "query",
    "text": "query HomeFeedPaginationQuery(\n  $count: Int = 10\n  $cursor: String\n) {\n  viewer {\n    ...HomeFeed_viewer_1G22uz\n    id\n  }\n}\n\nfragment ChallengeActivityPills_challenge on Challenge {\n  id\n  activity {\n    id\n    type\n    goal\n    target\n    unit\n  }\n}\n\nfragment EndingSoonChallengeCard_challenge on EndingSoonChallenge {\n  id\n  daysUntilEnd\n  challenge {\n    id\n    name\n    memberCount\n    activity {\n      id\n      type\n      goal\n      unit\n      target\n    }\n    ...SocialGallery\n    ...ChallengeActivityPills_challenge\n  }\n}\n\nfragment HomeFeedItem_item on HomeFeedItem {\n  __isHomeFeedItem: __typename\n  ... on StartingSoonChallenge {\n    __typename\n    ...StartingSoonChallengeCard_challenge\n  }\n  ... on EndingSoonChallenge {\n    __typename\n    ...EndingSoonChallengeCard_challenge\n  }\n  ... on UserRecord {\n    __typename\n    ...UserRecordCard_userRecord\n  }\n}\n\nfragment HomeFeed_viewer_1G22uz on Viewer {\n  id\n  homeFeed(first: $count, after: $cursor) {\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        __typename\n        ...HomeFeedItem_item\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment SocialGallery on Node {\n  __isNode: __typename\n  ... on Community {\n    id\n    memberCount\n    firstThreeMembers {\n      id\n      firstName\n      lastName\n      avatarUrl(size: LARGE)\n    }\n  }\n  ... on Challenge {\n    id\n    memberCount\n    firstThreeMembers {\n      id\n      firstName\n      lastName\n      avatarUrl(size: LARGE)\n    }\n  }\n}\n\nfragment StartingSoonChallengeCard_challenge on StartingSoonChallenge {\n  id\n  daysUntilStart\n  challenge {\n    id\n    name\n    memberCount\n    activity {\n      id\n      type\n      goal\n      unit\n      target\n    }\n    ...SocialGallery\n    ...ChallengeActivityPills_challenge\n  }\n}\n\nfragment UserRecordCard_userRecord on UserRecord {\n  user {\n    id\n    firstName\n    lastName\n    avatarUrl\n  }\n  challenge {\n    id\n    name\n    activity {\n      id\n      unit\n      goal\n      type\n      target\n    }\n    community {\n      id\n      name\n      isVerified\n    }\n  }\n  activityResult {\n    id\n    formattedResult\n  }\n}\n"
  }
};
})();

(node as any).hash = "64dbad00bdf5c1611b5961d25a95c32d";

export default node;
