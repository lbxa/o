/**
 * @generated SignedSource<<b53b4a272be940385973953dbeec739d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type ChallengeActivityTopResultsRefetchQuery$variables = {
  challengeId?: string | null | undefined;
  id: string;
};
export type ChallengeActivityTopResultsRefetchQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"ChallengeActivityTopResultsFragment_challenge">;
  } | null | undefined;
};
export type ChallengeActivityTopResultsRefetchQuery = {
  response: ChallengeActivityTopResultsRefetchQuery$data;
  variables: ChallengeActivityTopResultsRefetchQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "challengeId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = [
  {
    "kind": "Variable",
    "name": "challengeId",
    "variableName": "challengeId"
  }
],
v3 = {
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
    "name": "ChallengeActivityTopResultsRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": (v2/*: any*/),
            "kind": "FragmentSpread",
            "name": "ChallengeActivityTopResultsFragment_challenge"
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
    "name": "ChallengeActivityTopResultsRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": (v2/*: any*/),
                "concreteType": "ChallengeActivityResult",
                "kind": "LinkedField",
                "name": "activityTopResults",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "user",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "result",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ChallengeActivity",
                    "kind": "LinkedField",
                    "name": "activity",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "measurement",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "Challenge",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "55e353d0ce87a5ee1212f6c71bf7ba8a",
    "id": null,
    "metadata": {},
    "name": "ChallengeActivityTopResultsRefetchQuery",
    "operationKind": "query",
    "text": "query ChallengeActivityTopResultsRefetchQuery(\n  $challengeId: ID = null\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...ChallengeActivityTopResultsFragment_challenge_3rMhzr\n    id\n  }\n}\n\nfragment ChallengeActivityTopResultsFragment_challenge_3rMhzr on Challenge {\n  id\n  activityTopResults(challengeId: $challengeId) {\n    id\n    user {\n      id\n      firstName\n      lastName\n    }\n    result\n    activity {\n      id\n      measurement\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d36d60effacf3061970e47b3d611b842";

export default node;
