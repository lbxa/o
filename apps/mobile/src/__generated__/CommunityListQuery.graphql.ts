/**
 * @generated SignedSource<<6bae532507d49115924d0f5f78e8d72f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommunityListQuery$variables = Record<PropertyKey, never>;
export type CommunityListQuery$data = {
  readonly communities: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"CommunityFragment">;
  }> | null | undefined;
};
export type CommunityListQuery = {
  response: CommunityListQuery$data;
  variables: CommunityListQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CommunityListQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Community",
        "kind": "LinkedField",
        "name": "communities",
        "plural": true,
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CommunityListQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Community",
        "kind": "LinkedField",
        "name": "communities",
        "plural": true,
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
    "cacheID": "8181d44fbc220878f450cb8a077323af",
    "id": null,
    "metadata": {},
    "name": "CommunityListQuery",
    "operationKind": "query",
    "text": "query CommunityListQuery {\n  communities {\n    ...CommunityFragment\n    id\n  }\n}\n\nfragment CommunityFragment on Community {\n  id\n  name\n}\n"
  }
};

(node as any).hash = "07070ae0ea5e0509c88965f0c9db0038";

export default node;
