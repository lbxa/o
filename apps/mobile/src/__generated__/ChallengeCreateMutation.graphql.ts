/**
 * @generated SignedSource<<1cf98628397f841ffdae99187c0e75eb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ChallengeCadence = "BIWEEKLY" | "DAILY" | "MONTHLY" | "NONE" | "WEEKLY" | "YEARLY" | "%future added value";
export type ChallengeMode = "BLIND_TRUST" | "VERIFIED_ONLY" | "%future added value";
export type ChallengeCreateInput = {
  cadence: ChallengeCadence;
  communityId: string;
  description: string;
  endDate: Date;
  mode: ChallengeMode;
  name: string;
  startDate: Date;
};
export type ChallengeCreateMutation$variables = {
  challengeCreateInput: ChallengeCreateInput;
};
export type ChallengeCreateMutation$data = {
  readonly challengeCreate: {
    readonly description: string | null | undefined;
    readonly name: string;
  };
};
export type ChallengeCreateMutation = {
  response: ChallengeCreateMutation$data;
  variables: ChallengeCreateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "challengeCreateInput"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "challengeCreateInput",
    "variableName": "challengeCreateInput"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChallengeCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Challenge",
        "kind": "LinkedField",
        "name": "challengeCreate",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChallengeCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Challenge",
        "kind": "LinkedField",
        "name": "challengeCreate",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "31bc89e8cd3bdc5b734417bb745c9bf6",
    "id": null,
    "metadata": {},
    "name": "ChallengeCreateMutation",
    "operationKind": "mutation",
    "text": "mutation ChallengeCreateMutation(\n  $challengeCreateInput: ChallengeCreateInput!\n) {\n  challengeCreate(challengeCreateInput: $challengeCreateInput) {\n    name\n    description\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "3fde22a2e8b8c2bb30fa334576a6dde9";

export default node;
