/**
 * @generated SignedSource<<2dca7f74ad672561a9de39909eb083c7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type ChallengeActivityGoal = "HIGHEST_NUMBER" | "LONGEST_TIME" | "LOWEST_NUMBER" | "MOST_IMPROVED" | "SHORTEST_TIME" | "SPECIFIC_TARGET" | "%future added value";
export type ChallengeActivityMeasurement = "COUNTING" | "DURATION" | "IMPROVEMENT" | "%future added value";
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
  measurement: ChallengeActivityMeasurement;
  target?: number | null | undefined;
  type: ChallengeActivityType;
  unit: ChallengeActivityUnits;
};
export type ChallengeCreateMutation$variables = {
  challengeActivityCreateInput: ChallengeActivityCreateInput;
  challengeCreateInput: ChallengeCreateInput;
};
export type ChallengeCreateMutation$data = {
  readonly challengeCreate: {
    readonly challengeEdge: {
      readonly cursor: string;
      readonly node: {
        readonly description: string | null | undefined;
        readonly id: string;
        readonly name: string;
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
v2 = [
  {
    "alias": null,
    "args": [
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
            "concreteType": "Challenge",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
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
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ChallengeCreateMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ChallengeCreateMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "a7e19c83429883f90612139836299d79",
    "id": null,
    "metadata": {},
    "name": "ChallengeCreateMutation",
    "operationKind": "mutation",
    "text": "mutation ChallengeCreateMutation(\n  $challengeCreateInput: ChallengeCreateInput!\n  $challengeActivityCreateInput: ChallengeActivityCreateInput!\n) {\n  challengeCreate(challengeCreateInput: $challengeCreateInput, challengeActivityCreateInput: $challengeActivityCreateInput) {\n    challengeEdge {\n      cursor\n      node {\n        id\n        name\n        description\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8e6d1e3b1889b559b57fc9b75a3e3961";

export default node;
