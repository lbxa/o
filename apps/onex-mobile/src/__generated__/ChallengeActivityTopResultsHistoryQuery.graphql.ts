/**
 * @generated SignedSource<<aa1ff3e2ee8d27183e95df7fbf678f11>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type ChallengeActivityTopResultsHistoryQuery$variables = {
  challengeId: string;
  userId: string;
};
export type ChallengeActivityTopResultsHistoryQuery$data = {
  readonly viewer: {
    readonly challenge: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"ChallengeActivityTopResultsHistory_challenge">;
    } | null | undefined;
    readonly user: {
      readonly id: string;
    } | null | undefined;
  } | null | undefined;
};
export type ChallengeActivityTopResultsHistoryQuery = {
  response: ChallengeActivityTopResultsHistoryQuery$data;
  variables: ChallengeActivityTopResultsHistoryQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "challengeId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userId"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "user",
  "plural": false,
  "selections": [
    (v1/*: any*/)
  ],
  "storageKey": null
},
v3 = [
  {
    "kind": "Variable",
    "name": "challengeId",
    "variableName": "challengeId"
  }
],
v4 = {
  "kind": "Variable",
  "name": "userId",
  "variableName": "userId"
},
v5 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  (v4/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChallengeActivityTopResultsHistoryQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "Challenge",
            "kind": "LinkedField",
            "name": "challenge",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "args": [
                  (v4/*: any*/)
                ],
                "kind": "FragmentSpread",
                "name": "ChallengeActivityTopResultsHistory_challenge"
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
    "name": "ChallengeActivityTopResultsHistoryQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "Challenge",
            "kind": "LinkedField",
            "name": "challenge",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": (v5/*: any*/),
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
                          (v1/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "User",
                            "kind": "LinkedField",
                            "name": "user",
                            "plural": false,
                            "selections": [
                              (v1/*: any*/),
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
                                  (v1/*: any*/),
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
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v5/*: any*/),
                "filters": [
                  "userId"
                ],
                "handle": "connection",
                "key": "ChallengeActivityTopResultsHistory_challenge_resultsHistory",
                "kind": "LinkedHandle",
                "name": "resultsHistory"
              }
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e9c2d91cacee0159bedf5a6e4ba54f7a",
    "id": null,
    "metadata": {},
    "name": "ChallengeActivityTopResultsHistoryQuery",
    "operationKind": "query",
    "text": "query ChallengeActivityTopResultsHistoryQuery(\n  $challengeId: ID!\n  $userId: ID!\n) {\n  viewer {\n    user {\n      id\n    }\n    challenge(challengeId: $challengeId) {\n      id\n      ...ChallengeActivityTopResultsHistory_challenge_1xxw8p\n    }\n    id\n  }\n}\n\nfragment ChallengeActivityHistoryCard_challenge on ChallengeActivityResult {\n  id\n  user {\n    id\n    firstName\n    lastName\n    handle\n  }\n  createdAt\n  formattedResult\n}\n\nfragment ChallengeActivityTopResultsHistoryUserDetails_challengeActivityResult on ChallengeActivityResult {\n  user {\n    id\n    firstName\n    lastName\n    handle\n    streak {\n      id\n      currentStreak\n    }\n  }\n}\n\nfragment ChallengeActivityTopResultsHistory_challenge_1xxw8p on Challenge {\n  resultsHistory(userId: $userId, first: 10) {\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ...ChallengeActivityHistoryCard_challenge\n        ...ChallengeActivityTopResultsHistoryUserDetails_challengeActivityResult\n        id\n        __typename\n      }\n    }\n  }\n  id\n}\n"
  }
};
})();

(node as any).hash = "4ff222147eb1091403fd1af0def9b6ad";

export default node;
