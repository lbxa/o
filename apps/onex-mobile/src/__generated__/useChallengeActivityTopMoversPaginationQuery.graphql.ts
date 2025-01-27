/**
 * @generated SignedSource<<69ee8bcde9f1beea7c8aa2d00edf5827>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type useChallengeActivityTopMoversPaginationQuery$variables = {
  count?: number | null | undefined;
  cursor?: string | null | undefined;
  id: string;
};
export type useChallengeActivityTopMoversPaginationQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"useChallengeActivityTopMoversFragment_challenge">;
  } | null | undefined;
};
export type useChallengeActivityTopMoversPaginationQuery = {
  response: useChallengeActivityTopMoversPaginationQuery$data;
  variables: useChallengeActivityTopMoversPaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": 4,
    "kind": "LocalArgument",
    "name": "count"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
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
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "handle",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useChallengeActivityTopMoversPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
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
            "name": "useChallengeActivityTopMoversFragment_challenge"
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
    "name": "useChallengeActivityTopMoversPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": (v4/*: any*/),
                "concreteType": "ChallengeActivityResultConnection",
                "kind": "LinkedField",
                "name": "activityTopMovers",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ChallengeActivityResultEdge",
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
                        "concreteType": "ChallengeActivityResult",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "User",
                            "kind": "LinkedField",
                            "name": "user",
                            "plural": false,
                            "selections": [
                              (v3/*: any*/),
                              (v5/*: any*/),
                              (v6/*: any*/),
                              (v7/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "UserStreak",
                                "kind": "LinkedField",
                                "name": "streak",
                                "plural": false,
                                "selections": [
                                  (v3/*: any*/),
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
                                  (v3/*: any*/),
                                  (v5/*: any*/),
                                  (v6/*: any*/),
                                  (v7/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "result",
                            "storageKey": null
                          },
                          (v2/*: any*/)
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
                        "name": "hasNextPage",
                        "storageKey": null
                      },
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
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v4/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "ChallengeActivityTopMoversFragment_activityTopMovers",
                "kind": "LinkedHandle",
                "name": "activityTopMovers"
              }
            ],
            "type": "Challenge",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e41a69c5ab8cbdd674f8caec333d7fc9",
    "id": null,
    "metadata": {},
    "name": "useChallengeActivityTopMoversPaginationQuery",
    "operationKind": "query",
    "text": "query useChallengeActivityTopMoversPaginationQuery(\n  $count: Int = 4\n  $cursor: String\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...useChallengeActivityTopMoversFragment_challenge_1G22uz\n    id\n  }\n}\n\nfragment TopMoverCard_challenge on ChallengeActivityResult {\n  id\n  user {\n    ...UserProfileRow_user\n    id\n  }\n  result\n}\n\nfragment UserProfileRow_user on User {\n  id\n  firstName\n  lastName\n  handle\n  streak {\n    id\n    currentStreak\n  }\n  mutualCount\n  firstMutualFriend {\n    id\n    firstName\n    lastName\n    handle\n  }\n}\n\nfragment useChallengeActivityTopMoversFragment_challenge_1G22uz on Challenge {\n  activityTopMovers(first: $count, after: $cursor) {\n    edges {\n      cursor\n      node {\n        id\n        ...TopMoverCard_challenge\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      startCursor\n      endCursor\n    }\n  }\n  id\n}\n"
  }
};
})();

(node as any).hash = "03a86e3a0445f9e8a66c3744840a8efc";

export default node;
