/**
 * @generated SignedSource<<494612b7b624203421891507220f07f6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type ChallengeActivityTopResultsHistoryPaginationQuery$variables = {
  count?: number | null | undefined;
  cursor?: string | null | undefined;
  id: string;
  userId: string;
};
export type ChallengeActivityTopResultsHistoryPaginationQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"ChallengeActivityTopResultsHistory_challenge">;
  } | null | undefined;
};
export type ChallengeActivityTopResultsHistoryPaginationQuery = {
  response: ChallengeActivityTopResultsHistoryPaginationQuery$data;
  variables: ChallengeActivityTopResultsHistoryPaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": 10,
  "kind": "LocalArgument",
  "name": "count"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "cursor"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "userId"
},
v4 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v5 = {
  "kind": "Variable",
  "name": "userId",
  "variableName": "userId"
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  },
  (v5/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ChallengeActivityTopResultsHistoryPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
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
              },
              (v5/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "ChallengeActivityTopResultsHistory_challenge"
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "ChallengeActivityTopResultsHistoryPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v6/*: any*/),
          (v7/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": (v8/*: any*/),
                "concreteType": "ChallengeActivityResultConnection",
                "kind": "LinkedField",
                "name": "resultsHistory",
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
                          (v7/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "User",
                            "kind": "LinkedField",
                            "name": "user",
                            "plural": false,
                            "selections": [
                              (v7/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "firstName",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "lastName",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "handle",
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
                                  (v7/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "currentStreak",
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
                            "kind": "ScalarField",
                            "name": "createdAt",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "formattedResult",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "targetReached",
                            "storageKey": null
                          },
                          (v6/*: any*/)
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
                "args": (v8/*: any*/),
                "filters": [
                  "userId"
                ],
                "handle": "connection",
                "key": "ChallengeActivityTopResultsHistory_challenge_resultsHistory",
                "kind": "LinkedHandle",
                "name": "resultsHistory"
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
    "cacheID": "13c202665fdb2d307f1285c81b5c8271",
    "id": null,
    "metadata": {},
    "name": "ChallengeActivityTopResultsHistoryPaginationQuery",
    "operationKind": "query",
    "text": "query ChallengeActivityTopResultsHistoryPaginationQuery(\n  $count: Int = 10\n  $cursor: String\n  $userId: ID!\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...ChallengeActivityTopResultsHistory_challenge_2PpJm0\n    id\n  }\n}\n\nfragment ChallengeActivityHistoryCard_challenge on ChallengeActivityResult {\n  id\n  user {\n    id\n    firstName\n    lastName\n    handle\n  }\n  createdAt\n  formattedResult\n  targetReached\n}\n\nfragment ChallengeActivityTopResultsHistoryUserDetails_challengeActivityResult on ChallengeActivityResult {\n  user {\n    id\n    firstName\n    lastName\n    handle\n    streak {\n      id\n      currentStreak\n    }\n  }\n}\n\nfragment ChallengeActivityTopResultsHistory_challenge_2PpJm0 on Challenge {\n  resultsHistory(userId: $userId, first: $count, after: $cursor) {\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ...ChallengeActivityHistoryCard_challenge\n        ...ChallengeActivityTopResultsHistoryUserDetails_challengeActivityResult\n        id\n        __typename\n      }\n    }\n  }\n  id\n}\n"
  }
};
})();

(node as any).hash = "5851782cad4b6d27905f188cc114158c";

export default node;
