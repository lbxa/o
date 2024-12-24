/**
 * @generated SignedSource<<9c7979f97b73e1134acf9381801611c9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type challengeDescriptionQuery$variables = {
  challengeId: string;
};
export type challengeDescriptionQuery$data = {
  readonly viewer: {
    readonly challenge: {
      readonly description: string | null | undefined;
      readonly id: string;
    } | null | undefined;
  } | null | undefined;
};
export type challengeDescriptionQuery = {
  response: challengeDescriptionQuery$data;
  variables: challengeDescriptionQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "challengeId"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": [
    {
      "kind": "Variable",
      "name": "challengeId",
      "variableName": "challengeId"
    }
  ],
  "concreteType": "Challenge",
  "kind": "LinkedField",
  "name": "challenge",
  "plural": false,
  "selections": [
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "challengeDescriptionQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "challengeDescriptionQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "60a4eadbb7f71b620d80029d82f82d52",
    "id": null,
    "metadata": {},
    "name": "challengeDescriptionQuery",
    "operationKind": "query",
    "text": "query challengeDescriptionQuery(\n  $challengeId: ID!\n) {\n  viewer {\n    challenge(challengeId: $challengeId) {\n      id\n      description\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "34821ce58aaaac579d1c82beaa680424";

export default node;
