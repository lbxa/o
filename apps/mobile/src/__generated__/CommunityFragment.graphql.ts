/**
 * @generated SignedSource<<865dc1e58cc02c870c6535146dc182f9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommunityFragment$data = {
  readonly id: string;
  readonly isVerified: boolean | null | undefined;
  readonly name: string;
  readonly " $fragmentType": "CommunityFragment";
};
export type CommunityFragment$key = {
  readonly " $data"?: CommunityFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommunityFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CommunityFragment",
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

(node as any).hash = "c52ffab5abed2c65900eaed434fdf855";

export default node;
