/**
 * @generated SignedSource<<ed4e0e4150fb7b385f05ccb9f6ba796f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChallengeFragment$data = {
  readonly description: string | null | undefined;
  readonly endDate: Date | null | undefined;
  readonly id: string;
  readonly name: string;
  readonly startDate: Date | null | undefined;
  readonly " $fragmentType": "ChallengeFragment";
};
export type ChallengeFragment$key = {
  readonly " $data"?: ChallengeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChallengeFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChallengeFragment",
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
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "startDate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endDate",
      "storageKey": null
    }
  ],
  "type": "Challenge",
  "abstractKey": null
};

(node as any).hash = "9870d7dae702c3175a7dfa7f620bbfff";

export default node;
