/**
 * @generated SignedSource<<9d54fc9b8d786b99480244eaf9d5c320>>
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
  readonly " $fragmentSpreads": FragmentRefs<"CommunityList__query">;
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
    "cacheID": "da1b48273801dbe88ad9b127bc0ea022",
    "id": null,
    "metadata": {},
    "name": "CommunityListQuery",
    "operationKind": "query",
    "text": "query CommunityListQuery {\n  ...CommunityList__query\n}\n\nfragment CommunityFragment on Community {\n  id\n  name\n}\n\nfragment CommunityList__query on Query {\n  communities {\n    ...CommunityFragment\n    id\n  }\n}\n"
  }
};

(node as any).hash = "7d97c27ef3ece258547a08b8987d0ba1";

export default node;
