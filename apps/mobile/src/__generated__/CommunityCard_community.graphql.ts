/**
 * @generated SignedSource<<2a59372c47f3376c5683748c7dd9c502>>
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
  readonly memberCount: number | null | undefined;
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
    },
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

(node as any).hash = "5361aee356593929495ecd7b745bfc33";

export default node;
