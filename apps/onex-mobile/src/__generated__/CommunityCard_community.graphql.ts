/**
 * @generated SignedSource<<6d605641fd34e987c7db222f0cbdb6f5>>
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
  readonly imageUrl: string | null | undefined;
  readonly isVerified: boolean | null | undefined;
  readonly name: string;
  readonly " $fragmentSpreads": FragmentRefs<"SocialGallery">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SocialGallery"
    }
  ],
  "type": "Community",
  "abstractKey": null
};

(node as any).hash = "92525f76c38c1cc24033897c13201439";

export default node;
