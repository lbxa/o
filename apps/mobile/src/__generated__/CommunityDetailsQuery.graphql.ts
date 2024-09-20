/**
 * @generated SignedSource<<46d70b5a2bd3d883331ad4dc30a9fff5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommunityDetailsQuery$variables = {
  id: string;
};
export type CommunityDetailsQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"CommunityFragment">;
  } | null | undefined;
};
export type CommunityDetailsQuery = {
  response: CommunityDetailsQuery$data;
  variables: CommunityDetailsQuery$variables;
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
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CommunityDetailsQuery",
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
            "kind": "InlineFragment",
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "CommunityFragment"
              }
            ],
            "type": "Community",
            "abstractKey": null
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
    "name": "CommunityDetailsQuery",
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              }
            ],
            "type": "Community",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "32018845b1bda08579959f262b780966",
    "id": null,
    "metadata": {},
    "name": "CommunityDetailsQuery",
    "operationKind": "query",
    "text": "query CommunityDetailsQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on Community {\n      ...CommunityFragment\n    }\n    id\n  }\n}\n\nfragment CommunityFragment on Community {\n  id\n  name\n}\n"
  }
};
})();

(node as any).hash = "5ab5b9a6a7b8038d9dd426bf4380b631";

export default node;
