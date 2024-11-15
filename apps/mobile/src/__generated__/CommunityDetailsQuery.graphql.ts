/**
 * @generated SignedSource<<755dcbb70f4a7314e139968bd09a7e64>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type CommunityDetailsQuery$variables = {
  id: string;
};
export type CommunityDetailsQuery$data = {
  readonly community: {
    readonly name: string;
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
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
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
        "concreteType": "Community",
        "kind": "LinkedField",
        "name": "community",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
    "name": "CommunityDetailsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Community",
        "kind": "LinkedField",
        "name": "community",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
            "name": "isVerified",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6db50e29e8a5f289db6297c828d0efba",
    "id": null,
    "metadata": {},
    "name": "CommunityDetailsQuery",
    "operationKind": "query",
    "text": "query CommunityDetailsQuery(\n  $id: ID!\n) {\n  community(id: $id) {\n    name\n    ...CommunityFragment\n    id\n  }\n}\n\nfragment CommunityFragment on Community {\n  id\n  name\n  isVerified\n}\n"
  }
};
})();

(node as any).hash = "2fe852239a4d0707408a3c90e885326f";

export default node;
