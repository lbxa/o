/**
 * @generated SignedSource<<5d28a4164749048b1e6df808a2bc4310>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type ChallengeActivityResultCreateInput = {
  activityId: string;
  challengeId: string;
  result: number;
  userId: string;
};
export type useChallengeActivityResultCreateMutation$variables = {
  input: ChallengeActivityResultCreateInput;
};
export type useChallengeActivityResultCreateMutation$data = {
  readonly challengeActivityResultCreate: {
    readonly challengeActivityResultEdge: {
      readonly node: {
        readonly id: string;
        readonly result: number;
      };
    };
  };
};
export type useChallengeActivityResultCreateMutation = {
  response: useChallengeActivityResultCreateMutation$data;
  variables: useChallengeActivityResultCreateMutation$variables;
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
    "name": "useChallengeActivityResultCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useChallengeActivityResultCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "51613a3beceb3ef293c26f58e02729ba",
    "id": null,
    "metadata": {},
    "name": "useChallengeActivityResultCreateMutation",
    "operationKind": "mutation",
    "text": "mutation useChallengeActivityResultCreateMutation(\n  $input: ChallengeActivityResultCreateInput!\n) {\n  challengeActivityResultCreate(challengeActivityResultCreateInput: $input) {\n    challengeActivityResultEdge {\n      node {\n        id\n        result\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "aa54f4c2cbcf09a1329dd47099943ba9";

export default node;
