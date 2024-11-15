/**
 * @generated SignedSource<<1b72e136ef13c3372f3f857fe26ca037>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type CommunitySearchQuery$variables = {
  id: string;
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isVerified",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "94239ab4a354940fd00e68359c4628d9",
    "id": null,
    "metadata": {},
    "name": "CommunitySearchQuery",
    "operationKind": "query",
    "text": "query CommunitySearchQuery(\n  $id: ID!\n) {\n  community(id: $id) {\n    ...CommunityFragment\n    id\n  }\n}\n\nfragment CommunityFragment on Community {\n  id\n  name\n  isVerified\n}\n"
  }
};
})();

(node as any).hash = "e977904ae9f010612f4ee2e68fb0ef9b";

export default node;
