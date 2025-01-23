/**
 * @generated SignedSource<<ea05b56bd37c91aa4cd49b2931442f6f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type ChallengeManageQuery$variables = {
  challengeId: string;
};
export type ChallengeManageQuery$data = {
  readonly viewer: {
    readonly challenge: {
      readonly " $fragmentSpreads": FragmentRefs<"ChallengeManage_challenge">;
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
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "Challenge",
            "kind": "LinkedField",
            "name": "challenge",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ChallengeManage_challenge"
              }
            ],
            "storageKey": null
          }
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
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "Challenge",
            "kind": "LinkedField",
            "name": "challenge",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3ae28e2f8785fa80c31173ea77102833",
    "id": null,
    "metadata": {},
    "name": "ChallengeManageQuery",
    "operationKind": "query",
    "text": "query ChallengeManageQuery(\n  $challengeId: ID!\n) {\n  viewer {\n    challenge(challengeId: $challengeId) {\n      ...ChallengeManage_challenge\n      id\n    }\n    id\n  }\n}\n\nfragment ChallengeManage_challenge on Challenge {\n  id\n  name\n  description\n}\n"
  }
};
})();

(node as any).hash = "72f1ed106bb966075e13d0804d32ecb2";

export default node;
