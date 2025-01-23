/**
 * @generated SignedSource<<495dc3703d33b4e2e42c0b25edcf152c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type ChallengeManage_challenge$data = {
  readonly description: string;
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "ChallengeManage_challenge";
};
export type ChallengeManage_challenge$key = {
  readonly " $data"?: ChallengeManage_challenge$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChallengeManage_challenge">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChallengeManage_challenge",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      "action": "THROW"
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
        "storageKey": null
      },
      "action": "THROW"
    }
  ],
  "type": "Challenge",
  "abstractKey": null
};

(node as any).hash = "b2cb8d90a0c1be2299360f65c852f392";

export default node;
