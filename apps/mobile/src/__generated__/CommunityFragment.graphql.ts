/**
 * @generated SignedSource<<9a5e619f13f528230a022a6df71aa9ed>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommunityFragment$data = {
  readonly _id: number;
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
      "alias": "_id",
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
    }
  ],
  "type": "Community",
  "abstractKey": null
};

(node as any).hash = "ff436026845db35625a036064ad3411a";

export default node;
