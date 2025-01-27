/**
 * @generated SignedSource<<8195bff21b04c0fc8f0000fb2e454e79>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteUpdatableQuery } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type UserCreateUpdatableQuery$variables = Record<PropertyKey, never>;
export type UserCreateUpdatableQuery$data = {
  get viewer(): {
    get user(): Record<PropertyKey, never> | null | undefined;
    set user(value: {
      readonly __typename: "User";
      readonly __id: string;
      readonly " $fragmentSpreads": FragmentRefs<"UserCreateFragment_viewer_assignable">;
    } | null | undefined);
  } | null | undefined;
  set viewer(value: null | undefined);
};
export type UserCreateUpdatableQuery = {
  response: UserCreateUpdatableQuery$data;
  variables: UserCreateUpdatableQuery$variables;
};

const node: ConcreteUpdatableQuery = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserCreateUpdatableQuery",
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
                "args": null,
                "kind": "FragmentSpread",
                "name": "UserCreateFragment_viewer_assignable"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "UpdatableQuery"
};

(node as any).hash = "ea00d772fb5615e5784a9aa38845fd9b";

export default node;
