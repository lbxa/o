/**
 * @generated SignedSource<<f0998ad07fcf7d82fefcd56fd1bb5210>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type ChallengeDetailsQuery$variables = {
  id: string;
};
export type ChallengeDetailsQuery$data = {
  readonly challenge: {
    readonly description: string | null | undefined;
    readonly id: string;
    readonly name: string;
  } | null | undefined;
};
export type ChallengeDetailsQuery = {
  response: ChallengeDetailsQuery$data;
  variables: ChallengeDetailsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Challenge",
    "kind": "LinkedField",
    "name": "challenge",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChallengeDetailsQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChallengeDetailsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5fe7ab6595b27a122e131c24c05db7d3",
    "id": null,
    "metadata": {},
    "name": "ChallengeDetailsQuery",
    "operationKind": "query",
    "text": "query ChallengeDetailsQuery(\n  $id: ID!\n) {\n  challenge(id: $id) {\n    id\n    name\n    description\n  }\n}\n"
  }
};
})();

(node as any).hash = "89e66fda1cb85aa1306f212534fcf1a8";

export default node;
