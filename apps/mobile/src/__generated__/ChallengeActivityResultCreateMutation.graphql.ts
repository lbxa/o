/**
 * @generated SignedSource<<ba4805ca437f63dc93cd052d45791235>>
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
    readonly id: string;
    readonly result: number;
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
    "concreteType": "ChallengeActivityResult",
    "kind": "LinkedField",
    "name": "challengeActivityResultCreate",
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
    "cacheID": "a5b05fc9b80ff94bdbb757ac6d110d79",
    "id": null,
    "metadata": {},
    "name": "ChallengeActivityResultCreateMutation",
    "operationKind": "mutation",
    "text": "mutation ChallengeActivityResultCreateMutation(\n  $input: ChallengeActivityResultCreateInput!\n) {\n  challengeActivityResultCreate(challengeActivityResultCreateInput: $input) {\n    id\n    result\n  }\n}\n"
  }
};
})();

(node as any).hash = "8fd65c2d83e5d12a9facbaea023288fb";

export default node;
