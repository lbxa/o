/**
 * @generated SignedSource<<0f58f225ada9f4bdba89349dc72553e7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type ChallengeActivityGoal = "HIGHEST_NUMBER" | "LONGEST_DISTANCE" | "LONGEST_TIME" | "LOWEST_NUMBER" | "MOST_IMPROVED" | "SHORTEST_DISTANCE" | "SHORTEST_TIME" | "SPECIFIC_TARGET" | "%future added value";
export type ChallengeActivityType = "DISTANCE" | "REPETITIONS" | "SOCIAL" | "TIME_BASED" | "WEIGHTLIFTING" | "%future added value";
export type ChallengeActivityUnits = "FEET" | "HOURS" | "KILOGRAMS" | "KILOMETRES" | "METRES" | "MILES" | "MINUTES" | "NONE" | "PERCENT" | "POUNDS" | "SECONDS" | "%future added value";
export type ChallengeCadence = "BIWEEKLY" | "DAILY" | "MONTHLY" | "NONE" | "WEEKLY" | "YEARLY" | "%future added value";
export type ChallengeMode = "BLIND_TRUST" | "BUDDY_SYSTEM" | "VERIFIED_ONLY" | "%future added value";
export type ChallengeCreateInput = {
  cadence: ChallengeCadence;
  communityId: string;
  description: string;
  endDate: Date;
  mode: ChallengeMode;
  name: string;
  startDate: Date;
};
export type ChallengeActivityCreateInput = {
  goal: ChallengeActivityGoal;
  target?: number | null | undefined;
  type: ChallengeActivityType;
  unit: ChallengeActivityUnits;
};
export type ChallengeCreateMutation$variables = {
  challengeActivityCreateInput: ChallengeActivityCreateInput;
  challengeCreateInput: ChallengeCreateInput;
  connections: ReadonlyArray<string>;
};
export type ChallengeCreateMutation$data = {
  readonly challengeCreate: {
    readonly challengeEdge: {
      readonly cursor: string;
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"ChallengeCard_challenge">;
      };
    };
  };
};
export type ChallengeCreateMutation = {
  response: ChallengeCreateMutation$data;
  variables: ChallengeCreateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "challengeActivityCreateInput"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "challengeCreateInput"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v3 = [
  {
    "kind": "Variable",
    "name": "challengeActivityCreateInput",
    "variableName": "challengeActivityCreateInput"
  },
  {
    "kind": "Variable",
    "name": "challengeCreateInput",
    "variableName": "challengeCreateInput"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "firstThreeMembers",
    "plural": true,
    "selections": [
      (v5/*: any*/),
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
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ChallengeCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "ChallengeCreatePayload",
        "kind": "LinkedField",
        "name": "challengeCreate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ChallengeEdge",
            "kind": "LinkedField",
            "name": "challengeEdge",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Challenge",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ChallengeCard_challenge"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "ChallengeCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "ChallengeCreatePayload",
        "kind": "LinkedField",
        "name": "challengeCreate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ChallengeEdge",
            "kind": "LinkedField",
            "name": "challengeEdge",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Challenge",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
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
                    "name": "startDate",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endDate",
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
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "type",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "goal",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "unit",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "target",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "kind": "InlineFragment",
                        "selections": (v6/*: any*/),
                        "type": "Community",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v6/*: any*/),
                        "type": "Challenge",
                        "abstractKey": null
                      }
                    ],
                    "type": "Node",
                    "abstractKey": "__isNode"
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
            "filters": null,
            "handle": "prependEdge",
            "key": "",
            "kind": "LinkedHandle",
            "name": "challengeEdge",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "61634bc430cc5f763b9c068ad51a193b",
    "id": null,
    "metadata": {},
    "name": "ChallengeCreateMutation",
    "operationKind": "mutation",
    "text": "mutation ChallengeCreateMutation(\n  $challengeCreateInput: ChallengeCreateInput!\n  $challengeActivityCreateInput: ChallengeActivityCreateInput!\n) {\n  challengeCreate(challengeCreateInput: $challengeCreateInput, challengeActivityCreateInput: $challengeActivityCreateInput) {\n    challengeEdge {\n      cursor\n      node {\n        ...ChallengeCard_challenge\n        id\n      }\n    }\n  }\n}\n\nfragment ChallengeActivityPills_challenge on Challenge {\n  id\n  activity {\n    id\n    type\n    goal\n    target\n    unit\n  }\n}\n\nfragment ChallengeCard_challenge on Challenge {\n  id\n  name\n  description\n  startDate\n  endDate\n  memberCount\n  activity {\n    id\n    type\n    goal\n    unit\n    target\n  }\n  ...ChallengeActivityPills_challenge\n  ...SocialGallery\n}\n\nfragment SocialGallery on Node {\n  __isNode: __typename\n  ... on Community {\n    id\n    memberCount\n    firstThreeMembers {\n      id\n      firstName\n      lastName\n      avatarUrl(size: LARGE)\n    }\n  }\n  ... on Challenge {\n    id\n    memberCount\n    firstThreeMembers {\n      id\n      firstName\n      lastName\n      avatarUrl(size: LARGE)\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "62318ff8a2a28f49cb05c16ae720b1ff";

export default node;
