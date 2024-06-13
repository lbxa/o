/**
 * @generated SignedSource<<bb7d032f7a698063574c8617f4d4ff31>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type userSignupFragment$data = {
  readonly _id: number | null | undefined;
  readonly email: string | null | undefined;
  readonly firstName: string | null | undefined;
  readonly lastName: string | null | undefined;
  readonly " $fragmentType": "userSignupFragment";
};
export type userSignupFragment$key = {
  readonly " $data"?: userSignupFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"userSignupFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "userSignupFragment",
  "selections": [
    {
      "alias": "_id",
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

(node as any).hash = "37e34e193cce16b9099bc01bd5a1049a";

export default node;
