/**
 * @generated SignedSource<<c7980b12ad51071c5cc90315f66dc10c>>
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
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"CommunityListFragment">;
  } | null | undefined;
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
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CommunityListFragment"
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
    "name": "CommunityListRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7c90e94364bcf8578c57cd49c65c9973",
    "id": null,
    "metadata": {},
    "name": "CommunityListRefetchQuery",
    "operationKind": "query",
    "text": "query CommunityListRefetchQuery {\n  viewer {\n    ...CommunityListFragment\n  }\n}\n\nfragment CommunityFragment on Community {\n  id\n  name\n  isVerified\n}\n\nfragment CommunityListFragment on Viewer {\n  communities {\n    ...CommunityFragment\n    id\n  }\n}\n"
  }
};

(node as any).hash = "a957f3eb4d3a7e3539d19f0ceb439f2a";

export default node;
