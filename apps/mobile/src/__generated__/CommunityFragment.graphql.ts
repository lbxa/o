/**
 * @generated SignedSource<<09ff04c9ef57e1b60decf2db7a5de2e2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommunityFragment$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "CommunityFragment";
};
export type CommunityFragment$key = {
  readonly " $data"?: CommunityFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommunityFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CommunityFragment",
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
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Community",
  "abstractKey": null
};

(node as any).hash = "0830a0afa3553bde389d2b4151d7084f";

export default node;
