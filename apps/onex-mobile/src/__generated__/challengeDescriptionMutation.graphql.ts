/**
 * @generated SignedSource<<7066c63c3b280b2c0478322aec1bec2c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type ChallengeUpdateInput = {
  description?: string | null | undefined;
  endDate?: Date | null | undefined;
  id: string;
  name?: string | null | undefined;
  startDate?: Date | null | undefined;
};
export type challengeDescriptionMutation$variables = {
  input: ChallengeUpdateInput;
};
export type challengeDescriptionMutation$data = {
  readonly challengeUpdate: {
    readonly description: string | null | undefined;
    readonly id: string;
  };
};
export type challengeDescriptionMutation = {
  response: challengeDescriptionMutation$data;
  variables: challengeDescriptionMutation$variables;
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
        "name": "challengeUpdateInput",
        "variableName": "input"
      }
    ],
    "concreteType": "Challenge",
    "kind": "LinkedField",
    "name": "challengeUpdate",
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
        "name": "description",
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
    "name": "challengeDescriptionMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "challengeDescriptionMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b6d735ac93219e2157a8acf71ebe9675",
    "id": null,
    "metadata": {},
    "name": "challengeDescriptionMutation",
    "operationKind": "mutation",
    "text": "mutation challengeDescriptionMutation(\n  $input: ChallengeUpdateInput!\n) {\n  challengeUpdate(challengeUpdateInput: $input) {\n    id\n    description\n  }\n}\n"
  }
};
})();

(node as any).hash = "8abecfce11f841af6b2b91d42c095bc7";

export default node;
