/**
 * @generated SignedSource<<a6f297b0d5a4587c86d313e957fb0eef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type CommunityTitle_community$data = {
  readonly id: string;
  readonly isVerified: boolean | null | undefined;
  readonly name: string;
  readonly " $fragmentType": "CommunityTitle_community";
};
export type CommunityTitle_community$key = {
  readonly " $data"?: CommunityTitle_community$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommunityTitle_community">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CommunityTitle_community",
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

(node as any).hash = "fbc8925627f2a720fde8d1bb7debd2dd";

export default node;
