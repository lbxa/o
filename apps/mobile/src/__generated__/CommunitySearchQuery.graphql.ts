/**
 * @generated SignedSource<<0b61361bdba513fc88349bdbd9ebd88d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommunitySearchQuery$variables = {
  id: number;
};
export type CommunitySearchQuery$data = {
  readonly community: {
    readonly " $fragmentSpreads": FragmentRefs<"CommunityFragment">;
  } | null | undefined;
};
export type CommunitySearchQuery = {
  response: CommunitySearchQuery$data;
  variables: CommunitySearchQuery$variables;
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
    "name": "CommunitySearchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Community",
        "kind": "LinkedField",
        "name": "community",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CommunityFragment"
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
    "name": "CommunitySearchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Community",
        "kind": "LinkedField",
        "name": "community",
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
    ]
  },
  "params": {
    "cacheID": "c30135ba895ba8a64cdaf78c0c674eea",
    "id": null,
    "metadata": {},
    "name": "CommunitySearchQuery",
    "operationKind": "query",
    "text": "query CommunitySearchQuery(\n  $id: Int!\n) {\n  community(id: $id) {\n    ...CommunityFragment\n    id\n  }\n}\n\nfragment CommunityFragment on Community {\n  id\n  name\n}\n"
  }
};
})();

(node as any).hash = "b857d3bd30684fa51f7164d83b8e5776";

export default node;
