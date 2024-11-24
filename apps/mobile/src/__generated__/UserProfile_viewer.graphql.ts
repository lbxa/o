/**
 * @generated SignedSource<<53306af25d0f105d93d3a92d54921cfb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type UserProfile_viewer$data = {
  readonly user: {
    readonly email: string | null | undefined;
    readonly firstName: string | null | undefined;
    readonly id: string;
    readonly lastName: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "UserProfile_viewer";
};
export type UserProfile_viewer$key = {
  readonly " $data"?: UserProfile_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserProfile_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserProfile_viewer",
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "507d12f80d1da2a415db4ce05ef621df";

export default node;
