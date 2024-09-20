/**
 * @generated SignedSource<<821c7dab7695a14e2084e25b24b5e8bb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommunityListRefetchQuery$variables = Record<PropertyKey, never>;
export type CommunityListRefetchQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CommunityList__communities">;
};
export type CommunityListRefetchQuery = {
  response: CommunityListRefetchQuery$data;
  variables: CommunityListRefetchQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CommunityListRefetchQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "CommunityList__communities"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CommunityListRefetchQuery",
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
    "cacheID": "f07d86b48b570a35d645dbac5edc8866",
    "id": null,
    "metadata": {},
    "name": "CommunityListRefetchQuery",
    "operationKind": "query",
    "text": "query CommunityListRefetchQuery {\n  ...CommunityList__communities\n}\n\nfragment CommunityFragment on Community {\n  id\n  name\n}\n\nfragment CommunityList__communities on Query {\n  communities {\n    ...CommunityFragment\n    id\n  }\n}\n"
  }
};

(node as any).hash = "2383c19053d053891aa8f20e1db88d1c";

export default node;
