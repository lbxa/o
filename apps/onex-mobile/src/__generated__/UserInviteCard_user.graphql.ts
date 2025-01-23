/**
 * @generated SignedSource<<6741fb97f0ca22965de2c4d34abdecfa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type UserInviteCard_user$data = {
  readonly firstName: string | null | undefined;
  readonly handle: string | null | undefined;
  readonly id: string;
  readonly lastName: string | null | undefined;
  readonly " $fragmentType": "UserInviteCard_user";
};
export type UserInviteCard_user$key = {
  readonly " $data"?: UserInviteCard_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserInviteCard_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserInviteCard_user",
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
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "dafa9887dfebe181f4fbaf05c3dd3411";

export default node;
