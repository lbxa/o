/**
 * @generated SignedSource<<5f3e85ecb69b3698efe3f2364803b747>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteUpdatableQuery } from 'relay-runtime';
export type useAvatarImageQuery$variables = Record<PropertyKey, never>;
export type useAvatarImageQuery$data = {
  get viewer(): {
    get user(): {
      avatarUrl: string | null | undefined;
    } | null | undefined;
    set user(value: null | undefined);
  } | null | undefined;
  set viewer(value: null | undefined);
};
export type useAvatarImageQuery = {
  response: useAvatarImageQuery$data;
  variables: useAvatarImageQuery$variables;
};

const node: ConcreteUpdatableQuery = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "useAvatarImageQuery",
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
                "name": "avatarUrl",
                "storageKey": null
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

(node as any).hash = "e42f6e750b27379d02644dbf6934bd76";

export default node;
