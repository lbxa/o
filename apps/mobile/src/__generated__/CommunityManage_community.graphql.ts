/**
 * @generated SignedSource<<4d817247e166980d932ce88983f2ff3f>>
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
  readonly isPublic: boolean;
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
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      "action": "THROW"
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isPublic",
        "storageKey": null
      },
      "action": "THROW"
    }
  ],
  "type": "Community",
  "abstractKey": null
};

(node as any).hash = "ec07102e32a68efef30273e6196b576f";

export default node;
