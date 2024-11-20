/**
 * @generated SignedSource<<ebb1979c0551cf004f5861c9ac646844>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type CommunityCardFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CommunityFragment">;
  readonly " $fragmentType": "CommunityCardFragment";
};
export type CommunityCardFragment$key = {
  readonly " $data"?: CommunityCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommunityCardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CommunityCardFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CommunityFragment"
    }
  ],
  "type": "Community",
  "abstractKey": null
};

(node as any).hash = "b45053723117c5d0493969705c7a4a06";

export default node;
