/**
 * @generated SignedSource<<4731a030ead73a2470ad739eda0f0f16>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type CommunityDetails_community$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CommunitySocials_community">;
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
      "name": "CommunitySocials_community"
    }
  ],
  "type": "Community",
  "abstractKey": null
};

(node as any).hash = "0406dfafdcd2fc52de82ef3e3eed2827";

export default node;
