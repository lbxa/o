/**
 * @generated SignedSource<<9c88f042bc4540771fb07a45e67a413c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewerQuery$variables = Record<PropertyKey, never>;
export type ViewerQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"ViewerFragment">;
  } | null | undefined;
};
export type ViewerQuery = {
  response: ViewerQuery$data;
  variables: ViewerQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ViewerQuery",
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
            "name": "ViewerFragment"
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
    "name": "ViewerQuery",
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
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
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
                "name": "firstName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "lastName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "email",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "handle",
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
    "cacheID": "00f4280365f3f9b39927f7ec270ca666",
    "id": null,
    "metadata": {},
    "name": "ViewerQuery",
    "operationKind": "query",
    "text": "query ViewerQuery {\n  viewer {\n    ...ViewerFragment\n  }\n}\n\nfragment UserFragment on User {\n  id\n  firstName\n  lastName\n  email\n  handle\n}\n\nfragment ViewerFragment on Viewer {\n  user {\n    ...UserFragment\n    id\n  }\n}\n"
  }
};

(node as any).hash = "df95491617cf72e10427a7d24fade835";

export default node;
