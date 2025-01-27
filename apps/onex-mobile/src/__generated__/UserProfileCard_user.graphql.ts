/**
 * @generated SignedSource<<ff5e35ed39eea8058e9c76c281a9f81d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type UserProfileCard_user$data = {
  readonly firstName: string | null | undefined;
  readonly handle: string | null | undefined;
  readonly id: string;
  readonly lastName: string | null | undefined;
  readonly " $fragmentType": "UserProfileCard_user";
};
export type UserProfileCard_user$key = {
  readonly " $data"?: UserProfileCard_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserProfileCard_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserProfileCard_user",
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

(node as any).hash = "f60a10dcff24300eed767398dac2612c";

export default node;
