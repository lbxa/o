/**
 * @generated SignedSource<<5374551a1c9e7c9c85c11dc63922c7a8>>
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
        readonly activity: {
          readonly goal: ChallengeActivityGoal;
          readonly id: string;
          readonly measurement: ChallengeActivityMeasurement;
          readonly target: number | null | undefined;
          readonly type: ChallengeActivityType;
          readonly unit: ChallengeActivityUnits;
        };
        readonly description: string | null | undefined;
        readonly endDate: Date | null | undefined;
        readonly id: string;
        readonly name: string;
        readonly startDate: Date | null | undefined;
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
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
              (v2/*: any*/),
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
                "concreteType": "ChallengeActivity",
                "kind": "LinkedField",
                "name": "activity",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
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
                    "name": "measurement",
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
    "selections": (v3/*: any*/),
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
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "5cfbbe3f68050f38ce3628ac01ee5d03",
    "id": null,
    "metadata": {},
    "name": "ChallengeCreateMutation",
    "operationKind": "mutation",
    "text": "mutation ChallengeCreateMutation(\n  $challengeCreateInput: ChallengeCreateInput!\n  $challengeActivityCreateInput: ChallengeActivityCreateInput!\n) {\n  challengeCreate(challengeCreateInput: $challengeCreateInput, challengeActivityCreateInput: $challengeActivityCreateInput) {\n    challengeEdge {\n      cursor\n      node {\n        id\n        name\n        description\n        startDate\n        endDate\n        activity {\n          id\n          type\n          measurement\n          goal\n          unit\n          target\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "02aff33a7227c808935944a5d71270de";

export default node;
