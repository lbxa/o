/**
 * @generated SignedSource<<f3228b993d03640d3611bf2c6cc0f0e7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteUpdatableQuery } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type UserLoginUpdatableQuery$variables = Record<PropertyKey, never>;
export type UserLoginUpdatableQuery$data = {
  get viewer(): {
    get user(): Record<PropertyKey, never> | null | undefined;
    set user(value: {
      readonly __typename: "User";
      readonly __id: string;
      readonly " $fragmentSpreads": FragmentRefs<"UserLoginFragment_viewer_assignable">;
    } | null | undefined);
  } | null | undefined;
  set viewer(value: null | undefined);
};
export type UserLoginUpdatableQuery = {
  response: UserLoginUpdatableQuery$data;
  variables: UserLoginUpdatableQuery$variables;
};

const node: ConcreteUpdatableQuery = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserLoginUpdatableQuery",
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
                "name": "UserLoginFragment_viewer_assignable"
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

(node as any).hash = "216729caa5175c51c873b8e265938abc";

export default node;
