/**
 * @generated SignedSource<<6d6527c65b3afb8d6f3146188e345bc9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type CommunityRootTitle_community$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "CommunityRootTitle_community";
};
export type CommunityRootTitle_community$key = {
  readonly " $data"?: CommunityRootTitle_community$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommunityRootTitle_community">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CommunityRootTitle_community",
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

(node as any).hash = "8a990a02fde676bcf7f9de7864fb9948";

export default node;
