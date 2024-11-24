/**
 * @generated SignedSource<<54718d6463ed074b42b9020a1c64fc17>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type ChallengeTopMoversQuery$variables = {
  challengeId: string;
  count?: number | null | undefined;
  cursor?: string | null | undefined;
};
export type ChallengeTopMoversQuery$data = {
  readonly challengeActivityResults: {
    readonly edges: ReadonlyArray<{
      readonly cursor: string;
      readonly node: {
        readonly result: number;
        readonly user: {
          readonly firstName: string | null | undefined;
          readonly id: string;
          readonly lastName: string | null | undefined;
        };
      };
    }> | null | undefined;
    readonly pageInfo: {
      readonly endCursor: string | null | undefined;
      readonly hasNextPage: boolean;
      readonly startCursor: string | null | undefined;
    };
  };
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
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "count"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor"
  }
],
v1 = {
  "kind": "Variable",
  "name": "challengeId",
  "variableName": "challengeId"
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
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
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "result",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "PageInfo",
  "kind": "LinkedField",
  "name": "pageInfo",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasNextPage",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "startCursor",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endCursor",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v8 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  (v1/*: any*/),
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChallengeTopMoversQuery",
    "selections": [
      {
        "alias": "challengeActivityResults",
        "args": [
          (v1/*: any*/)
        ],
        "concreteType": "ChallengeActivityResultConnection",
        "kind": "LinkedField",
        "name": "__ChallengeTopMoversQuery_challengeActivityResults_connection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ChallengeActivityResultEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ChallengeActivityResult",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v7/*: any*/)
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
        "args": (v8/*: any*/),
        "concreteType": "ChallengeActivityResultConnection",
        "kind": "LinkedField",
        "name": "challengeActivityResults",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ChallengeActivityResultEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ChallengeActivityResult",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v3/*: any*/),
                  (v6/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v7/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v8/*: any*/),
        "filters": [
          "challengeId"
        ],
        "handle": "connection",
        "key": "ChallengeTopMoversQuery_challengeActivityResults",
        "kind": "LinkedHandle",
        "name": "challengeActivityResults"
      }
    ]
  },
  "params": {
    "cacheID": "b9848b688b22accaa178f2783b690843",
    "id": null,
    "metadata": {
      "connection": [
        {
          "count": "count",
          "cursor": "cursor",
          "direction": "forward",
          "path": [
            "challengeActivityResults"
          ]
        }
      ]
    },
    "name": "ChallengeTopMoversQuery",
    "operationKind": "query",
    "text": "query ChallengeTopMoversQuery(\n  $challengeId: ID!\n  $count: Int\n  $cursor: String\n) {\n  challengeActivityResults(challengeId: $challengeId, first: $count, after: $cursor) {\n    edges {\n      cursor\n      node {\n        user {\n          id\n          firstName\n          lastName\n        }\n        result\n        id\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      startCursor\n      endCursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "dbd860730c9cae23707810169cc3a037";

export default node;
