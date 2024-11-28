/**
 * @generated SignedSource<<dc707c70a4952555f3df56d480bab48d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type ChallengeRootQuery$variables = {
  challengeId: string;
};
export type ChallengeRootQuery$data = {
  readonly viewer: {
    readonly challenge: {
      readonly " $fragmentSpreads": FragmentRefs<"ChallengeActivityPills_challenge" | "ChallengeActivityTopResultsFragment_challenge" | "ChallengeDetails_challenge" | "ChallengeHeader_challenge">;
    } | null | undefined;
  } | null | undefined;
};
export type ChallengeRootQuery = {
  response: ChallengeRootQuery$data;
  variables: ChallengeRootQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "challengeId"
  }
],
v1 = {
  "kind": "Variable",
  "name": "challengeId",
  "variableName": "challengeId"
},
v2 = [
  (v1/*: any*/)
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "goal",
  "storageKey": null
},
v5 = [
  (v1/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChallengeRootQuery",
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
            "args": (v2/*: any*/),
            "concreteType": "Challenge",
            "kind": "LinkedField",
            "name": "challenge",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ChallengeHeader_challenge"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ChallengeDetails_challenge"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ChallengeActivityPills_challenge"
              },
              {
                "args": [
                  (v1/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "count",
                    "value": 10
                  }
                ],
                "kind": "FragmentSpread",
                "name": "ChallengeActivityTopResultsFragment_challenge"
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
    "name": "ChallengeRootQuery",
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
            "args": (v2/*: any*/),
            "concreteType": "Challenge",
            "kind": "LinkedField",
            "name": "challenge",
            "plural": false,
            "selections": [
              (v3/*: any*/),
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
                "name": "description",
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
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "type",
                    "storageKey": null
                  },
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "target",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "unit",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v5/*: any*/),
                "concreteType": "ChallengeActivityResultConnection",
                "kind": "LinkedField",
                "name": "activityTopResults",
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
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ChallengeActivity",
                            "kind": "LinkedField",
                            "name": "activity",
                            "plural": false,
                            "selections": [
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
                "args": (v5/*: any*/),
                "filters": [
                  "challengeId"
                ],
                "handle": "connection",
                "key": "ChallengeActivityTopResultsFragment_activityTopResults",
                "kind": "LinkedHandle",
                "name": "activityTopResults"
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f4c5d5fb27644fd594d00009055699b0",
    "id": null,
    "metadata": {},
    "name": "ChallengeRootQuery",
    "operationKind": "query",
    "text": "query ChallengeRootQuery(\n  $challengeId: ID!\n) {\n  viewer {\n    challenge(challengeId: $challengeId) {\n      ...ChallengeHeader_challenge\n      ...ChallengeDetails_challenge\n      ...ChallengeActivityPills_challenge\n      ...ChallengeActivityTopResultsFragment_challenge_49OuZa\n      id\n    }\n    id\n  }\n}\n\nfragment ChallengeActivityPills_challenge on Challenge {\n  id\n  activity {\n    id\n    type\n    goal\n    target\n    unit\n  }\n}\n\nfragment ChallengeActivityTopResultsFragment_challenge_49OuZa on Challenge {\n  activityTopResults(challengeId: $challengeId, first: 10) {\n    edges {\n      cursor\n      node {\n        id\n        ...UserResultCard_challenge\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      startCursor\n      endCursor\n    }\n  }\n  id\n}\n\nfragment ChallengeDetails_challenge on Challenge {\n  id\n  name\n  description\n  activity {\n    id\n    type\n    goal\n  }\n}\n\nfragment ChallengeHeader_challenge on Challenge {\n  id\n  name\n}\n\nfragment UserResultCard_challenge on ChallengeActivityResult {\n  id\n  user {\n    id\n    firstName\n    lastName\n  }\n  result\n  activity {\n    id\n    goal\n  }\n}\n"
  }
};
})();

(node as any).hash = "ba6568b59f3d5f78c5b721ca85e1e0a1";

export default node;
