/**
 * @generated SignedSource<<c0a4e1c982a9056c40d7cee5577b5b94>>
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
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "quality",
          "value": "HIGH"
        }
      ],
      "kind": "ScalarField",
      "name": "imageUrl",
      "storageKey": "imageUrl(quality:\"HIGH\")"
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

(node as any).hash = "631541e478bdb25de98de1020dfa8115";

export default node;
