/**
 * @generated SignedSource<<5a8f4dddc07760f30ae44cce03c52198>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type ChallengeActivityResultCreateInput = {
  activityId: string;
  challengeId: string;
  result: number;
  userId: string;
};
export type ChallengeActivityResultCreateMutation$variables = {
  input: ChallengeActivityResultCreateInput;
};
export type ChallengeActivityResultCreateMutation$data = {
  readonly challengeActivityResultCreate: {
    readonly challengeActivityResultEdge: {
      readonly node: {
        readonly id: string;
        readonly result: number;
      };
    };
  };
};
export type ChallengeActivityResultCreateMutation = {
  response: ChallengeActivityResultCreateMutation$data;
  variables: ChallengeActivityResultCreateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "challengeActivityResultCreateInput",
        "variableName": "input"
      }
    ],
    "concreteType": "CreateChallengeActivityResultPayload",
    "kind": "LinkedField",
    "name": "challengeActivityResultCreate",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ChallengeActivityResultEdge",
        "kind": "LinkedField",
        "name": "challengeActivityResultEdge",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ChallengeActivityResult",
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
                "name": "result",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChallengeActivityResultCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChallengeActivityResultCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "13c3792abd5fe5ea3fed586c236fabfd",
    "id": null,
    "metadata": {},
    "name": "ChallengeActivityResultCreateMutation",
    "operationKind": "mutation",
    "text": "mutation ChallengeActivityResultCreateMutation(\n  $input: ChallengeActivityResultCreateInput!\n) {\n  challengeActivityResultCreate(challengeActivityResultCreateInput: $input) {\n    challengeActivityResultEdge {\n      node {\n        id\n        result\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "938f0de5994e8cee6c241e44ab673de7";

export default node;
