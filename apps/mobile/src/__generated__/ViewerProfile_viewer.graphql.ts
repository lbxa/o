/**
 * @generated SignedSource<<10924d1826a04acd14a52d2ef543e70c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type ViewerProfile_viewer$data = {
  readonly user: {
    readonly bio: string | null | undefined;
    readonly firstName: string | null | undefined;
    readonly handle: string | null | undefined;
    readonly id: string;
    readonly lastName: string | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"UserProfileStats_user">;
  } | null | undefined;
  readonly " $fragmentType": "ViewerProfile_viewer";
};
export type ViewerProfile_viewer$key = {
  readonly " $data"?: ViewerProfile_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ViewerProfile_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewerProfile_viewer",
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
          "name": "handle",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "bio",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "UserProfileStats_user"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "0519660fa3b15f919a65fc07a168088d";

export default node;
