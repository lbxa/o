/**
 * @generated SignedSource<<3b3278d5dc8aab7b820df9f662be8043>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type CommunityListFragment_viewer$data = {
  readonly communities: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"CommunityCardFragment">;
  }> | null | undefined;
  readonly " $fragmentType": "CommunityListFragment_viewer";
};
export type CommunityListFragment_viewer$key = {
  readonly " $data"?: CommunityListFragment_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommunityListFragment_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "viewer"
      ],
      "operation": require('./CommunityListRefetchQuery.graphql')
    }
  },
  "name": "CommunityListFragment_viewer",
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
          "name": "CommunityCardFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "2840a4a1ba7252745afdf903f2e46971";

export default node;
