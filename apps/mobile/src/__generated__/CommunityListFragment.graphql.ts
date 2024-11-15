/**
 * @generated SignedSource<<58bb98c0249a45826db7145740c7038a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type CommunityListFragment$data = {
  readonly communities: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"CommunityFragment">;
  }> | null | undefined;
  readonly " $fragmentType": "CommunityListFragment";
};
export type CommunityListFragment$key = {
  readonly " $data"?: CommunityListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommunityListFragment">;
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
  "name": "CommunityListFragment",
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
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "a957f3eb4d3a7e3539d19f0ceb439f2a";

export default node;
