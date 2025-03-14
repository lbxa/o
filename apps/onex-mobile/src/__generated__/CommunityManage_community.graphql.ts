/**
 * @generated SignedSource<<1080f45bffdf823f917e2933ebed4d16>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type CommunityManage_community$data = {
  readonly id: string;
  readonly imageUrl: string | null | undefined;
  readonly isPublic: boolean | null | undefined;
  readonly name: string;
  readonly " $fragmentType": "CommunityManage_community";
};
export type CommunityManage_community$key = {
  readonly " $data"?: CommunityManage_community$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommunityManage_community">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CommunityManage_community",
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
      "name": "isPublic",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": "LARGE"
        }
      ],
      "kind": "ScalarField",
      "name": "imageUrl",
      "storageKey": "imageUrl(size:\"LARGE\")"
    }
  ],
  "type": "Community",
  "abstractKey": null
};

(node as any).hash = "72f55b7491da22e789ae7cf9ef9bc590";

export default node;
