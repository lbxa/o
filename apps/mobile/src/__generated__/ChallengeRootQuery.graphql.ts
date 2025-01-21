/**
 * @generated SignedSource<<c90ba85e8d8386d03d6dd2261ae98a43>>
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
      readonly " $fragmentSpreads": FragmentRefs<"ChallengeActivityPills_challenge" | "ChallengeDetails_challenge" | "ChallengeRootName_challenge" | "useChallengeActivityTopMoversFragment_challenge" | "useChallengeActivityTopResultsFragment_challenge">;
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
v1 = [
  {
    "kind": "Variable",
    "name": "challengeId",
    "variableName": "challengeId"
  }
],
v2 = [
  {
    "kind": "Literal",
    "name": "count",
    "value": 4
  }
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
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "unit",
  "storageKey": null
},
v6 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 4
  }
],
v7 = [
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
              },
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
              (v4/*: any*/),
              (v5/*: any*/)
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
            "args": (v1/*: any*/),
            "concreteType": "Challenge",
            "kind": "LinkedField",
            "name": "challenge",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ChallengeRootName_challenge"
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
                "args": (v2/*: any*/),
                "kind": "FragmentSpread",
                "name": "useChallengeActivityTopResultsFragment_challenge"
              },
              {
                "args": (v2/*: any*/),
                "kind": "FragmentSpread",
                "name": "useChallengeActivityTopMoversFragment_challenge"
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
            "args": (v1/*: any*/),
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
                  (v5/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v6/*: any*/),
                "concreteType": "ChallengeActivityResultConnection",
                "kind": "LinkedField",
                "name": "activityTopResults",
                "plural": false,
                "selections": (v7/*: any*/),
                "storageKey": "activityTopResults(first:4)"
              },
              {
                "alias": null,
                "args": (v6/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "ChallengeActivityTopResultsFragment_activityTopResults",
                "kind": "LinkedHandle",
                "name": "activityTopResults"
              },
              {
                "alias": null,
                "args": (v6/*: any*/),
                "concreteType": "ChallengeActivityResultConnection",
                "kind": "LinkedField",
                "name": "activityTopMovers",
                "plural": false,
                "selections": (v7/*: any*/),
                "storageKey": "activityTopMovers(first:4)"
              },
              {
                "alias": null,
                "args": (v6/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "ChallengeActivityTopMoversFragment_activityTopMovers",
                "kind": "LinkedHandle",
                "name": "activityTopMovers"
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
    "cacheID": "194d3b2609987215bd21210ed5c08edf",
    "id": null,
    "metadata": {},
    "name": "ChallengeRootQuery",
    "operationKind": "query",
    "text": "query ChallengeRootQuery(\n  $challengeId: ID!\n) {\n  viewer {\n    challenge(challengeId: $challengeId) {\n      ...ChallengeRootName_challenge\n      ...ChallengeDetails_challenge\n      ...ChallengeActivityPills_challenge\n      ...useChallengeActivityTopResultsFragment_challenge_2X24QL\n      ...useChallengeActivityTopMoversFragment_challenge_2X24QL\n      id\n    }\n    id\n  }\n}\n\nfragment ChallengeActivityPills_challenge on Challenge {\n  id\n  activity {\n    id\n    type\n    goal\n    target\n    unit\n  }\n}\n\nfragment ChallengeDetails_challenge on Challenge {\n  id\n  name\n  description\n  memberCount\n  activity {\n    id\n    type\n    goal\n  }\n}\n\nfragment ChallengeRootName_challenge on Challenge {\n  id\n  name\n}\n\nfragment UserResultCard_challenge on ChallengeActivityResult {\n  id\n  user {\n    id\n    firstName\n    lastName\n    streak {\n      id\n      currentStreak\n    }\n  }\n  result\n  activity {\n    id\n    goal\n    unit\n  }\n}\n\nfragment useChallengeActivityTopMoversFragment_challenge_2X24QL on Challenge {\n  activityTopMovers(first: 4) {\n    edges {\n      cursor\n      node {\n        id\n        ...UserResultCard_challenge\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      startCursor\n      endCursor\n    }\n  }\n  id\n}\n\nfragment useChallengeActivityTopResultsFragment_challenge_2X24QL on Challenge {\n  id\n  activityTopResults(first: 4) {\n    edges {\n      cursor\n      node {\n        id\n        ...UserResultCard_challenge\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      startCursor\n      endCursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "aa9f0979b358c79b6b273d674714d323";

export default node;
