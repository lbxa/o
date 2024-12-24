/**
 * @generated SignedSource<<a481ae289d0b28ece17ad53bf0b585e8>>
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
export type challengeNameMutation$variables = {
  input: ChallengeUpdateInput;
};
export type challengeNameMutation$data = {
  readonly challengeUpdate: {
    readonly id: string;
    readonly name: string;
  };
};
export type challengeNameMutation = {
  response: challengeNameMutation$data;
  variables: challengeNameMutation$variables;
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
        "name": "name",
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
    "name": "challengeNameMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "challengeNameMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "0a6dd00d973c4d7bab9a865261385a06",
    "id": null,
    "metadata": {},
    "name": "challengeNameMutation",
    "operationKind": "mutation",
    "text": "mutation challengeNameMutation(\n  $input: ChallengeUpdateInput!\n) {\n  challengeUpdate(challengeUpdateInput: $input) {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "d99f5b89482b572e8d359efd31d3ecd1";

export default node;
