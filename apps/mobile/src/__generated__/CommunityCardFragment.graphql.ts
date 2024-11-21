/**
 * @generated SignedSource<<601647e2b2c5320b643cae7850f2cbe4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type CommunityCardFragment$data = {
  readonly id: string;
  readonly isVerified: boolean | null | undefined;
  readonly name: string;
  readonly " $fragmentType": "CommunityCardFragment";
};
export type CommunityCardFragment$key = {
  readonly " $data"?: CommunityCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommunityCardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CommunityCardFragment",
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

(node as any).hash = "ec00877557a50e5ce9ba3dfd1d1b8451";

export default node;
