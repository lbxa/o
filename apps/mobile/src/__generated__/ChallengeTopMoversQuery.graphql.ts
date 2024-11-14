/**
 * @generated SignedSource<<e6d2d27925c15dcf28dc0395c069ff9d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type ChallengeTopMoversQuery$variables = {
  challengeId: string;
};
export type ChallengeTopMoversQuery$data = {
  readonly challengeActivityResults: ReadonlyArray<{
    readonly result: number;
    readonly user: {
      readonly firstName: string | null | undefined;
      readonly id: string;
      readonly lastName: string | null | undefined;
    };
  }> | null | undefined;
};
export type ChallengeTopMoversQuery = {
  response: ChallengeTopMoversQuery$data;
  variables: ChallengeTopMoversQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "challengeId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "challengeId",
    "variableName": "challengeId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "user",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "firstName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastName",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "result",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChallengeTopMoversQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ChallengeActivityResult",
        "kind": "LinkedField",
        "name": "challengeActivityResults",
        "plural": true,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/)
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
    "name": "ChallengeTopMoversQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ChallengeActivityResult",
        "kind": "LinkedField",
        "name": "challengeActivityResults",
        "plural": true,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8180b257f3069efd8db0909e1a7fd95d",
    "id": null,
    "metadata": {},
    "name": "ChallengeTopMoversQuery",
    "operationKind": "query",
    "text": "query ChallengeTopMoversQuery(\n  $challengeId: ID!\n) {\n  challengeActivityResults(challengeId: $challengeId) {\n    user {\n      id\n      firstName\n      lastName\n    }\n    result\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "44231a699e85671ae6fe9f9fffcf28f2";

export default node;
