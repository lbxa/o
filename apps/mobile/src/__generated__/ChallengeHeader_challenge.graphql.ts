/**
 * @generated SignedSource<<a991512e71ac7b5dc226a160f39f657a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type ChallengeHeader_challenge$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "ChallengeHeader_challenge";
};
export type ChallengeHeader_challenge$key = {
  readonly " $data"?: ChallengeHeader_challenge$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChallengeHeader_challenge">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChallengeHeader_challenge",
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
    }
  ],
  "type": "Challenge",
  "abstractKey": null
};

(node as any).hash = "8fc6da7f8bf54a4da4ee8d1d10833155";

export default node;
