/**
 * @generated SignedSource<<02a47e5620e8fe8f0d02e8c01e556ccf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type UserProfile_user$data = {
  readonly avatarUrl: string | null | undefined;
  readonly bio: string | null | undefined;
  readonly firstName: string | null | undefined;
  readonly handle: string | null | undefined;
  readonly id: string;
  readonly lastName: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"UserProfileStats_user">;
  readonly " $fragmentType": "UserProfile_user";
};
export type UserProfile_user$key = {
  readonly " $data"?: UserProfile_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserProfile_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserProfile_user",
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
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "quality",
          "value": "HIGH"
        }
      ],
      "kind": "ScalarField",
      "name": "avatarUrl",
      "storageKey": "avatarUrl(quality:\"HIGH\")"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UserProfileStats_user"
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "7e4f59704fc74e6ba6f374d703b7f7a9";

export default node;
