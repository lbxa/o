/**
 * @generated SignedSource<<b9e3ffc0fb493feb1714cb71fe1ff67e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewerFragment$data = {
  readonly user: {
    readonly " $fragmentSpreads": FragmentRefs<"UserFragment">;
  } | null | undefined;
  readonly " $fragmentType": "ViewerFragment";
};
export type ViewerFragment$key = {
  readonly " $data"?: ViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ViewerFragment">;
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
      "operation": require('./ViewerRefetchQuery.graphql')
    }
  },
  "name": "ViewerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "user",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "UserFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "d8aa0038bc7af18b6fa7440908dd6c51";

export default node;
