/**
 * @generated SignedSource<<e60bbfc3b7d634315a50ba6c915025c0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type CommunityCard_community$data = {
  readonly id: string;
  readonly isVerified: boolean | null | undefined;
  readonly name: string;
  readonly " $fragmentSpreads": FragmentRefs<"CommunitySocials_community">;
  readonly " $fragmentType": "CommunityCard_community";
};
export type CommunityCard_community$key = {
  readonly " $data"?: CommunityCard_community$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommunityCard_community">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CommunityCard_community",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isVerified",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CommunitySocials_community"
    }
  ],
  "type": "Community",
  "abstractKey": null
};

(node as any).hash = "95811b33194b90e0c3d9a6b420d3ccca";

export default node;
