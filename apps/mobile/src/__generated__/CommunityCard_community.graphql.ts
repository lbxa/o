/**
 * @generated SignedSource<<800b00e5b91be04f92d02b78faca569f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type CommunityCard_community$data = {
  readonly id: string;
  readonly isVerified: boolean | null | undefined;
  readonly name: string;
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
    }
  ],
  "type": "Community",
  "abstractKey": null
};

(node as any).hash = "bdc49e7642005fbd372420bb35676727";

export default node;
