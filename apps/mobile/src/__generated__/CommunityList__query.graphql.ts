/**
 * @generated SignedSource<<797e9a1dcaf0c0aa563cb8eea2992496>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommunityList__query$data = {
  readonly communities: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"CommunityFragment">;
  }> | null | undefined;
  readonly " $fragmentType": "CommunityList__query";
};
export type CommunityList__query$key = {
  readonly " $data"?: CommunityList__query$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommunityList__query">;
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
  "name": "CommunityList__query",
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

(node as any).hash = "8ec2889987303bf1b53d8459aad82add";

export default node;
