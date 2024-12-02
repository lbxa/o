/**
 * @generated SignedSource<<3bb2316faff12475fa5abe632a6e143e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type CommunityDetails_community$data = {
  readonly memberCount: number | null | undefined;
  readonly " $fragmentType": "CommunityDetails_community";
};
export type CommunityDetails_community$key = {
  readonly " $data"?: CommunityDetails_community$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommunityDetails_community">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CommunityDetails_community",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "memberCount",
      "storageKey": null
    }
  ],
  "type": "Community",
  "abstractKey": null
};

(node as any).hash = "ac46c05e1d72079b2c5e18b89aa0b10e";

export default node;
