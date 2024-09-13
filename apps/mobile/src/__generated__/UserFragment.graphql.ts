/**
 * @generated SignedSource<<cf4c63334cac620b08976e58f33dc245>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserFragment$data = {
  readonly email: string | null | undefined;
  readonly firstName: string | null | undefined;
  readonly id: string | null | undefined;
  readonly lastName: string | null | undefined;
  readonly " $fragmentType": "UserFragment";
};
export type UserFragment$key = {
  readonly " $data"?: UserFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserFragment",
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
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "f6c1751550c759d4cd0f2466c725aaf0";

export default node;
