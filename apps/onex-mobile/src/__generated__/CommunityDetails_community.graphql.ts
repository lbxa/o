/**
 * @generated SignedSource<<18c09079d7b97a30b31a6f2905f99c6e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type CommunityDetails_community$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SocialGallery">;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "SocialGallery"
    }
  ],
  "type": "Community",
  "abstractKey": null
};

(node as any).hash = "e4b7aa6566e362dd1fbe1977ce743db3";

export default node;
