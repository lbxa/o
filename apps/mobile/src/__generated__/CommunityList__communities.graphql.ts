/**
 * @generated SignedSource<<51b9523448507c4b686bf0564e77c5f7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommunityList__communities$data = {
  readonly communities: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"CommunityFragment">;
  }> | null | undefined;
  readonly " $fragmentType": "CommunityList__communities";
};
export type CommunityList__communities$key = {
  readonly " $data"?: CommunityList__communities$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommunityList__communities">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [],
      "operation": require('./CommunityListRefetchQuery.graphql')
    }
  },
  "name": "CommunityList__communities",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Community",
      "kind": "LinkedField",
      "name": "communities",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "CommunityFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "2383c19053d053891aa8f20e1db88d1c";

export default node;
