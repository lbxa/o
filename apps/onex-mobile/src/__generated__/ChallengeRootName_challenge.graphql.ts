/**
 * @generated SignedSource<<f65dacd278c21b1a2a2f4bc71d455577>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type ChallengeRootName_challenge$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "ChallengeRootName_challenge";
};
export type ChallengeRootName_challenge$key = {
  readonly " $data"?: ChallengeRootName_challenge$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChallengeRootName_challenge">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChallengeRootName_challenge",
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

(node as any).hash = "829c757ee2dd117b052b4d18b03a1ff7";

export default node;
