/**
 * @generated SignedSource<<641742e1f6fe712b48d7cd5759fe6ea9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type ChallengeManageQuery$variables = {
  challengeId: string;
};
export type ChallengeManageQuery$data = {
  readonly viewer: {
    readonly challenge: {
      readonly id: string;
      readonly name: string;
    } | null | undefined;
  } | null | undefined;
};
export type ChallengeManageQuery = {
  response: ChallengeManageQuery$data;
  variables: ChallengeManageQuery$variables;
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
      "name": "name",
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
    "name": "ChallengeManageQuery",
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
    "name": "ChallengeManageQuery",
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
    "cacheID": "dc58217d500699381b5757fbf20fd26a",
    "id": null,
    "metadata": {},
    "name": "ChallengeManageQuery",
    "operationKind": "query",
    "text": "query ChallengeManageQuery(\n  $challengeId: ID!\n) {\n  viewer {\n    challenge(challengeId: $challengeId) {\n      id\n      name\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "a99e0e5042e631e9119a9efaaf354aea";

export default node;
