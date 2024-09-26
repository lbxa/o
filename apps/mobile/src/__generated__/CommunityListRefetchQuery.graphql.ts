/**
 * @generated SignedSource<<af7e7b22f041496d5a10ba87bd8b8034>>
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
  readonly " $fragmentSpreads": FragmentRefs<"CommunityList__query">;
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
        "name": "CommunityList__query"
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
    "cacheID": "f9b5efe0cfc875c7b380a4de9d8da293",
    "id": null,
    "metadata": {},
    "name": "CommunityListRefetchQuery",
    "operationKind": "query",
    "text": "query CommunityListRefetchQuery {\n  ...CommunityList__query\n}\n\nfragment CommunityFragment on Community {\n  id\n  name\n}\n\nfragment CommunityList__query on Query {\n  communities {\n    ...CommunityFragment\n    id\n  }\n}\n"
  }
};

(node as any).hash = "8ec2889987303bf1b53d8459aad82add";

export default node;
